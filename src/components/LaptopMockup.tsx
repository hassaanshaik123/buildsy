"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FilePlus2,
  FolderKanban,
  Bookmark,
  Settings,
  Upload,
  Check,
} from "lucide-react";
import { BuildsyLogo, ToolBrandIcon, BudgetDonutChart } from "@/components/ToolLogos";

interface LaptopMockupProps {
  ideaTitle?: string;
  onSelectIdea?: (idea: string) => void;
}

export function LaptopMockup({
  ideaTitle = "AI MVP Build Plan",
}: LaptopMockupProps) {
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Tool Stack" | "Phases" | "Cost Breakdown"
  >("Overview");

  // Interactive tool selection inside the laptop screen
  const [toolsState, setToolsState] = useState<{
    nextjs: boolean;
    supabase: boolean;
    stripe: boolean;
    figma: boolean;
  }>({
    nextjs: true,
    supabase: true,
    stripe: true,
    figma: true,
  });

  // Calculate live monthly cost in mockup
  const monthlyCost = toolsState.stripe ? 20 : 0;

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">
      {/* Hand-drawn Green Doodle Arrow + Handwritten Callout on Top Right */}
      <div className="absolute -top-11 right-0 sm:-right-4 z-20 flex items-center gap-2 pointer-events-none">
        <div className="font-handwriting text-lg sm:text-[22px] text-[#15803d] font-bold leading-tight text-right -rotate-3">
          Your personalized
          <br />
          tool stack
        </div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 50 50"
          fill="none"
          className="text-[#15803d] mt-2 rotate-[-12deg]"
        >
          <path
            d="M42 6C32 14 16 26 10 42M10 42L7 32M10 42L20 39"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 3D Soft-Mint Pedestal Beneath Laptop (Matches 1st-Hero-Page.png) */}
      <div className="relative pt-4">
        {/* Ambient mint glow */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-[#d8f2e5]/60 rounded-full blur-3xl pointer-events-none" />

        {/* Laptop Outer Bezel */}
        <div className="relative z-10 rounded-t-[20px] bg-[#1a1e24] p-[10px] pb-0 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] border border-[#2d3748]">
          {/* Top Bezel Webcam Notch / Dot */}
          <div className="flex items-center justify-center pb-1.5 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#374151] border border-[#1f2937]" />
          </div>

          {/* Laptop Screen Content (16:10 Aspect Ratio) */}
          <div className="relative rounded-t-lg bg-white overflow-hidden border border-[#e5e7eb] text-left text-[#0c1510] aspect-[16/10.5] flex">
            {/* Left Sidebar inside Laptop */}
            <aside className="w-[125px] sm:w-[135px] bg-[#fbfdfc] border-r border-[#edf2ef] p-3 flex flex-col justify-between shrink-0">
              <div>
                <div className="pb-3.5 pt-0.5 px-1">
                  <BuildsyLogo size="sm" />
                </div>

                <div className="space-y-1">
                  <Link
                    href="/app"
                    className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0f5132] text-white text-[10px] font-semibold shadow-2xs hover:bg-[#0c4128] transition"
                  >
                    <FilePlus2 className="w-3 h-3 shrink-0" />
                    <span>New Plan</span>
                  </Link>

                  <div className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#4b5e54] text-[10px] font-medium hover:bg-[#eef5f1] transition cursor-default">
                    <FolderKanban className="w-3 h-3 text-[#64748b] shrink-0" />
                    <span>My Plans</span>
                  </div>

                  <div className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#4b5e54] text-[10px] font-medium hover:bg-[#eef5f1] transition cursor-default">
                    <Bookmark className="w-3 h-3 text-[#64748b] shrink-0" />
                    <span>Saved</span>
                  </div>

                  <div className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#4b5e54] text-[10px] font-medium hover:bg-[#eef5f1] transition cursor-default">
                    <Settings className="w-3 h-3 text-[#64748b] shrink-0" />
                    <span>Settings</span>
                  </div>
                </div>
              </div>

              {/* Live Cost Ticker in Sidebar */}
              <div className="p-2 rounded-lg bg-[#f0f8f3] border border-[#d6ebe0] text-[9px] text-[#0f5132]">
                <p className="font-semibold text-[#0c1510]">MVP Est. Cost</p>
                <p className="text-xs font-extrabold text-[#0f5132] mt-0.5">
                  ${monthlyCost}/mo
                </p>
              </div>
            </aside>

            {/* Main Content inside Laptop Screen */}
            <div className="flex-1 p-3.5 sm:p-4 bg-white flex flex-col justify-between overflow-hidden">
              <div>
                {/* Header Row: "Your Build Plan" + "Export Plan" */}
                <div className="flex items-center justify-between gap-2 pb-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[#0c1510] tracking-tight">
                      Your Build Plan
                    </h3>
                    <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[#e6f5ed] text-[#0f5132] text-[9px] font-bold">
                      {ideaTitle}
                    </span>
                  </div>
                  <Link
                    href="/app"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[#e2e8f0] bg-white text-[10px] font-medium text-[#334155] shadow-2xs hover:bg-[#f8fafc] transition"
                  >
                    <Upload className="w-2.5 h-2.5 rotate-180 text-[#64748b]" />
                    <span>Export Plan</span>
                  </Link>
                </div>

                {/* Tabs Row (Overview | Tool Stack | Phases | Cost Breakdown) */}
                <div className="flex items-center gap-3.5 border-b border-[#f1f5f3] text-[10px] font-medium mb-3">
                  {(
                    ["Overview", "Tool Stack", "Phases", "Cost Breakdown"] as const
                  ).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`pb-1.5 transition cursor-pointer border-b-2 ${
                          isActive
                            ? "border-[#0f5132] text-[#0f5132] font-bold"
                            : "border-transparent text-[#64748b] hover:text-[#0f5132]"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* TAB 1: OVERVIEW (Matches 1st-Hero-Page.png) */}
                {activeTab === "Overview" && (
                  <div>
                    <h4 className="text-[11px] font-bold text-[#0c1510] mb-2 flex items-center justify-between">
                      <span>Recommended Tools</span>
                      <span className="text-[9px] font-normal text-[#64748b]">
                        Interactive preview • Click to toggle
                      </span>
                    </h4>

                    {/* 4 Tool Rows (Next.js, Supabase, Stripe, Figma) */}
                    <div className="space-y-1.5">
                      {/* Row 1: Next.js */}
                      <div className="p-1.5 sm:p-2 rounded-lg border border-[#edf2ef] bg-[#fcfdfd] flex items-center justify-between gap-2 hover:border-[#bbf7d0] transition">
                        <div className="flex items-center gap-2 min-w-[90px]">
                          <div className="w-6 h-6 rounded-md bg-[#000000] text-white flex items-center justify-center font-bold text-[10px]">
                            N
                          </div>
                          <span className="text-[10px] font-bold text-[#0c1510]">
                            Next.js
                          </span>
                        </div>

                        <div className="hidden sm:flex flex-col gap-1 flex-1 px-2">
                          <div className="h-1.5 bg-[#e2e8f0] rounded-full w-24" />
                          <div className="h-1 bg-[#edf2f7] rounded-full w-14" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#e6f5ed] text-[#0f5132] text-[9px] font-semibold">
                            Free
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setToolsState((s) => ({ ...s, nextjs: !s.nextjs }))
                            }
                            className={`px-2 py-1 rounded-md text-[9px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                              toolsState.nextjs
                                ? "bg-[#0f5132] text-white"
                                : "border border-[#cbd5e1] text-[#334155] hover:border-[#0f5132]"
                            }`}
                          >
                            {toolsState.nextjs && <Check className="w-2.5 h-2.5" />}
                            {toolsState.nextjs ? "Active" : "Use this"}
                          </button>
                        </div>
                      </div>

                      {/* Row 2: Supabase */}
                      <div className="p-1.5 sm:p-2 rounded-lg border border-[#edf2ef] bg-[#fcfdfd] flex items-center justify-between gap-2 hover:border-[#bbf7d0] transition">
                        <div className="flex items-center gap-2 min-w-[90px]">
                          <div className="w-6 h-6 rounded-md bg-[#e6f7ef] flex items-center justify-center">
                            <ToolBrandIcon logoKey="supabase" size={16} />
                          </div>
                          <span className="text-[10px] font-bold text-[#0c1510]">
                            Supabase
                          </span>
                        </div>

                        <div className="hidden sm:flex flex-col gap-1 flex-1 px-2">
                          <div className="h-1.5 bg-[#e2e8f0] rounded-full w-20" />
                          <div className="h-1 bg-[#edf2f7] rounded-full w-12" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#e6f5ed] text-[#0f5132] text-[9px] font-semibold">
                            Free
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setToolsState((s) => ({
                                ...s,
                                supabase: !s.supabase,
                              }))
                            }
                            className={`px-2 py-1 rounded-md text-[9px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                              toolsState.supabase
                                ? "bg-[#0f5132] text-white"
                                : "border border-[#cbd5e1] text-[#334155] hover:border-[#0f5132]"
                            }`}
                          >
                            {toolsState.supabase && (
                              <Check className="w-2.5 h-2.5" />
                            )}
                            {toolsState.supabase ? "Active" : "Use this"}
                          </button>
                        </div>
                      </div>

                      {/* Row 3: Stripe */}
                      <div className="p-1.5 sm:p-2 rounded-lg border border-[#edf2ef] bg-[#fcfdfd] flex items-center justify-between gap-2 hover:border-[#bbf7d0] transition">
                        <div className="flex items-center gap-2 min-w-[90px]">
                          <div className="w-6 h-6 rounded-md bg-[#635bff] text-white flex items-center justify-center font-extrabold text-[10px]">
                            S
                          </div>
                          <span className="text-[10px] font-bold text-[#0c1510]">
                            Stripe
                          </span>
                        </div>

                        <div className="hidden sm:flex flex-col gap-1 flex-1 px-2">
                          <div className="h-1.5 bg-[#e2e8f0] rounded-full w-28" />
                          <div className="h-1 bg-[#edf2f7] rounded-full w-16" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#e6f5ed] text-[#0f5132] text-[9px] font-semibold">
                            $20/mo
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setToolsState((s) => ({ ...s, stripe: !s.stripe }))
                            }
                            className={`px-2 py-1 rounded-md text-[9px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                              toolsState.stripe
                                ? "bg-[#0f5132] text-white"
                                : "border border-[#cbd5e1] text-[#334155] hover:border-[#0f5132]"
                            }`}
                          >
                            {toolsState.stripe && (
                              <Check className="w-2.5 h-2.5" />
                            )}
                            {toolsState.stripe ? "Active" : "Use this"}
                          </button>
                        </div>
                      </div>

                      {/* Row 4: Figma */}
                      <div className="p-1.5 sm:p-2 rounded-lg border border-[#edf2ef] bg-[#fcfdfd] flex items-center justify-between gap-2 hover:border-[#bbf7d0] transition">
                        <div className="flex items-center gap-2 min-w-[90px]">
                          <div className="w-6 h-6 rounded-md bg-[#1e1e1e] flex items-center justify-center">
                            <ToolBrandIcon logoKey="figma" size={14} />
                          </div>
                          <span className="text-[10px] font-bold text-[#0c1510]">
                            Figma
                          </span>
                        </div>

                        <div className="hidden sm:flex flex-col gap-1 flex-1 px-2">
                          <div className="h-1.5 bg-[#e2e8f0] rounded-full w-24" />
                          <div className="h-1 bg-[#edf2f7] rounded-full w-14" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#e6f5ed] text-[#0f5132] text-[9px] font-semibold">
                            Free
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setToolsState((s) => ({ ...s, figma: !s.figma }))
                            }
                            className={`px-2 py-1 rounded-md text-[9px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                              toolsState.figma
                                ? "bg-[#0f5132] text-white"
                                : "border border-[#cbd5e1] text-[#334155] hover:border-[#0f5132]"
                            }`}
                          >
                            {toolsState.figma && <Check className="w-2.5 h-2.5" />}
                            {toolsState.figma ? "Active" : "Use this"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: TOOL STACK */}
                {activeTab === "Tool Stack" && (
                  <div className="space-y-2 py-1">
                    <div className="p-2.5 rounded-xl bg-[#f8faf9] border border-[#e5ece8] flex items-center justify-between text-[10px]">
                      <div>
                        <span className="font-bold text-[#0c1510]">
                          Frontend: Next.js + Tailwind
                        </span>
                        <p className="text-[#64748b] text-[9px]">
                          Free on Vercel Hobby tier • Zero upfront cost
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#e6f5ed] text-[#0f5132] font-bold">
                        $0
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#f8faf9] border border-[#e5ece8] flex items-center justify-between text-[10px]">
                      <div>
                        <span className="font-bold text-[#0c1510]">
                          Database: Supabase Postgres
                        </span>
                        <p className="text-[#64748b] text-[9px]">
                          Includes 50k MAU auth + 500MB DB space free
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#e6f5ed] text-[#0f5132] font-bold">
                        $0
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#f8faf9] border border-[#e5ece8] flex items-center justify-between text-[10px]">
                      <div>
                        <span className="font-bold text-[#0c1510]">
                          Payments: Stripe Checkout
                        </span>
                        <p className="text-[#64748b] text-[9px]">
                          2.9% + 30¢/txn • No fixed recurring fees
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#e6f5ed] text-[#0f5132] font-bold">
                        $0/mo base
                      </span>
                    </div>
                  </div>
                )}

                {/* TAB 3: PHASES */}
                {activeTab === "Phases" && (
                  <div className="space-y-2 py-1 text-[10px]">
                    <div className="p-2.5 rounded-xl border border-[#d1ebd9] bg-[#f4fbf7]">
                      <div className="flex items-center justify-between font-bold text-[#0f5132]">
                        <span>Phase 1: Build &amp; Validate (W1–4)</span>
                        <span>$0/mo</span>
                      </div>
                      <p className="text-[#526058] text-[9px] mt-0.5">
                        Free tiers only: Next.js, Supabase, Figma &amp; GitHub
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl border border-[#e2e8f0] bg-white">
                      <div className="flex items-center justify-between font-bold text-[#0c1510]">
                        <span>Phase 2: Launch MVP (M2–3)</span>
                        <span>$20/mo</span>
                      </div>
                      <p className="text-[#64748b] text-[9px] mt-0.5">
                        Custom domain + transactional email + analytics
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 4: COST BREAKDOWN */}
                {activeTab === "Cost Breakdown" && (
                  <div className="py-1 flex items-center justify-around gap-3">
                    <BudgetDonutChart
                      size={86}
                      values={{
                        Development: 40,
                        Design: 20,
                        "Database & Infra": 20,
                        Marketing: 10,
                        Other: 10,
                      }}
                    />
                    <div className="space-y-1 text-[9px]">
                      <div className="flex items-center justify-between gap-4 font-semibold">
                        <span className="text-[#10b981]">● Development</span>
                        <span>$0</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 font-semibold">
                        <span className="text-[#0ea5e9]">● Database</span>
                        <span>$0</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 font-semibold">
                        <span className="text-[#635bff]">● Payments</span>
                        <span>$20</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 font-bold border-t border-[#f1f5f3] pt-0.5">
                        <span>Total Month 1:</span>
                        <span className="text-[#0f5132]">${monthlyCost}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Keyboard Deck & Front Lip */}
        <div className="relative z-10 mx-auto w-[105%] -ml-[2.5%] h-3 bg-gradient-to-b from-[#8f9ca8] via-[#cbd5e1] to-[#64748b] rounded-b-lg shadow-md flex justify-center">
          {/* Thumb indent */}
          <div className="w-16 h-1 bg-[#475569] rounded-b-sm" />
        </div>

        {/* 3D Soft Mint Pedestal Platform Underneath Laptop (Matches 1st-Hero-Page.png) */}
        <div className="relative -mt-1 w-[122%] -ml-[11%]">
          {/* Pedestal Top Face */}
          <div className="h-9 bg-gradient-to-b from-[#e3f4ec] to-[#d6ede2] rounded-t-[28px] border-t border-[#c6e4d4] shadow-xs" />
          {/* Pedestal Front Depth Edge */}
          <div className="h-7 bg-gradient-to-b from-[#cfe9dc] via-[#bedccf] to-[#b0d2c3] rounded-b-[20px] shadow-[0_20px_40px_-10px_rgba(16,78,48,0.12)] border-b border-[#a8ccbc]" />
        </div>
      </div>
    </div>
  );
}
