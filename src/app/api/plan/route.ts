import { NextRequest, NextResponse } from "next/server";
import {
  calculatePlanBudget,
  generateTailoredPlanFallback,
} from "@/lib/plan-engine";
import { BuildPlan, CurrencyRegion, QuestionAnswer } from "@/types/buildsy";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idea: string = (body?.idea || "").trim();
    const answers: QuestionAnswer[] = body?.answers || [];
    const region: CurrencyRegion = body?.region === "INR" ? "INR" : "USD";
    const customKey: string = (body?.apiKey || "").trim();
    const apiKey = customKey || process.env.GEMINI_API_KEY || "";

    if (!idea) {
      return NextResponse.json(
        { error: "Product idea is required." },
        { status: 400 }
      );
    }

    const basePlan = generateTailoredPlanFallback(idea, answers, region);

    if (!apiKey) {
      return NextResponse.json({ plan: basePlan });
    }

    const qaFormatted = answers
      .map((a, i) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`)
      .join("\n\n");

    const prompt = `You are Buildsy, an expert startup CTO and budget-disciplined product advisor for solo founders and small teams (1-3 people).
Search for current tool pricing and free tiers to build a concrete, budget-disciplined MVP build plan for this idea:

PRODUCT IDEA:
"${idea}"

FOUNDER ANSWERS:
${qaFormatted}

PREFERRED REGION/CURRENCY: ${region}

Return ONLY valid JSON (no markdown fences) matching this exact schema:
{
  "title": "Short specific title for this Build Plan",
  "summaryNote": "2-sentence strategic summary tailored to this founder's idea, skill level, and budget discipline.",
  "categories": [
    {
      "id": "cat-frontend",
      "name": "Category Name (e.g. Frontend, Backend / Database, Payments, AI & APIs, Design & UI, Marketing & Analytics)",
      "budgetGroup": "Development" | "Design" | "Database & Infra" | "Marketing" | "Other",
      "description": "Short 1-line description",
      "iconKey": "layout" | "database" | "credit-card" | "code" | "palette" | "server" | "megaphone" | "sparkles" | "briefcase",
      "selectedToolId": "id of the recommended tool option based on user's budget",
      "options": [
        {
          "id": "unique-tool-id",
          "name": "Tool Name",
          "tier": "free" | "low-cost" | "scale",
          "priceDisplay": "Free" or "$18/mo" or "$0/txn" or "₹149/mo",
          "monthlyCostUSD": 0,
          "monthlyCostINR": 0,
          "pricingNote": "Specific pricing tier details",
          "tagline": "Short 3-5 word badge tagline",
          "whyRecommended": "Why this fits their specific idea",
          "freeTierLimits": "Specific current free tier limits",
          "whenToUpgrade": "Exact milestone trigger to upgrade",
          "setupDifficulty": "Easy (No-Code)" | "Moderate (Low-Code)" | "Developer",
          "logoKey": "nextjs" | "webflow" | "framer" | "supabase" | "firebase" | "mongodb" | "stripe" | "razorpay" | "lemonsqueezy" | "vercel" | "figma" | "posthog" | "notion" | "linear" | "openai" | "gemini" | "cloudflare" | "aws",
          "websiteUrl": "https://...",
          "buyPhase": "Phase 1 (Day 1)" | "Phase 2 (Launch)" | "Phase 3 (Scale)"
        }
      ]
    }
  ],
  "overspendTraps": [
    {
      "title": "Specific overspend mistake for this idea",
      "mistake": "What founders waste money on",
      "smartAlternative": "What to do instead",
      "estimatedSavingsUSD": 200
    }
  ]
}
Include 6 categories, with exactly 3 options ("free", "low-cost", "scale") in each category.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
        apiKey
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ googleSearch: {} }],
          generationConfig: {
            temperature: 0.3,
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ plan: basePlan });
    }

    const data = await response.json();
    const rawText: string =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || "")
        .join("") || "";

    // Extract JSON block if wrapped in markdown fences
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ plan: basePlan });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Extract grounding sources if returned by Gemini Search Grounding
    const groundingChunks =
      data?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources = groundingChunks
      .map((chunk: { web?: { title?: string; uri?: string } }) =>
        chunk.web?.uri
          ? {
              title: chunk.web.title || "Live Pricing Source",
              url: chunk.web.uri,
            }
          : null
      )
      .filter(Boolean);

    const enrichedPlan: BuildPlan = {
      ...basePlan,
      title: parsed.title || basePlan.title,
      summaryNote: parsed.summaryNote || basePlan.summaryNote,
      sourceMode: "live-gemini-search",
      groundingSources:
        groundingSources.length > 0 ? groundingSources : undefined,
      categories:
        Array.isArray(parsed.categories) && parsed.categories.length >= 3
          ? parsed.categories
          : basePlan.categories,
      overspendTraps:
        Array.isArray(parsed.overspendTraps) &&
        parsed.overspendTraps.length >= 2
          ? parsed.overspendTraps
          : basePlan.overspendTraps,
    };

    const budget = calculatePlanBudget(enrichedPlan);
    enrichedPlan.costBadge = budget.dynamicBadge;

    return NextResponse.json({ plan: enrichedPlan });
  } catch {
    const fallbackPlan = generateTailoredPlanFallback(
      "SaaS MVP",
      [],
      "USD"
    );
    return NextResponse.json({ plan: fallbackPlan });
  }
}
