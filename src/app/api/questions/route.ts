import { NextRequest, NextResponse } from "next/server";
import { generateAdaptiveQuestionsFallback } from "@/lib/plan-engine";
import { AdaptiveQuestion } from "@/types/buildsy";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idea = (body?.idea || "").trim();
    const customKey = (body?.apiKey || "").trim();
    const apiKey = customKey || process.env.GEMINI_API_KEY || "";

    if (!idea) {
      return NextResponse.json(
        { error: "Please provide a product idea description." },
        { status: 400 }
      );
    }

    if (!apiKey) {
      const questions = generateAdaptiveQuestionsFallback(idea);
      return NextResponse.json({
        questions,
        sourceMode: "smart-curated-engine",
      });
    }

    const prompt = `You are Buildsy, an expert startup CTO and budget-disciplined product advisor for solo founders and small teams (1-3 people) in India and the US.
The user wants to build the following product idea:
"${idea}"

Generate 6 sharp, personalized, idea-specific follow-up questions to understand their idea in depth before recommending a tool stack and phased budget.
Cover:
1. Technical skill level / build approach (no-code vs AI-assisted code vs full-stack)
2. Target user geography & payment needs (India UPI/Razorpay vs US/Global Stripe/LemonSqueezy)
3. Strict monthly MVP tool budget constraint ($0 bootstrap vs lean vs growth)
4. Core technical complexity specific to THIS idea
5. Target platform (Web/PWA vs Mobile vs Extension/API)
6. Target launch timeline

Return ONLY a valid JSON array of objects with this exact structure:
[
  {
    "id": "q1",
    "question": "Clear, specific question text?",
    "whyWeAsk": "1-sentence explanation of how this saves them money or shapes their tool stack.",
    "category": "technical_skill" | "target_user" | "budget" | "timeline" | "scale_features" | "monetization" | "region_compliance",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "allowCustom": true
  }
]`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
        apiKey
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const fallback = generateAdaptiveQuestionsFallback(idea);
      return NextResponse.json({
        questions: fallback,
        sourceMode: "smart-curated-engine",
      });
    }

    const data = await response.json();
    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    const parsed = JSON.parse(rawText) as AdaptiveQuestion[];

    if (!Array.isArray(parsed) || parsed.length < 3) {
      return NextResponse.json({
        questions: generateAdaptiveQuestionsFallback(idea),
        sourceMode: "smart-curated-engine",
      });
    }

    return NextResponse.json({
      questions: parsed,
      sourceMode: "live-gemini-search",
    });
  } catch {
    return NextResponse.json({
      questions: generateAdaptiveQuestionsFallback("SaaS MVP"),
      sourceMode: "smart-curated-engine",
    });
  }
}
