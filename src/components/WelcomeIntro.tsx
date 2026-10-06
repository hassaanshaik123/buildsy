"use client";

import React, { useEffect, useState } from "react";
import { SparkleRays } from "@/components/ToolLogos";
import { CheckCircle2, Layers, IndianRupee } from "lucide-react";

interface WelcomeIntroProps {
  onComplete?: () => void;
}

export function WelcomeIntro({ onComplete }: WelcomeIntroProps) {
  const [phase, setPhase] = useState<"playing" | "exiting" | "done">("playing");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per session so developers and users aren't repeatedly blocked on reloads
    try {
      if (sessionStorage.getItem("buildsy_intro_seen")) {
        setPhase("done");
        onComplete?.();
        return;
      }
      sessionStorage.setItem("buildsy_intro_seen", "true");
    } catch {
      // ignore storage errors
    }
    // Smooth 0 -> 100% counter over 6 seconds (6000ms)
    const startTime = Date.now();
    const duration = 6000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
      }
    }, 50);

    // Start smooth exit transition after 6.0s
    const exitTimer = setTimeout(() => {
      setPhase("exiting");
    }, 6000);

    // Unmount completely after exit animation finishes (6.65s)
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 6650);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase("exiting");
    setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 450);
  };

  if (phase === "done") return null;

  const loadingStageText =
    progress < 35
      ? "Initializing Buildsy studio..."
      : progress < 70
      ? "Loading live tool stacks & free-tier pricing..."
      : progress < 95
      ? "Preparing your phased MVP budget calculator..."
      : "Ready! Launching buildsy.me...";

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-hidden transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === "exiting"
          ? "opacity-0 scale-[1.04] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle White-on-Mint Radial Glows Matching Website Palette */}
      <div className="pointer-events-none absolute -top-36 -left-36 w-[520px] h-[520px] rounded-full bg-[#e6f4ed]/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-36 w-[520px] h-[520px] rounded-full bg-[#e6f4ed]/65 blur-3xl" />

      {/* Top Bar */}
      <div className="w-full max-w-[1200px] flex items-center justify-between relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f4ed] text-[#134e35] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#198754] animate-ping" />
          <span>Plan smarter. Build faster.</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-semibold text-[#5c6f64] hover:text-[#134e35] px-3 py-1.5 rounded-lg hover:bg-[#f2f8f5] transition cursor-pointer"
        >
          Skip intro →
        </button>
      </div>

      {/* Center Stage: Welcoming Video-Style Kinetic Typography */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        {/* Big Bold "buildsy.me" Heading */}
        <div className="relative inline-flex items-baseline justify-center">
          <SparkleRays className="hidden sm:block absolute -top-10 -right-12 animate-buildsy-dot rotate-90" />

          <h1 className="text-6xl sm:text-8xl md:text-[108px] font-extrabold tracking-tight leading-none flex items-baseline">
            <span className="text-[#0c1510] animate-buildsy-word inline-block">
              buildsy
            </span>
            <span className="text-[#198754] animate-buildsy-dot inline-block">
              .
            </span>
            <span className="text-[#134e35] animate-buildsy-dot inline-block">
              me
            </span>
          </h1>
        </div>

        {/* Self-Drawing Green Brush Stroke Underline */}
        <div className="w-64 sm:w-96 md:w-[460px] mt-2 sm:mt-3">
          <svg
            viewBox="0 0 420 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M6 14C112 5 268 4 414 13"
              stroke="#4ca977"
              strokeWidth="5.5"
              strokeLinecap="round"
              className="animate-buildsy-brush"
            />
            <path
              d="M24 17.5C138 11 282 10 398 16"
              stroke="#7bc49c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.75"
              className="animate-buildsy-brush"
            />
          </svg>
        </div>

        {/* Subtext: "Get your personalized budget tool stack" */}
        <p className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl font-bold text-[#134e35] tracking-tight animate-buildsy-subtext">
          Get your personalized budget tool stack
        </p>

        <p className="mt-2.5 text-sm sm:text-base text-[#52655b] max-w-lg animate-buildsy-subtext">
          Turn your raw product idea into a phased buying plan &amp; total MVP
          cost estimate — before you spend money on the wrong tools.
        </p>

        {/* Animated Motion-Video Preview Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="animate-buildsy-chip-1 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f4fbf7] border border-[#d6ebe0] text-xs sm:text-sm font-semibold text-[#124b32] shadow-2xs">
            <Layers className="w-4 h-4 text-[#198754]" />
            <span>Free / Low-Cost / Scale Tiers</span>
          </div>

          <div className="animate-buildsy-chip-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f4fbf7] border border-[#d6ebe0] text-xs sm:text-sm font-semibold text-[#124b32] shadow-2xs">
            <IndianRupee className="w-4 h-4 text-[#198754]" />
            <span>Phased Buying Schedule</span>
          </div>

          <div className="animate-buildsy-chip-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e6f5ed] border border-[#c2e5d3] text-xs sm:text-sm font-bold text-[#146c43] shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-[#146c43]" />
            <span>Zero Overspending</span>
          </div>
        </div>
      </div>

      {/* Bottom Area: 6-Second Loading Animation (Spinner + Bouncing Dots + Progress Bar + Percentage) */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 relative z-10 pb-2">
        {/* Spinner Ring + Bouncing Dots + Percentage */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#f4fbf7] border border-[#d8eee2] shadow-2xs">
          {/* Dual-ring SVG spinner */}
          <svg
            className="w-4 h-4 text-[#134e35] animate-spin shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="#cde5d8"
              strokeWidth="3"
            />
            <path
              d="M21 12a9 9 0 00-9-9"
              stroke="#134e35"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <span className="text-xs font-semibold text-[#134e35]">
            {loadingStageText}
          </span>

          {/* Bouncing dots */}
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#198754] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#198754] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#198754] animate-bounce" />
          </span>

          <span className="text-xs font-extrabold text-[#0c1510] tabular-nums ml-1">
            {progress}%
          </span>
        </div>

        {/* Smooth 6-Second Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#e6f2ec] overflow-hidden p-0.5">
          <div className="h-full bg-gradient-to-r from-[#134e35] via-[#198754] to-[#22c55e] rounded-full animate-buildsy-progress" />
        </div>
      </div>
    </div>
  );
}
