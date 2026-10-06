"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import {
  BuildsyLogo,
  FounderAvatar,
  ToolBrandIcon,
} from "@/components/ToolLogos";
import { LaptopMockup } from "@/components/LaptopMockup";

const STARTER_PROMPTS = [
  { label: "⚡ AI Interview Coach", idea: "AI Mock Interview Coach with voice feedback and video recordings" },
  { label: "🛍️ Creator Marketplace", idea: "Two-sided marketplace for indie creators to sell digital design assets" },
  { label: "💼 Client Portal", idea: "Micro-SaaS client portal for freelancers with Stripe invoicing and file sharing" },
  { label: "📱 Hyperlocal Delivery", idea: "Hyperlocal grocery ordering app for college campuses with UPI payments" },
];

const PHASE_PREVIEWS = {
  phase1: {
    title: "Phase 1: Validate",
    subtitle: "Weeks 1–4 • Pre-revenue validation",
    monthlyCost: "$0",
    savings: "Save ~$180/mo",
    tools: [
      { name: "Next.js + Tailwind", role: "Frontend", tier: "Free (Vercel Hobby)", cost: "$0", logo: "next" },
      { name: "Supabase", role: "Database & Auth", tier: "Free (500MB DB, 50k MAU)", cost: "$0", logo: "supabase" },
      { name: "Stripe Checkout", role: "Payments", tier: "Pay-as-you-earn (2.9% + 30¢)", cost: "$0/mo", logo: "stripe" },
      { name: "Resend", role: "Transactional Email", tier: "Free (3,000 emails/mo)", cost: "$0", logo: "resend" },
    ],
    advice: "Keep burn at $0. Do not pay for enterprise servers or analytics until you have active users.",
  },
  phase2: {
    title: "Phase 2: Launch",
    subtitle: "Weeks 5–8 • First paying users",
    monthlyCost: "~$20",
    savings: "Save ~$140/mo",
    tools: [
      { name: "Vercel Pro", role: "Custom Domain & Edge", tier: "Pro hosting plan", cost: "$20/mo", logo: "vercel" },
      { name: "Supabase Free", role: "Database & Auth", tier: "Generous free limits", cost: "$0", logo: "supabase" },
      { name: "Stripe Billing", role: "Recurring Subscriptions", tier: "Per-charge fee", cost: "$0 base", logo: "stripe" },
      { name: "PostHog", role: "Product Analytics", tier: "Free (1M events/mo)", cost: "$0", logo: "posthog" },
    ],
    advice: "Add custom domain and production email. Keep database on free tier until you hit 50k monthly visits.",
  },
  phase3: {
    title: "Phase 3: Scale",
    subtitle: "Month 3+ • $1k+ MRR growth",
    monthlyCost: "~$70",
    savings: "Predictable, transparent budget",
    tools: [
      { name: "Vercel Pro", role: "Production Frontend", tier: "Team hosting & CI/CD", cost: "$20/mo", logo: "vercel" },
      { name: "Supabase Pro", role: "Dedicated Postgres", tier: "Daily backups & no pausing", cost: "$25/mo", logo: "supabase" },
      { name: "Resend Pro", role: "Email Marketing", tier: "50,000 emails/mo", cost: "$20/mo", logo: "resend" },
      { name: "Sentry", role: "Error Monitoring", tier: "Developer plan", cost: "$5/mo", logo: "sentry" },
    ],
    advice: "Upgrade to dedicated database instances and automated backups once revenue funds the infrastructure.",
  },
};

