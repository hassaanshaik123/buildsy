"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FilePlus2,
  FolderKanban,
  Bookmark,
  Settings,
  Upload,
} from "lucide-react";
import { BuildsyLogo, ToolBrandIcon } from "@/components/ToolLogos";

export function LaptopMockup() {
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Tool Stack" | "Phases" | "Cost Breakdown"
  >("Overview");

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">
      {/* Hand-drawn Green Doodle Arrow + Handwritten Callout on Top Right */}
      <div className="absolute -top-12 right-0 sm:-right-4 z-20 flex items-center gap-2 pointer-events-none">
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
            </aside>

            {/* Main Content inside Laptop Screen */}
            <div className="flex-1 p-3.5 sm:p-4 bg-white flex flex-col justify-between overflow-hidden">
              <div>
                {/* Header Row: "Your Build Plan" + "Export Plan" */}
                <div className="flex items-center justify-between gap-2 pb-2.5">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0c1510] tracking-tight">
                    Your Build Plan
                  </h3>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[#e2e8f0] bg-white text-[10px] font-medium text-[#334155] shadow-2xs hover:bg-[#f8fafc]"
                  >
                    <Upload className="w-2.5 h-2.5 rotate-180 text-[#64748b]" />
                    <span>Export Plan</span>
                  </button>
                </div>

                {/* Tabs Row (Matches mockup: Overview active with green underline) */}
                <div className="flex items-center gap-4 border-b border-[#f1f5f3] text-[10px] font-medium mb-3">
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

                {/* Section Heading: "Recommended Tools" */}
                <h4 className="text-[11px] font-bold text-[#0c1510] mb-2">
                  Recommended Tools
                </h4>

                {/* 4 Tool Rows (Next.js, Supabase, Stripe, Figma) matching mockup */}
                <div className="space-y-1.5">
                  {/* Row 1: Next.js */}
                  <div className="p-1.5 sm:p-2 rounded-lg border border-[#edf2ef] bg-[#fcfdfd] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-[90px]">
                      <div className="w-6 h-6 rounded-md bg-[#000000] text-white flex items-center justify-center font-bold text-[10px]">
                        N
                      </div>
                      <span className="text-[10px] font-bold text-[#0c1510]">
                        Next.js
                      </span>
                    </div>

                    {/* Skeleton progress lines */}
                    <div className="hidden sm:flex flex-col gap-1 flex-1 px-2">
                      <div className="h-1.5 bg-[#e2e8f0] rounded-full w-24" />
                      <div className="h-1 bg-[#edf2f7] rounded-full w-14" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#e6f5ed] text-[#0f5132] text-[9px] font-semibold">
                        Free
                      </span>
                      <Link
                        href="/app"
                        className="px-2 py-1 rounded-md border border-[#cbd5e1] hover:border-[#0f5132] text-[9px] font-semibold text-[#1e293b] hover:text-[#0f5132] transition bg-white"
                      >
                        Use this
                      </Link>
                    </div>
                  </div>

                  {/* Row 2: Supabase */}
                  <div className="p-1.5 sm:p-2 rounded-lg border border-[#edf2ef] bg-[#fcfdfd] flex items-center justify-between gap-2">
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
                      <Link
                        href="/app"
                        className="px-2 py-1 rounded-md border border-[#cbd5e1] hover:border-[#0f5132] text-[9px] font-semibold text-[#1e293b] hover:text-[#0f5132] transition bg-white"
                      >
                        Use this
                      </Link>
                    </div>
                  </div>

                  {/* Row 3: Stripe */}
                  <div className="p-1.5 sm:p-2 rounded-lg border border-[#edf2ef] bg-[#fcfdfd] flex items-center justify-between gap-2">
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
                      <Link
                        href="/app"
                        className="px-2 py-1 rounded-md border border-[#cbd5e1] hover:border-[#0f5132] text-[9px] font-semibold text-[#1e293b] hover:text-[#0f5132] transition bg-white"
                      >
                        Use this
                      </Link>
                    </div>
                  </div>

                  {/* Row 4: Figma */}
                  <div className="p-1.5 sm:p-2 rounded-lg border border-[#edf2ef] bg-[#fcfdfd] flex items-center justify-between gap-2">
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
                      <Link
                        href="/app"
                        className="px-2 py-1 rounded-md border border-[#cbd5e1] hover:border-[#0f5132] text-[9px] font-semibold text-[#1e293b] hover:text-[#0f5132] transition bg-white"
                      >
                        Use this
                      </Link>
                    </div>
                  </div>
                </div>
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
