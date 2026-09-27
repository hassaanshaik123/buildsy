"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Play,
  Layers,
  IndianRupee,
  BarChart3,
  Clock,
  Mail,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import {
  BuildsyLogo,
  GreenBrushUnderline,
  SparkleRays,
  FounderAvatar,
} from "@/components/ToolLogos";
import { DashboardPreviewCard } from "@/components/DashboardPreviewCard";
import { WelcomeIntro } from "@/components/WelcomeIntro";

const FAQ_ITEMS = [
  {
    number: 1,
    question: "What is Buildsy?",
    answer:
      "Buildsy helps solo founders and small teams turn their product idea into a clear, budget-disciplined build plan. It recommends the right tools, suggests a phased buying plan, and estimates the total cost to build your MVP — before you spend money.",
  },
  {
    number: 2,
    question: "Who is Buildsy for?",
    answer:
      "Buildsy is built specifically for solo founders, indie hackers, and small 1–3 person teams in India and the United States who don't have a dedicated CTO and want to build their first MVP without wasting time or overpaying for software.",
  },
  {
    number: 3,
    question: "Are the tool recommendations up to date?",
    answer:
      "Yes! Instead of relying on a static internal list, Buildsy searches live tool pricing, free-tier limits, and modern alternatives tailored to your specific idea. Because SaaS pricing changes frequently, we also include a live refresh check so you can re-verify your plan anytime.",
  },
  {
    number: 4,
    question: "Does Buildsy cover hiring and team planning?",
    answer:
      "Right now, Buildsy focuses 100% on helping you ship your MVP as a lean one-person company or small founding team using high-leverage tools. Workforce and hiring planning (roles needed to scale, experience levels, and region-specific US & India compensation data) is on our roadmap once your MVP is validated.",
  },
  {
    number: 5,
    question: "How does pricing work?",
    answer:
      "You can generate your tailored MVP build plan, explore tiered tool recommendations (Free / Low-Cost / Scale), and export your phased budget completely free during our MLP launch.",
  },
  {
    number: 6,
    question: "Is there any affiliate bias in the recommendations?",
    answer:
      "Zero affiliate bias. Our core promise is to help you avoid overspending. We always prioritize generous free tiers and open-source tools for Phase 1 validation, and explicitly tell you which paid tools to wait on until you have real users.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number>(1);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [quickIdea, setQuickIdea] = useState("");
  const [introKey, setIntroKey] = useState(0);

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickIdea.trim()) {
      router.push(`/app?idea=${encodeURIComponent(quickIdea.trim())}`);
    } else {
      router.push("/app");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fcfa] text-[#0c1510] selection:bg-[#d1fae5] selection:text-[#065f46]">
      {/* Welcoming Intro Animation ("buildsy.me" + "Get your personalized budget tool stack") */}
      <WelcomeIntro key={introKey} />

      {/* Top Navbar (Matches hero-page.png) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#eaf2ed]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIntroKey((k) => k + 1)}
            title="Replay buildsy.me welcome intro"
            className="flex items-center cursor-pointer"
          >
            <BuildsyLogo size="md" />
          </button>

          <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-[#37473f]">
            <a
              href="#how-it-works"
              className="hover:text-[#124b32] transition"
            >
              How it works
            </a>
            <a href="#features" className="hover:text-[#124b32] transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#124b32] transition">
              Pricing
            </a>
            <a href="#faqs" className="hover:text-[#124b32] transition">
              FAQs
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/app?view=plans"
              className="hidden sm:inline-block text-sm font-medium text-[#37473f] hover:text-[#124b32] transition"
            >
              Sign in
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#134e35] hover:bg-[#0e3c28] text-white text-sm font-semibold shadow-xs transition"
            >
              <span>Get started free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO (Matches hero-page.png) */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20">
        {/* Soft mint background radial blob on right */}
        <div className="pointer-events-none absolute -top-24 right-0 w-[680px] h-[680px] rounded-full bg-[#e6f5ed]/70 blur-3xl" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_1.18fr] gap-12 lg:gap-10 items-center">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#e6f4ed] text-[#134e35] text-xs sm:text-sm font-semibold mb-6">
                Plan smarter. Build faster.
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-[#0c1510] leading-[1.08]">
                Turn your idea into a clear, affordable{" "}
                <span className="relative inline-block text-[#145334]">
                  build plan.
                  <span className="block mt-0.5">
                    <GreenBrushUnderline />
                  </span>
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#4b5e54] leading-relaxed max-w-[540px]">
                Buildsy helps solo founders and small teams find the right
                tools, plan their MVP, and estimate costs — before they spend
                money on the wrong things.
              </p>

              {/* Interactive Quick Idea Bar + Main CTAs */}
              <form
                onSubmit={handleQuickStart}
                className="mt-7 max-w-[520px] flex flex-col sm:flex-row gap-2.5 p-1.5 rounded-2xl bg-white border border-[#cfe3d8] shadow-sm focus-within:border-[#145334] focus-within:ring-2 focus-within:ring-[#145334]/15 transition"
              >
                <input
                  type="text"
                  value={quickIdea}
                  onChange={(e) => setQuickIdea(e.target.value)}
                  placeholder="Describe your idea (e.g. AI interview coach for devs)..."
                  className="flex-1 px-3.5 py-2.5 text-sm text-[#0c1510] placeholder-[#7c8f84] bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#134e35] hover:bg-[#0e3c28] text-white text-sm font-semibold transition cursor-pointer shrink-0"
                >
                  <span>Get your build plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#134e35] hover:bg-[#0e3c28] text-white text-sm sm:text-base font-semibold shadow-sm transition"
                >
                  <span>Get your build plan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-white hover:bg-[#f3f8f5] text-[#0c1510] border border-[#d6e2dc] text-sm sm:text-base font-semibold shadow-2xs transition cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full border-2 border-[#0c1510] flex items-center justify-center">
                    <Play className="w-3 h-3 fill-[#0c1510] ml-0.5" />
                  </span>
                  <span>Watch demo (2 min)</span>
                </button>
              </div>

              {/* Social Proof Avatars & Stars */}
              <div className="mt-9 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <FounderAvatar name="Rohan Mehta" bg="#d8efe3" seed={1} size={42} />
                  <FounderAvatar name="Priya Sharma" bg="#e2f2ea" seed={2} size={42} />
                  <FounderAvatar name="Arjun Patel" bg="#cfe9dc" seed={3} size={42} />
                </div>
                <div>
                  <p className="text-sm text-[#4b5e54]">
                    Trusted by{" "}
                    <strong className="font-bold text-[#0c1510]">1,000+</strong>{" "}
                    founders &amp; builders
                  </p>
                  <div className="flex items-center gap-1 text-[#f59e0b] text-sm mt-0.5">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Dashboard Preview */}
            <div className="relative">
              <SparkleRays className="hidden sm:block absolute -top-9 -left-8 z-10" />
              <DashboardPreviewCard defaultTab="Overview" />
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP: POPULAR TOOLS WE RECOMMEND (Matches bottom of hero-page.png) */}
      <section className="py-10 bg-white border-y border-[#eaf2ed]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#5c6f64] uppercase mb-7">
            POPULAR TOOLS WE RECOMMEND
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 sm:gap-10 opacity-95">
            {/* Vercel */}
            <div className="flex items-center gap-2 font-bold text-xl text-[#0c1510]">
              <svg width="22" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L23 21H1L12 2Z" />
              </svg>
              <span>Vercel</span>
            </div>

            {/* supabase */}
            <div className="flex items-center gap-2 font-bold text-xl text-[#0c1510]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13.5 2L4.5 13.5H12L10.5 22L19.5 10.5H12L13.5 2Z"
                  fill="#22c55e"
                />
              </svg>
              <span>supabase</span>
            </div>

            {/* stripe */}
            <div className="font-extrabold text-2xl tracking-tight text-[#635bff]">
              stripe
            </div>

            {/* Notion */}
            <div className="flex items-center gap-2 font-semibold text-lg text-[#0c1510]">
              <span className="w-7 h-7 rounded border-2 border-[#0c1510] flex items-center justify-center font-serif font-bold text-sm">
                N
              </span>
              <span>Notion</span>
            </div>

            {/* Linear */}
            <div className="flex items-center gap-2 font-semibold text-xl text-[#0c1510]">
              <span className="w-6 h-6 rounded-full bg-[#0c1510] text-white flex items-center justify-center text-xs font-bold">
                L
              </span>
              <span>Linear</span>
            </div>

            {/* Figma */}
            <div className="flex items-center gap-2 font-bold text-xl text-[#0c1510]">
              <svg width="18" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="6" r="3.5" fill="#F24E1E" />
                <circle cx="16" cy="6" r="3.5" fill="#FF7262" />
                <circle cx="9" cy="12.5" r="3.5" fill="#A259FF" />
                <circle cx="16" cy="12.5" r="3.5" fill="#1ABCFE" />
                <circle cx="9" cy="19" r="3.5" fill="#0ACF83" />
              </svg>
              <span>Figma</span>
            </div>

            {/* aws */}
            <div className="flex flex-col items-center leading-none">
              <span className="font-extrabold text-xl text-[#1e293b]">aws</span>
              <span className="w-8 h-1 rounded-full bg-[#f59e0b] mt-0.5" />
            </div>

            {/* Google Cloud */}
            <div className="flex items-center gap-2 font-medium text-lg text-[#37473f]">
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                <path
                  d="M18.5 8.5C17.8 5 14.7 2.5 11 2.5C7.2 2.5 4 5.2 3.5 8.8C1.5 9.5 0 11.4 0 13.7C0 16.6 2.4 19 5.3 19H18.2C21.4 19 24 16.4 24 13.2C24 10.3 21.6 8.6 18.5 8.5Z"
                  fill="#3b82f6"
                />
                <circle cx="11" cy="11" r="4" fill="#ffffff" />
              </svg>
              <span>Google Cloud</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (Matches second-page.png) */}
      <section id="how-it-works" className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-[720px] mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] text-[#146c43] uppercase">
              HOW IT WORKS
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c1510] tracking-tight">
              From idea to build plan in a few simple steps.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#52655b] leading-relaxed">
              Describe your idea, answer a few tailored questions, and get a
              personalized tool stack, phased plan, and total MVP cost — in
              minutes.
            </p>
          </div>

          {/* 4 Step Cards with dashed connectors */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: 1,
                title: "Describe your idea",
                desc: "Start with a simple description of what you want to build.",
                icon: (
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    className="mx-auto"
                  >
                    <rect
                      x="10"
                      y="8"
                      width="22"
                      height="28"
                      rx="3"
                      stroke="#146c43"
                      strokeWidth="2.2"
                    />
                    <path
                      d="M15 16H27M15 21H27M15 26H22"
                      stroke="#146c43"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M35 8V14M32 11H38"
                      stroke="#22c55e"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
              {
                step: 2,
                title: "Answer a few questions",
                desc: "Buildsy asks personalized questions to understand your idea, goals, budget and constraints.",
                icon: (
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    className="mx-auto"
                  >
                    <path
                      d="M10 14C10 12.3431 11.3431 11 13 11H25C26.6569 11 28 12.3431 28 14V21C28 22.6569 26.6569 24 25 24H16L11 28V14Z"
                      stroke="#146c43"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28 18H31C32.6569 18 34 19.3431 34 21V32L29 28H21C19.3431 28 18 26.6569 18 25"
                      stroke="#146c43"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />
                    <circle cx="16" cy="17.5" r="1.3" fill="#146c43" />
                    <circle cx="19.5" cy="17.5" r="1.3" fill="#146c43" />
                    <circle cx="23" cy="17.5" r="1.3" fill="#146c43" />
                  </svg>
                ),
              },
              {
                step: 3,
                title: "Get your build plan",
                desc: "Receive a tailored tool stack, phased buying plan and total MVP cost estimate.",
                icon: (
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    className="mx-auto"
                  >
                    <circle cx="13" cy="14" r="2.5" fill="#22c55e" />
                    <circle cx="13" cy="22" r="2.5" fill="#146c43" />
                    <circle cx="13" cy="30" r="2.5" fill="#146c43" />
                    <path
                      d="M20 14H33M20 22H33M20 30H29"
                      stroke="#146c43"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
              {
                step: 4,
                title: "Start building",
                desc: "Use the plan, save it, export it, and check back for updated recommendations.",
                icon: (
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    className="mx-auto"
                  >
                    <path
                      d="M34 10L10 21L19 25L29 15L22 27L29 33L34 10Z"
                      stroke="#146c43"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative flex items-stretch">
                <div className="w-full rounded-2xl bg-white border border-[#e7f0eb] p-6 shadow-[0_6px_28px_-10px_rgba(16,68,42,0.07)] hover:border-[#b8dec8] transition flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#dff2e7] text-[#124b32] font-bold text-sm flex items-center justify-center">
                      {item.step}
                    </div>
                    <div className="my-5">{item.icon}</div>
                    <h3 className="text-center text-lg font-bold text-[#0c1510]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-center text-sm text-[#56695f] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Dashed arrow between cards on large screens */}
                {idx < 3 && (
                  <div className="hidden lg:flex items-center justify-center -right-5 top-1/2 -translate-y-1/2 absolute z-10 text-[#198754] font-mono text-xs pointer-events-none">
                    <span>---&gt;</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT YOU GET (Combines second-page.png & third-page.png) */}
      <section
        id="features"
        className="py-20 lg:py-24 bg-[#f5fbf7] border-t border-[#e5f0ea] relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr] gap-12 items-center">
            {/* Left Feature Column */}
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#146c43] uppercase">
                WHAT YOU GET
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c1510] leading-[1.12] tracking-tight">
                A detailed, practical build plan — not just a list of tools.
              </h2>
              <p className="mt-5 text-base text-[#4b5e54] leading-relaxed">
                Get a personalized tool stack with tiered options, a phased
                purchase plan, and a clear cost breakdown so you only spend on
                what you need, when you need it.
              </p>

              {/* 4 Icon Feature Items (Matches third-page.png) */}
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#dff2e7] text-[#124b32] flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0c1510]">
                      Personalized tool stack
                    </h3>
                    <p className="text-sm text-[#56695f] mt-0.5">
                      Tailored to your idea, goals and technical skill level.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#dff2e7] text-[#124b32] flex items-center justify-center shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0c1510]">
                      Phased buying plan
                    </h3>
                    <p className="text-sm text-[#56695f] mt-0.5">
                      Know what to buy now vs. later — avoid overspending.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#dff2e7] text-[#124b32] flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0c1510]">
                      Total MVP cost estimate
                    </h3>
                    <p className="text-sm text-[#56695f] mt-0.5">
                      A clear breakdown by category and phase.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#dff2e7] text-[#124b32] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0c1510]">
                      Always up-to-date
                    </h3>
                    <p className="text-sm text-[#56695f] mt-0.5">
                      Recommendations based on the latest tool pricing and
                      availability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Tool Stack Showcase with Callout Arrows (Matches third-page.png) */}
            <div className="relative pt-6 pb-8">
              {/* Top Right Callout Annotation */}
              <div className="hidden xl:flex items-center gap-2 absolute -top-3 right-8 z-10">
                <svg
                  width="56"
                  height="38"
                  viewBox="0 0 56 38"
                  fill="none"
                  className="mt-2"
                >
                  <path
                    d="M52 8C32 4 16 14 10 34M10 34L6 25M10 34L19 29"
                    stroke="#157347"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-xs font-bold text-[#124b32] leading-tight">
                  Clear cost estimate
                  <br />
                  for your MVP
                </div>
              </div>

              <DashboardPreviewCard defaultTab="Tool Stack" />

              {/* Bottom Callout Annotation */}
              <div className="hidden sm:flex items-center justify-center gap-2.5 mt-3">
                <svg width="36" height="34" viewBox="0 0 36 34" fill="none">
                  <path
                    d="M32 30C18 30 10 20 12 4M12 4L6 11M12 4L18 11"
                    stroke="#157347"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs font-bold text-[#124b32]">
                  Phased plan so you spend only when needed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TRUSTED BY FOUNDERS / TESTIMONIALS (Matches fifth-page.png) */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-[680px] mx-auto relative">
            <p className="text-xs font-bold tracking-[0.2em] text-[#146c43] uppercase">
              TRUSTED BY FOUNDERS
            </p>
            <div className="relative inline-block mt-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0c1510] leading-[1.12] tracking-tight">
                Loved by solo founders
                <br />
                and small teams.
              </h2>
              <SparkleRays className="hidden sm:block absolute -top-6 -right-12 rotate-90" />
            </div>
            <p className="mt-4 text-base sm:text-lg text-[#52655b]">
              Real founders use Buildsy to plan smarter, save money, and build
              faster.
            </p>
          </div>

          {/* 3 Testimonial Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                quote:
                  "“Buildsy saved me weeks of research and probably hundreds of dollars. The plan was spot on for my MVP.”",
                name: "Rohan Mehta",
                role: "Solo Founder, EdTech MVP",
                seed: 1,
                bg: "#d8efe3",
              },
              {
                quote:
                  "“Finally a tool that tells you what you actually need, not just everything. Super useful and well structured.”",
                name: "Priya Sharma",
                role: "Indie Hacker",
                seed: 2,
                bg: "#e2f2ea",
              },
              {
                quote:
                  "“The cost breakdown and phased plan helped us stay disciplined and focused. Highly recommend!”",
                name: "Arjun Patel",
                role: "Co-founder, SaaS Startup",
                seed: 3,
                bg: "#cfe9dc",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-white border border-[#e6efe9] p-7 shadow-[0_10px_35px_-15px_rgba(16,68,42,0.08)] flex flex-col justify-between"
              >
                <p className="text-base text-[#2b3b32] leading-relaxed">
                  {t.quote}
                </p>

                <div className="mt-7 flex items-center gap-4">
                  <FounderAvatar
                    name={t.name}
                    bg={t.bg}
                    seed={t.seed}
                    size={54}
                  />
                  <div>
                    <h4 className="text-base font-bold text-[#0c1510]">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[#5d7065] mt-0.5">{t.role}</p>
                    <div className="flex items-center gap-1 text-[#f59e0b] text-sm mt-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Avatar Join Strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <div className="flex -space-x-3">
              <FounderAvatar name="Founder 1" bg="#d8efe3" seed={1} size={40} />
              <FounderAvatar name="Founder 2" bg="#e2f2ea" seed={2} size={40} />
              <FounderAvatar name="Founder 3" bg="#cfe9dc" seed={3} size={40} />
              <FounderAvatar name="Founder 4" bg="#d8efe3" seed={1} size={40} />
            </div>
            <div className="h-8 w-px bg-[#dce8e1] hidden sm:block" />
            <p className="text-sm text-[#4b5e54]">
              Join <strong className="font-bold text-[#0c1510]">1,000+</strong>{" "}
              founders and builders planning their next big idea with Buildsy.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING / ZERO-BIAS PROMISE */}
      <section
        id="pricing"
        className="py-16 bg-[#f5fbf7] border-y border-[#e5f0ea]"
      >
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-white border border-[#dcece3] p-8 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ed] text-[#134e35] text-xs font-bold uppercase tracking-wider">
                100% Founder-Aligned
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#0c1510]">
                Start building for $0. No affiliate bias, ever.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#4b5e54] leading-relaxed">
                Unlike generic tool directories that push expensive software for
                affiliate commissions, Buildsy is engineered around one metric:
                <strong> keeping your MVP burn rate as close to $0 as possible</strong>.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#2b3b32]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#dff2e7] text-[#146c43] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Adaptive 5–8 question diagnostic</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#dff2e7] text-[#146c43] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>USD ($) and India (₹ INR) support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#dff2e7] text-[#146c43] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>3-Phase purchase &amp; wait schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#dff2e7] text-[#146c43] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>1-click Markdown &amp; JSON export</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#f7fcfa] border border-[#dcece3] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-[#146c43]">
                MLP Early Access
              </p>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="text-4xl font-extrabold text-[#0c1510]">
                  Free
                </span>
                <span className="text-sm text-[#56695f]">/ unlimited plans</span>
              </div>
              <p className="mt-2 text-xs text-[#56695f]">
                No credit card required. Save plans locally and export anytime.
              </p>
              <Link
                href="/app"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#134e35] hover:bg-[#0e3c28] text-white text-sm font-semibold transition"
              >
                <span>Generate your build plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQs (Matches sixth-page.png) */}
      <section id="faqs" className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-[680px] mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] text-[#146c43] uppercase">
              FAQs
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c1510] tracking-tight">
              Got questions? We’ve got answers.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#52655b]">
              Everything you need to know about Buildsy, in one place.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[0.85fr_1.35fr] gap-12 items-start">
            {/* Left Column with Contact CTA & Thinking Founder Illustration */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c1510] leading-tight">
                  Still curious?
                  <br />
                  Here are some
                  <br />
                  quick answers.
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[#52655b] leading-relaxed max-w-[360px]">
                  Can’t find what you’re looking for? Feel free to reach out —
                  we’re happy to help.
                </p>
                <a
                  href="mailto:founders@buildsy.app"
                  className="mt-6 inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#e3f3eb] hover:bg-[#d2ebde] text-[#124b32] text-sm font-semibold transition"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Thinking Founder Illustration matching sixth-page.png */}
              <div className="mt-10 relative max-w-[360px]">
                <svg
                  viewBox="0 0 380 270"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto"
                >
                  {/* Soft Mint Backdrop Blob */}
                  <circle cx="195" cy="145" r="105" fill="#edf7f2" />
                  {/* Thought Bubble with Question Mark */}
                  <circle cx="205" cy="95" r="4" fill="#d3eadf" />
                  <circle cx="222" cy="82" r="7" fill="#d3eadf" />
                  <path
                    d="M250 32C236 32 225 42 225 55C225 68 236 78 250 78H292C306 78 317 68 317 55C317 42 306 32 292 32H250Z"
                    fill="#ffffff"
                    stroke="#dcece3"
                    strokeWidth="2"
                  />
                  <text
                    x="271"
                    y="64"
                    textAnchor="middle"
                    fill="#124b32"
                    fontSize="28"
                    fontWeight="800"
                  >
                    ?
                  </text>
                  {/* Potted Plant */}
                  <path
                    d="M312 215H348L342 255H318L312 215Z"
                    fill="#e2e8f0"
                  />
                  <path
                    d="M330 215C330 188 312 170 312 170C312 170 328 168 330 192C332 165 348 162 348 162C348 162 342 188 330 215Z"
                    fill="#157347"
                  />
                  {/* Founder Sweater */}
                  <path
                    d="M65 255C68 196 102 172 145 172C182 172 206 196 212 255H65Z"
                    fill="#0f5132"
                  />
                  {/* Founder Head & Hair */}
                  <circle cx="145" cy="128" r="28" fill="#f4a97b" />
                  <path
                    d="M115 124C115 98 132 88 152 92C168 95 176 108 173 124C165 112 155 108 138 110C125 112 120 118 115 124Z"
                    fill="#111827"
                  />
                  {/* Thinking Hand on Chin */}
                  <path
                    d="M128 195L142 154"
                    stroke="#f4a97b"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Laptop on Desk */}
                  <path
                    d="M158 195H268L254 255H144L158 195Z"
                    fill="#cbd5e1"
                  />
                  <circle cx="206" cy="225" r="7" fill="#94a3b8" />
                  <line
                    x1="20"
                    y1="255"
                    x2="365"
                    y2="255"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            {/* Right Column: Numbered Accordion (1 to 6) */}
            <div className="space-y-3.5">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaq === item.number;
                return (
                  <div
                    key={item.number}
                    className={`rounded-2xl border transition overflow-hidden ${
                      isOpen
                        ? "border-[#cce5d8] bg-[#f4fbf7]"
                        : "border-[#e7efe9] bg-white hover:border-[#cce5d8]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? 0 : item.number)
                      }
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-[#d7efe2] text-[#124b32] font-bold text-sm flex items-center justify-center shrink-0">
                          {item.number}
                        </span>
                        <span className="text-base font-bold text-[#0c1510]">
                          {item.question}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#124b32] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#4b5e54] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pl-[68px] pr-8 bg-white pt-3 border-t border-[#e5f2eb]">
                        <p className="text-sm text-[#4b5e54] leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: SEE IT IN ACTION / LAPTOP SHOWCASE CTA (Matches last-page.png) */}
      <section className="py-20 lg:py-24 bg-[#f5fbf7] border-t border-[#e5f0ea] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[#146c43] uppercase">
            SEE IT IN ACTION
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0c1510] leading-[1.12] tracking-tight max-w-[760px] mx-auto">
            Go from a raw idea to a clear plan in just{" "}
            <span className="relative inline-block text-[#145334]">
              a few minutes.
              <span className="block mt-0.5">
                <GreenBrushUnderline />
              </span>
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#52655b] max-w-[650px] mx-auto">
            Describe your idea, answer a few questions, and get a personalized
            tool stack, phased plan, and total cost estimate.
          </p>

          <div className="mt-8">
            <Link
              href="/app"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#134e35] hover:bg-[#0e3c28] text-white text-base font-semibold shadow-sm transition"
            >
              <span>Get your build plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Laptop Frame + Floating Callout Cards (Matches last-page.png) */}
          <div className="mt-14 relative max-w-[1040px] mx-auto">
            {/* Left Floating Callout */}
            <div className="hidden xl:flex flex-col items-end absolute -left-28 top-16 z-20">
              <div className="rounded-2xl bg-[#e6f4ed] border border-[#cde6d9] px-4 py-3.5 shadow-sm flex items-center gap-3 text-left max-w-[235px]">
                <Sparkles className="w-5 h-5 text-[#145334] shrink-0" />
                <span className="text-xs font-semibold text-[#124b32] leading-snug">
                  Tailored recommendations for your idea
                </span>
              </div>
              <svg
                width="60"
                height="42"
                viewBox="0 0 60 42"
                fill="none"
                className="mr-4 mt-2"
              >
                <path
                  d="M6 6C16 26 32 34 54 32M54 32L46 26M54 32L47 39"
                  stroke="#145334"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Right Floating Callout */}
            <div className="hidden xl:flex flex-col items-start absolute -right-28 bottom-20 z-20">
              <svg
                width="60"
                height="42"
                viewBox="0 0 60 42"
                fill="none"
                className="ml-4 mb-2"
              >
                <path
                  d="M54 36C44 16 28 8 6 10M6 10L14 16M6 10L13 3"
                  stroke="#145334"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="rounded-2xl bg-[#e6f4ed] border border-[#cde6d9] px-4 py-3.5 shadow-sm flex items-center gap-3 text-left max-w-[225px]">
                <BarChart3 className="w-5 h-5 text-[#145334] shrink-0" />
                <span className="text-xs font-semibold text-[#124b32] leading-snug">
                  Clear cost breakdown before you spend
                </span>
              </div>
            </div>

            {/* MacBook Bezel */}
            <div className="mx-auto max-w-[880px] rounded-t-[26px] bg-[#141917] p-3 sm:p-4 shadow-2xl border-4 border-[#262f2b]">
              {/* Camera Notch */}
              <div className="w-24 h-3 bg-[#0a0d0c] mx-auto rounded-b-lg mb-2 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f2937]" />
              </div>
              <DashboardPreviewCard defaultTab="Overview" compact />
            </div>
            {/* Laptop Base Chin */}
            <div className="mx-auto max-w-[960px] h-5 bg-gradient-to-b from-[#d1d5db] to-[#9ca3af] rounded-b-2xl shadow-md flex items-center justify-center">
              <div className="w-28 h-1.5 rounded-full bg-[#6b7280]/50" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#e5f0ea] py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <BuildsyLogo size="md" />
            <p className="text-xs text-[#617369] mt-1.5">
              Turn your raw product idea into a concrete, budget-disciplined
              build plan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#4b5e54]">
            <Link href="/app" className="hover:text-[#124b32]">
              Build Plan Studio
            </Link>
            <a href="#how-it-works" className="hover:text-[#124b32]">
              How it works
            </a>
            <a href="#features" className="hover:text-[#124b32]">
              Features
            </a>
            <a href="#faqs" className="hover:text-[#124b32]">
              FAQs
            </a>
          </div>
          <p className="text-xs text-[#6c7d73]">
            © {new Date().getFullYear()} Buildsy. Built for solo founders &amp;
            small teams.
          </p>
        </div>
      </footer>

      {/* WATCH DEMO (2 MIN) INTERACTIVE MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#dcece3] shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#f2f7f4] hover:bg-[#e2eee7] flex items-center justify-center text-[#37473f] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ed] text-[#134e35] text-xs font-semibold">
              Interactive Walkthrough
            </span>
            <h3 className="mt-3 text-2xl font-extrabold text-[#0c1510]">
              How Buildsy saves founders $500+ on their MVP
            </h3>
            <div className="mt-5 space-y-4 text-sm text-[#37473f]">
              <div className="p-4 rounded-xl bg-[#f7fcfa] border border-[#e3efe8]">
                <p className="font-bold text-[#0c1510]">
                  1. Adaptive Diagnostic (Not a static directory)
                </p>
                <p className="mt-1 text-xs text-[#52655b]">
                  Describe your product in plain English. Buildsy asks 6
                  targeted follow-up questions about your coding comfort, target
                  geography (India UPI vs US Stripe), and monthly budget cap.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#f7fcfa] border border-[#e3efe8]">
                <p className="font-bold text-[#0c1510]">
                  2. Live Tiered Tool Stack (Free vs. Low-Cost vs. Scale)
                </p>
                <p className="mt-1 text-xs text-[#52655b]">
                  Compare 3 options per category and click{" "}
                  <strong className="text-[#124b32]">&ldquo;Use this&rdquo;</strong> to
                  watch your total monthly and 3-month MVP budget recalculate in
                  real time.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#f7fcfa] border border-[#e3efe8]">
                <p className="font-bold text-[#0c1510]">
                  3. Phased Buying Plan (What NOT to buy yet)
                </p>
                <p className="mt-1 text-xs text-[#52655b]">
                  See exactly what to use for $0 in Phase 1 (Weeks 1–4) and
                  which subscriptions to delay until Phase 2 (Launch) or Phase 3
                  ($2k+ MRR).
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2.5 rounded-xl border border-[#dce5e0] text-xs font-semibold text-[#4b5e54] hover:bg-[#f6faf8] cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/app"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#134e35] hover:bg-[#0e3c28] text-white text-xs font-semibold"
              >
                <span>Launch Buildsy Studio now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