const FAQ_ITEMS = [
  {
    number: 1,
    question: "What is Buildsy?",
    answer:
      "Buildsy turns your product idea into a clear, budget-disciplined build plan. It recommends the right tools, maps a phased buying plan, and calculates your total MVP cost before you spend a single dollar.",
  },
  {
    number: 2,
    question: "Is Buildsy really free to use?",
    answer:
      "Yes, Buildsy is completely free during our launch. You can generate unlimited build plans, customize your tools, and export anytime without entering a credit card.",
  },
  {
    number: 3,
    question: "Does Buildsy support both USD ($) and Indian Rupees (₹)?",
    answer:
      "Yes! Buildsy includes built-in regional intelligence for both US and Indian founders, adapting payment stacks (Stripe vs Razorpay/Cashfree/UPI) and local pricing tiers.",
  },
  {
    number: 4,
    question: "Is there any affiliate bias in your recommendations?",
    answer:
      "Zero affiliate bias. We don't push expensive $200/mo software for referral commissions. Our sole priority is helping you ship your MVP at the lowest possible burn rate.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [quickIdea, setQuickIdea] = useState("AI Mock Interview Coach with voice feedback");
  const [selectedPromptIdea, setSelectedPromptIdea] = useState("AI Mock Interview Coach");
  const [activePhase, setActivePhase] = useState<"phase1" | "phase2" | "phase3">("phase1");
  const [openFaq, setOpenFaq] = useState<number>(1);

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickIdea.trim()) {
      router.push(`/app?idea=${encodeURIComponent(quickIdea.trim())}`);
    } else {
      router.push("/app");
    }
  };

  const handleSelectPrompt = (prompt: { label: string; idea: string }) => {
    setQuickIdea(prompt.idea);
    setSelectedPromptIdea(prompt.label.replace(/^[^a-zA-Z0-9]+/, "").trim());
  };

  const phaseData = PHASE_PREVIEWS[activePhase];

  return (
    <div className="min-h-screen bg-[#f9fcfa] text-[#0c1510] selection:bg-[#d1fae5] selection:text-[#065f46]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#eaf2ed]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <BuildsyLogo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2d3732]">
            <a href="#how-it-works" className="hover:text-[#0f5132] transition">
              How it works
            </a>
            <a href="#simulator" className="hover:text-[#0f5132] transition">
              Stack Simulator
            </a>
            <a href="#pricing" className="hover:text-[#0f5132] transition">
              Pricing
            </a>
            <a href="#faqs" className="hover:text-[#0f5132] transition">
              FAQs
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/app"
              className="text-sm font-medium text-[#2d3732] hover:text-[#0f5132] transition"
            >
              Sign in
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f5132] hover:bg-[#0c4128] text-white text-sm font-semibold shadow-xs transition"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO (Experiential & Visual) */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
        {/* Soft mint atmospheric background blobs */}
        <div className="pointer-events-none absolute -top-24 right-10 w-[600px] h-[600px] rounded-full bg-[#e8f7ee]/80 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-20 w-[420px] h-[420px] rounded-full bg-[#f0faf4]/70 blur-2xl" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.15fr] gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading, Subtitle, Interactive Prompt Bar, Social Proof */}
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#0c1510] leading-[1.12]">
                Turn your{" "}
                <span className="relative inline-block">
                  ideas
                  {/* Energetic 3-ray green doodle */}
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    className="absolute -top-7 -right-7 text-[#15803d] pointer-events-none"
                  >
                    <path
                      d="M8 36L4 32"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 24L14 8"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M28 28L38 20"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                into a clear,
                <br />
                affordable
                <br />
                <span className="text-[#0f5132]">build plan.</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#526058] leading-relaxed max-w-[480px]">
                Stop guessing tools and overspending. Get a tailored tool stack, phased budget, and MVP roadmap in minutes.
              </p>

              {/* Experiential Interactive Idea Input */}
              <form onSubmit={handleQuickStart} className="mt-7 max-w-[500px]">
                <div className="relative flex items-center rounded-2xl bg-white border border-[#d6ebe0] p-1.5 shadow-[0_8px_30px_-8px_rgba(16,68,42,0.12)] focus-within:border-[#0f5132] focus-within:ring-2 focus-within:ring-[#0f5132]/20 transition">
                  <input
                    type="text"
                    value={quickIdea}
                    onChange={(e) => setQuickIdea(e.target.value)}
                    placeholder="What are you building? e.g. AI Mock Interviewer..."
                    className="w-full pl-3.5 pr-2 py-2 text-sm text-[#0c1510] placeholder-[#8ca195] bg-transparent outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#0f5132] hover:bg-[#0c4128] text-white text-xs sm:text-sm font-semibold shrink-0 transition shadow-xs cursor-pointer"
                  >
                    <span>Get Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 1-Click Interactive Idea Chips */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#6e8277] font-medium mr-1">Try an idea:</span>
                  {STARTER_PROMPTS.map((p) => {
                    const isSelected = quickIdea === p.idea;
                    return (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => handleSelectPrompt(p)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer font-medium ${
                          isSelected
                            ? "bg-[#e5f5ec] border-[#0f5132] text-[#0f5132] font-semibold"
                            : "bg-white border-[#e0ece5] text-[#4b5e54] hover:border-[#a8d5be] hover:bg-[#f6fbf8]"
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </form>

              {/* Social Proof (Overlapping Avatars + 1,000+ Founders) */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  <FounderAvatar name="Rohan" seed={1} bg="#d8efe3" size={42} />
                  <FounderAvatar name="Priya" seed={2} bg="#e2f2ea" size={42} />
                  <FounderAvatar name="Arjun" seed={3} bg="#cfe9dc" size={42} />
                  <FounderAvatar name="Meera" seed={1} bg="#d2ede0" size={42} />
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#2f3d35] leading-snug">
                  1,000+ founders already planning
                  <br />
                  smarter with Buildsy.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive 3D Laptop on Soft-Mint Pedestal */}
            <div className="relative">
              <LaptopMockup ideaTitle={selectedPromptIdea} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED TOOLS STRIP */}
      <section className="py-10 bg-white border-y border-[#edf3ef]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#6b7280] uppercase mb-7">
            TRUSTED TOOLS, RECOMMENDED BY BUILDSY
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-between gap-7 sm:gap-9 opacity-85">
            {/* Vercel */}
            <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-[#0c1510]">
              <svg width="20" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L23 21H1L12 2Z" />
              </svg>
              <span>Vercel</span>
            </div>

            {/* Supabase */}
            <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-[#0c1510]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M13.5 2L4.5 13.5H12L10.5 22L19.5 10.5H12L13.5 2Z" fill="#1eb86a" />
              </svg>
              <span>Supabase</span>
            </div>

            {/* Stripe */}
            <div className="flex items-center gap-2 font-extrabold text-base sm:text-lg tracking-tight text-[#0c1510]">
              <span className="w-5 h-5 rounded bg-[#635bff] text-white flex items-center justify-center font-bold text-[11px]">
                S
              </span>
              <span>Stripe</span>
            </div>

            {/* Notion */}
            <div className="flex items-center gap-2 font-semibold text-base sm:text-lg text-[#0c1510]">
              <span className="w-5 h-5 rounded border border-[#0c1510] flex items-center justify-center font-serif font-bold text-[11px]">
                N
              </span>
              <span>Notion</span>
            </div>

            {/* Figma */}
            <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-[#0c1510]">
              <svg width="15" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="6" r="3.5" fill="#F24E1E" />
                <circle cx="16" cy="6" r="3.5" fill="#FF7262" />
                <circle cx="9" cy="12.5" r="3.5" fill="#A259FF" />
                <circle cx="16" cy="12.5" r="3.5" fill="#1ABCFE" />
                <circle cx="9" cy="19" r="3.5" fill="#0ACF83" />
              </svg>
              <span>Figma</span>
            </div>

            {/* AWS */}
            <div className="flex flex-col items-center leading-none">
              <span className="font-extrabold text-base sm:text-lg text-[#1e293b]">aws</span>
              <svg width="24" height="5" viewBox="0 0 32 8" fill="none">
                <path d="M1 2C10 7 22 7 31 2" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Linear */}
            <div className="flex items-center gap-2 font-semibold text-base sm:text-lg text-[#0c1510]">
              <span className="w-5 h-5 rounded-full bg-[#18181b] text-white flex items-center justify-center text-[10px] font-bold">
                L
              </span>
              <span>Linear</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (Experiential 3 Steps, Minimal Words) */}
      <section id="how-it-works" className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-[620px] mx-auto">
            <span className="px-3 py-1 rounded-full bg-[#e6f4ed] text-[#146c43] text-xs font-bold uppercase tracking-wider">
              HOW IT WORKS
            </span>
            <h2 className="mt-3.5 text-3xl sm:text-4xl font-extrabold text-[#0c1510] tracking-tight">
              From idea to build plan in three simple steps.
            </h2>
            <p className="mt-3 text-base text-[#52655b]">
              Answer 4 tailored questions to receive a phased tool stack and total MVP cost.
            </p>
          </div>

          {/* 3 Visual Interactive Step Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-2xl bg-[#fcfdfd] border border-[#e5ede8] p-6 shadow-xs hover:border-[#a8d8bd] transition flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-full bg-[#dff2e7] text-[#124b32] font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#0c1510]">Describe your idea</h3>
                <p className="mt-1.5 text-sm text-[#5d7367]">
                  Type what you want to build in plain English.
                </p>
              </div>

              {/* Visual Mock Element */}
              <div className="mt-6 p-3 rounded-xl bg-white border border-[#e3ede6] text-xs text-[#334155] shadow-2xs">
                <div className="flex items-center gap-2 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#146c43]" />
                  <span>&ldquo;AI mock interview coach...&rdquo;</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-[#fcfdfd] border border-[#e5ede8] p-6 shadow-xs hover:border-[#a8d8bd] transition flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-full bg-[#dff2e7] text-[#124b32] font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#0c1510]">Smart diagnostic</h3>
                <p className="mt-1.5 text-sm text-[#5d7367]">
                  4 tailored questions on stage, tech stack, and budget.
                </p>
              </div>

              {/* Visual Mock Element */}
              <div className="mt-6 grid grid-cols-2 gap-1.5 text-[11px] font-medium text-center">
                <span className="p-1.5 rounded-lg bg-[#e8f5ee] text-[#124b32] font-semibold border border-[#cbe6d7]">
                  💡 Idea stage
                </span>
                <span className="p-1.5 rounded-lg bg-white text-[#475569] border border-[#e2e8f0]">
                  🛠️ AI-Assisted
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl bg-[#fcfdfd] border border-[#e5ede8] p-6 shadow-xs hover:border-[#a8d8bd] transition flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-full bg-[#dff2e7] text-[#124b32] font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#0c1510]">Live stack &amp; budget</h3>
                <p className="mt-1.5 text-sm text-[#5d7367]">
                  Actionable tool stack, $0 burn rate guide, and export.
                </p>
              </div>

              {/* Visual Mock Element */}
              <div className="mt-6 p-2.5 rounded-xl bg-[#f2f9f5] border border-[#d6ebd9] flex items-center justify-between text-xs">
                <span className="font-bold text-[#146c43]">Phase 1: $0/mo</span>
                <span className="text-[11px] font-semibold text-[#0c1510]">Export Plan ↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPERIENTIAL STACK SIMULATOR (The Zero-Overspend Blueprint) */}
      <section id="simulator" className="py-16 lg:py-24 bg-[#f4faf6] border-t border-[#e2eee6]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-[680px] mx-auto">
            <span className="px-3 py-1 rounded-full bg-[#dcf2e5] text-[#124b32] text-xs font-bold uppercase tracking-wider">
              INTERACTIVE BLUEPRINT
            </span>
            <h2 className="mt-3.5 text-3xl sm:text-4xl font-extrabold text-[#0c1510] tracking-tight">
              See what to buy now vs. later.
            </h2>
            <p className="mt-3 text-base text-[#52655b]">
              Click through the phases to see how Buildsy prevents premature software overspending.
            </p>
          </div>

          {/* Interactive Phase Toggle */}
          <div className="mt-10 max-w-md mx-auto flex rounded-xl bg-white p-1 border border-[#d8ebe0] shadow-2xs">
            {(
              [
                { id: "phase1", label: "Phase 1: Validate", badge: "$0/mo" },
                { id: "phase2", label: "Phase 2: Launch", badge: "$20/mo" },
                { id: "phase3", label: "Phase 3: Scale", badge: "$70/mo" },
              ] as const
            ).map((tab) => {
              const isActive = activePhase === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePhase(tab.id)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer flex flex-col items-center ${
                    isActive
                      ? "bg-[#0f5132] text-white shadow-xs"
                      : "text-[#4b5e54] hover:text-[#0f5132] hover:bg-[#f3faf6]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] mt-0.5 ${isActive ? "text-[#a7f3d0]" : "text-[#8ca195]"}`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Tools Grid */}
          <div className="mt-8 max-w-4xl mx-auto rounded-2xl bg-white border border-[#dcece3] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#edf4f0] gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#146c43]">
                  {phaseData.title}
                </span>
                <p className="text-xs text-[#6e8277] mt-0.5">{phaseData.subtitle}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-[#0c1510]">
                    {phaseData.monthlyCost}
                  </span>
                  <span className="text-xs text-[#6e8277]">/month</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#eaf7f0] border border-[#cbe6d7] text-xs font-bold text-[#146c43]">
                  {phaseData.savings}
                </div>
              </div>
            </div>

            {/* 4 Tool Cards in Current Phase */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {phaseData.tools.map((t) => (
                <div
                  key={t.name}
                  className="p-4 rounded-xl border border-[#edf3ef] bg-[#fbfdfc] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <ToolBrandIcon logoKey={t.logo} size={32} />
                    <div>
                      <h4 className="text-sm font-bold text-[#0c1510]">{t.name}</h4>
                      <p className="text-[11px] text-[#6b7280]">{t.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#0f5132]">{t.cost}</span>
                    <p className="text-[10px] text-[#8ca195] max-w-[130px] truncate">{t.tier}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Advice Footer */}
            <div className="mt-6 pt-5 border-t border-[#edf4f0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4b5e54]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#146c43] shrink-0" />
                <span>{phaseData.advice}</span>
              </div>
              <Link
                href="/app"
                className="inline-flex items-center gap-1.5 font-bold text-[#0f5132] hover:underline shrink-0"
              >
                <span>Customize in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TESTIMONIALS (Crisp, Real Founders) */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-[620px] mx-auto">
            <span className="px-3 py-1 rounded-full bg-[#e6f4ed] text-[#146c43] text-xs font-bold uppercase tracking-wider">
              FOUNDER STORIES
            </span>
            <h2 className="mt-3.5 text-3xl sm:text-4xl font-extrabold text-[#0c1510] tracking-tight">
              Loved by solo founders &amp; small teams.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "“Buildsy saved me weeks of research and $500+. The phased plan kept my burn rate at zero.”",
                name: "Rohan Mehta",
                role: "Solo Founder, EdTech",
                seed: 1,
                bg: "#d8efe3",
              },
              {
                quote: "“Told me exactly what free tiers to use and what paid tools to delay. Super disciplined.”",
                name: "Priya Sharma",
                role: "Indie Hacker",
                seed: 2,
                bg: "#e2f2ea",
              },
              {
                quote: "“The budget calculator and stack recommendations were spot-on for our first MVP.”",
                name: "Arjun Patel",
                role: "Co-founder, SaaS",
                seed: 3,
                bg: "#cfe9dc",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-white border border-[#e6efe9] p-6 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center gap-1 text-[#f59e0b] text-sm mb-3">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p className="text-sm text-[#2b3b32] leading-relaxed italic">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-[#f0f6f2]">
                  <FounderAvatar name={t.name} bg={t.bg} seed={t.seed} size={40} />
                  <div>
                    <h4 className="text-xs font-bold text-[#0c1510]">{t.name}</h4>
                    <p className="text-[11px] text-[#6b7e73]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING (Zero-Bias & 100% Free) */}
      <section id="pricing" className="py-14 bg-[#f5fbf7] border-y border-[#e2efe6]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-white border border-[#d6ebe0] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <span className="px-3 py-1 rounded-full bg-[#e6f4ed] text-[#134e35] text-xs font-bold uppercase tracking-wider">
                100% Free • Zero Affiliate Bias
              </span>
              <h3 className="mt-3.5 text-2xl sm:text-3xl font-extrabold text-[#0c1510]">
                Build your MVP with $0 burn rate.
              </h3>
              <p className="mt-2.5 text-sm text-[#52655b] leading-relaxed">
                We never recommend expensive software for referral commissions. Buildsy is engineered around one goal: getting your MVP live for free.
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#2b3b32] font-medium">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#146c43]" />
                  Adaptive 4-step diagnostic
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#146c43]" />
                  USD ($) and India (₹) pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#146c43]" />
                  1-click Markdown export
                </span>
              </div>
            </div>

            <div className="text-center sm:text-right shrink-0">
              <div className="text-4xl font-extrabold text-[#0c1510]">$0</div>
              <p className="text-xs text-[#6e8277] mt-0.5">Free unlimited plans</p>
              <Link
                href="/app"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f5132] hover:bg-[#0c4128] text-white text-sm font-semibold transition shadow-xs"
              >
                <span>Get started free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQS (Compact 4 Items) */}
      <section id="faqs" className="py-16 lg:py-20 bg-white">
        <div className="max-w-[760px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <span className="px-3 py-1 rounded-full bg-[#e6f4ed] text-[#146c43] text-xs font-bold uppercase tracking-wider">
              FAQS
            </span>
            <h2 className="mt-3.5 text-3xl font-extrabold text-[#0c1510]">
              Frequently asked questions.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaq === item.number;
              return (
                <div
                  key={item.number}
                  className={`rounded-2xl border transition overflow-hidden ${
                    isOpen ? "border-[#cce5d8] bg-[#f4fbf7]" : "border-[#e7efe9] bg-white hover:border-[#cce5d8]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? 0 : item.number)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="text-sm font-bold text-[#0c1510]">{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#124b32] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#4b5e54] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 bg-white border-t border-[#e5f2eb]">
                      <p className="text-xs sm:text-sm text-[#4b5e54] leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CALL TO ACTION BANNER */}
      <section className="py-16 bg-[#f4faf6]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-[#0f5132] text-white p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#1e784f]/40 blur-2xl" />
            <div className="relative z-10 max-w-[620px] mx-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Ready to build your MVP without wasting money?
              </h2>
              <p className="mt-3.5 text-sm sm:text-base text-[#ccebda] leading-relaxed">
                Describe your idea, take the 4-step diagnostic, and get your personalized stack in 2 minutes.
              </p>
              <div className="mt-7">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#0f5132] text-sm sm:text-base font-bold shadow-md hover:bg-[#f2faf5] transition"
                >
                  <span>Get your build plan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#e5f0ea] py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#52655b]">
          <div className="flex items-center gap-3">
            <BuildsyLogo size="sm" />
            <span>— Lean MVP planning for founders.</span>
          </div>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/app" className="hover:text-[#0f5132]">
              Studio
            </Link>
            <a href="#how-it-works" className="hover:text-[#0f5132]">
              How it works
            </a>
            <a href="#simulator" className="hover:text-[#0f5132]">
              Simulator
            </a>
            <a href="#pricing" className="hover:text-[#0f5132]">
              Pricing
            </a>
            <a href="#faqs" className="hover:text-[#0f5132]">
              FAQs
            </a>
          </div>
          <p>© {new Date().getFullYear()} Buildsy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
