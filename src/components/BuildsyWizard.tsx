"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  Paperclip,
  Check,
  GraduationCap,
  ShoppingBag,
  Code2,
  Lightbulb,
  FileText,
  BarChart3,
  Palette,
  Sparkles,
  Users,
  Sprout,
  Rocket,
  Box,
  Building2,
  MoreHorizontal,
  UploadCloud,
  X,
} from "lucide-react";
import { BuildsyLogo } from "@/components/ToolLogos";

export interface WizardAnswers {
  idea: string;
  stage: string;
  technicalSkill: string;
  budget: string;
  budgetNumericRange: { min: number; max: number };
  attachedFileName?: string;
  currency: "INR" | "USD";
}

interface BuildsyWizardProps {
  initialIdea?: string;
  initialStep?: 1 | 2 | 3 | 4;
  onFinish: (answers: WizardAnswers) => void;
  onExit?: () => void;
}

export function BuildsyWizard({
  initialIdea = "",
  initialStep = 1,
  onFinish,
  onExit,
}: BuildsyWizardProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(initialStep);

  // Step 1 State
  const [ideaText, setIdeaText] = useState(initialIdea);

  // Step 2 State
  const [selectedStage, setSelectedStage] = useState<string>("Just an idea");

  // Step 3 State
  const [selectedSkill, setSelectedSkill] = useState<string>(
    "AI-Assisted Coding"
  );

  // Step 4 State
  const [selectedBudget, setSelectedBudget] = useState<string>(
    "₹5,000 – ₹25,000"
  );
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const prdFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setAttachedFile({
        name: file.name,
        size: `${sizeMB} MB`,
      });
    }
  };

  const handleFinish = () => {
    // Parse numeric range for budget
    let min = 5000;
    let max = 25000;
    if (selectedBudget.includes("Under")) {
      min = 0;
      max = 5000;
    } else if (selectedBudget.includes("₹5,000 – ₹25,000")) {
      min = 5000;
      max = 25000;
    } else if (selectedBudget.includes("₹25,000 – ₹1,00,000")) {
      min = 25000;
      max = 100000;
    } else if (selectedBudget.includes("₹1,00,000 – ₹5,00,000")) {
      min = 100000;
      max = 500000;
    } else if (selectedBudget.includes("₹5,00,000+")) {
      min = 500000;
      max = 1500000;
    } else {
      min = 10000;
      max = 50000;
    }

    onFinish({
      idea: ideaText.trim() || "AI Marketplace MVP",
      stage: selectedStage,
      technicalSkill: selectedSkill,
      budget: selectedBudget,
      budgetNumericRange: { min, max },
      attachedFileName: attachedFile?.name,
      currency: "INR",
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fcfa] text-[#0c1510] flex flex-col relative overflow-hidden">
      {/* Soft Ambient Mint Blobs in corners (Matches Mockups) */}
      <div className="pointer-events-none absolute -top-28 -left-28 w-[540px] h-[540px] rounded-full bg-[#e8f7ee]/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 w-[580px] h-[580px] rounded-full bg-[#e8f7ee]/65 blur-3xl" />

      {/* Top Navbar (Matches Mockups Header Exactly) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#eaf2ed]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <BuildsyLogo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-[#2d3732]">
            <Link href="/#how-it-works" className="hover:text-[#0f5132] transition">
              How it works
            </Link>
            <Link href="/#features" className="hover:text-[#0f5132] transition">
              Features
            </Link>
            <Link href="/#pricing" className="hover:text-[#0f5132] transition">
              Pricing
            </Link>
            <Link href="/#faqs" className="hover:text-[#0f5132] transition">
              FAQs
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-[#2d3732] hover:text-[#0f5132] transition"
            >
              Sign in
            </Link>
            <button
              type="button"
              onClick={() => {
                if (currentStep < 4) {
                  setCurrentStep((s) => (s + 1) as 1 | 2 | 3 | 4);
                } else {
                  handleFinish();
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f5132] hover:bg-[#0c4128] text-white text-sm font-semibold shadow-xs transition cursor-pointer"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Wizard Content Area */}
      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-start relative z-10">
        {/* Stepper Indicator (Matches 2nd-Page.png, 3rd-page.png, 4th-page.png) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-9">
          {/* Step 1 Circle */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer ${
              currentStep === 1
                ? "bg-[#0f5132] text-white shadow-xs ring-4 ring-[#0f5132]/10"
                : currentStep > 1
                ? "bg-[#e6f5ed] text-[#0f5132]"
                : "bg-white border border-[#e2e8f0] text-[#94a3b8]"
            }`}
          >
            {currentStep > 1 ? <Check className="w-4 h-4 stroke-[2.8]" /> : "1"}
          </button>

          {/* Line 1 -> 2 */}
          <div
            className={`w-8 sm:w-12 h-0.5 transition-colors ${
              currentStep > 1 ? "bg-[#0f5132]" : "bg-[#e2e8f0]"
            }`}
          />

          {/* Step 2 Circle */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer ${
              currentStep === 2
                ? "bg-[#0f5132] text-white shadow-xs ring-4 ring-[#0f5132]/10"
                : currentStep > 2
                ? "bg-[#e6f5ed] text-[#0f5132]"
                : "bg-white border border-[#e2e8f0] text-[#94a3b8]"
            }`}
          >
            {currentStep > 2 ? <Check className="w-4 h-4 stroke-[2.8]" /> : "2"}
          </button>

          {/* Line 2 -> 3 */}
          <div
            className={`w-8 sm:w-12 h-0.5 transition-colors ${
              currentStep > 2 ? "bg-[#0f5132]" : "bg-[#e2e8f0]"
            }`}
          />

          {/* Step 3 Circle */}
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer ${
              currentStep === 3
                ? "bg-[#0f5132] text-white shadow-xs ring-4 ring-[#0f5132]/10"
                : currentStep > 3
                ? "bg-[#e6f5ed] text-[#0f5132]"
                : "bg-white border border-[#e2e8f0] text-[#94a3b8]"
            }`}
          >
            {currentStep > 3 ? <Check className="w-4 h-4 stroke-[2.8]" /> : "3"}
          </button>

          {/* Line 3 -> 4 */}
          <div
            className={`w-8 sm:w-12 h-0.5 transition-colors ${
              currentStep > 3 ? "bg-[#0f5132]" : "bg-[#e2e8f0]"
            }`}
          />

          {/* Step 4 Circle */}
          <button
            type="button"
            onClick={() => setCurrentStep(4)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer ${
              currentStep === 4
                ? "bg-[#0f5132] text-white shadow-xs ring-4 ring-[#0f5132]/10"
                : "bg-white border border-[#e2e8f0] text-[#94a3b8]"
            }`}
          >
            4
          </button>
        </div>

        {/* ============================================================ */}
        {/* STEP 1: What are you looking to build? (Matches 2nd-Page.png) */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="w-full max-w-[760px] text-center">
            <p className="text-xs font-bold tracking-widest text-[#0f5132] uppercase mb-2">
              STEP 1 OF 4
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0c1510] tracking-tight">
              What are you looking to build?
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#526058]">
              Describe your product idea in a few lines.
            </p>

            {/* Big Rounded Textarea Card */}
            <div className="mt-8 rounded-2xl bg-white border border-[#d8e8de] p-5 sm:p-6 shadow-[0_10px_30px_-10px_rgba(16,78,48,0.06)] focus-within:border-[#0f5132] focus-within:ring-2 focus-within:ring-[#0f5132]/15 transition text-left">
              <textarea
                rows={5}
                maxLength={500}
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    if (ideaText.trim()) setCurrentStep(2);
                  }
                }}
                placeholder="e.g. A marketplace to connect students with verified tutors..."
                className="w-full bg-transparent text-[#0c1510] placeholder-[#9ca3af] text-sm sm:text-base focus:outline-none resize-none leading-relaxed"
              />

              {/* Bottom Row inside Card */}
              <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#f1f5f3]">
                {/* Paperclip file attach button */}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach PRD or notes (Optional)"
                    className="p-1.5 rounded-lg text-[#64748b] hover:text-[#0f5132] hover:bg-[#eef5f1] transition cursor-pointer"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  {attachedFile && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#e6f5ed] text-[#0f5132] text-xs font-medium">
                      <span>{attachedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                {/* Character counter & Circle submit button */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#9ca3af]">
                    {ideaText.length}/500
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (ideaText.trim()) {
                        setCurrentStep(2);
                      }
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer ${
                      ideaText.trim().length > 0
                        ? "bg-[#0f5132] text-white shadow-2xs hover:bg-[#0c4128]"
                        : "bg-[#d1fae5] text-[#0f5132]"
                    }`}
                  >
                    <ArrowUp className="w-4 h-4 stroke-[2.4]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Suggestions / Try an Example Strip */}
            <div className="mt-8 text-left">
              <p className="text-xs font-semibold text-[#526058] mb-3">
                Not sure? Try an example
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  {
                    icon: <GraduationCap className="w-4 h-4 text-[#0f5132]" />,
                    text: "A platform to connect students with verified tutors",
                  },
                  {
                    icon: <ShoppingBag className="w-4 h-4 text-[#0f5132]" />,
                    text: "A D2C brand for sustainable home products",
                  },
                  {
                    icon: <Code2 className="w-4 h-4 text-[#0f5132]" />,
                    text: "An AI tool to generate short-form video scripts",
                  },
                ].map((item) => (
                  <button
                    key={item.text}
                    type="button"
                    onClick={() => setIdeaText(item.text)}
                    className="p-3.5 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#10b981] hover:shadow-xs transition text-left flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#e6f5ed] flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <p className="text-xs font-medium text-[#0c1510] leading-snug line-clamp-2">
                        {item.text}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#0f5132] group-hover:translate-x-0.5 transition shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: What stage are you at? (Matches 3rd-page.png) */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div className="w-full max-w-[760px] text-center">
            <p className="text-xs font-bold tracking-widest text-[#0f5132] uppercase mb-2">
              STEP 2 OF 4
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0c1510] tracking-tight">
              What stage are you at?
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#526058]">
              This helps us recommend the right tools for you.
            </p>

            {/* 2x2 Option Cards Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  id: "Just an idea",
                  title: "Just an idea",
                  desc: "Exploring and validating the idea.",
                  icon: <Lightbulb className="w-5 h-5 text-[#0f5132]" />,
                  iconBg: "bg-[#e6f5ed]",
                },
                {
                  id: "Planning",
                  title: "Planning",
                  desc: "Defining features and planning the MVP.",
                  icon: <FileText className="w-5 h-5 text-[#2563eb]" />,
                  iconBg: "bg-[#eff6ff]",
                },
                {
                  id: "Building",
                  title: "Building",
                  desc: "Ready to start building the MVP.",
                  icon: <Code2 className="w-5 h-5 text-[#ea580c]" />,
                  iconBg: "bg-[#fff7ed]",
                },
                {
                  id: "Growing",
                  title: "Growing",
                  desc: "Already have a product and want to scale.",
                  icon: <BarChart3 className="w-5 h-5 text-[#7c3aed]" />,
                  iconBg: "bg-[#f5f3ff]",
                },
              ].map((opt) => {
                const isSelected = selectedStage === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedStage(opt.id)}
                    className={`p-5 rounded-2xl border transition flex items-center justify-between gap-4 cursor-pointer text-left ${
                      isSelected
                        ? "border-[#0f5132] ring-2 ring-[#0f5132]/15 bg-[#fbfdfc] shadow-xs"
                        : "border-[#e2e8f0] bg-white hover:border-[#a3d9bc]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-xl ${opt.iconBg} flex items-center justify-center shrink-0`}
                      >
                        {opt.icon}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[#0c1510]">
                          {opt.title}
                        </h3>
                        <p className="text-xs text-[#64748b] mt-0.5 leading-snug">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    {/* Radio circle */}
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                        isSelected
                          ? "border-[#0f5132] bg-[#0f5132]"
                          : "border-[#cbd5e1] bg-white"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Navigation */}
            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#cbd5e1] bg-white text-sm font-semibold text-[#0c1510] hover:bg-[#f8fafc] transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f5132] hover:bg-[#0c4128] text-white text-sm font-semibold shadow-xs transition cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: What is your technical background? (User Approved)   */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div className="w-full max-w-[760px] text-center">
            <p className="text-xs font-bold tracking-widest text-[#0f5132] uppercase mb-2">
              STEP 3 OF 4
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0c1510] tracking-tight">
              What is your technical background?
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#526058]">
              This helps us choose between code, AI tools, or no-code.
            </p>

            {/* 2x2 Option Cards Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  id: "No-Code / Visual",
                  title: "No-Code / Visual",
                  desc: "Prefer visual drag-and-drop builders without writing code.",
                  icon: <Palette className="w-5 h-5 text-[#0f5132]" />,
                  iconBg: "bg-[#e6f5ed]",
                },
                {
                  id: "AI-Assisted Coding",
                  title: "AI-Assisted Coding",
                  desc: "Use AI tools (Cursor, Lovable, v0) with starter templates.",
                  icon: <Sparkles className="w-5 h-5 text-[#2563eb]" />,
                  iconBg: "bg-[#eff6ff]",
                },
                {
                  id: "Full-Stack Developer",
                  title: "Full-Stack Developer",
                  desc: "Comfortable writing frontend, backend and database code.",
                  icon: <Code2 className="w-5 h-5 text-[#ea580c]" />,
                  iconBg: "bg-[#fff7ed]",
                },
                {
                  id: "Small Team / Mixed",
                  title: "Small Team / Mixed",
                  desc: "Mixed founding team with design and engineering skills.",
                  icon: <Users className="w-5 h-5 text-[#7c3aed]" />,
                  iconBg: "bg-[#f5f3ff]",
                },
              ].map((opt) => {
                const isSelected = selectedSkill === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSkill(opt.id)}
                    className={`p-5 rounded-2xl border transition flex items-center justify-between gap-4 cursor-pointer text-left ${
                      isSelected
                        ? "border-[#0f5132] ring-2 ring-[#0f5132]/15 bg-[#fbfdfc] shadow-xs"
                        : "border-[#e2e8f0] bg-white hover:border-[#a3d9bc]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-xl ${opt.iconBg} flex items-center justify-center shrink-0`}
                      >
                        {opt.icon}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[#0c1510]">
                          {opt.title}
                        </h3>
                        <p className="text-xs text-[#64748b] mt-0.5 leading-snug">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    {/* Radio circle */}
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                        isSelected
                          ? "border-[#0f5132] bg-[#0f5132]"
                          : "border-[#cbd5e1] bg-white"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Navigation */}
            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#cbd5e1] bg-white text-sm font-semibold text-[#0c1510] hover:bg-[#f8fafc] transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f5132] hover:bg-[#0c4128] text-white text-sm font-semibold shadow-xs transition cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: What’s your estimated budget? (Matches 4th-page.png) */}
        {/* ============================================================ */}
        {currentStep === 4 && (
          <div className="w-full max-w-[880px] text-center">
            <p className="text-xs font-bold tracking-widest text-[#0f5132] uppercase mb-2">
              STEP 4 OF 4
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0c1510] tracking-tight">
              What’s your estimated budget?
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#526058]">
              This helps us suggest the best tools and plan for you.
            </p>

            {/* 3x2 Budget Cards Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {[
                {
                  id: "Under ₹5,000",
                  title: "Under ₹5,000",
                  desc: "Just testing the idea",
                  icon: <Sprout className="w-5 h-5 text-[#0f5132]" />,
                  iconBg: "bg-[#e6f5ed]",
                },
                {
                  id: "₹5,000 – ₹25,000",
                  title: "₹5,000 – ₹25,000",
                  desc: "Build a basic MVP",
                  icon: <Rocket className="w-5 h-5 text-[#2563eb]" />,
                  iconBg: "bg-[#eff6ff]",
                },
                {
                  id: "₹25,000 – ₹1,00,000",
                  title: "₹25,000 – ₹1,00,000",
                  desc: "Build a complete MVP",
                  icon: <BarChart3 className="w-5 h-5 text-[#ea580c]" />,
                  iconBg: "bg-[#fff7ed]",
                },
                {
                  id: "₹1,00,000 – ₹5,00,000",
                  title: "₹1,00,000 – ₹5,00,000",
                  desc: "Larger product with more features",
                  icon: <Box className="w-5 h-5 text-[#7c3aed]" />,
                  iconBg: "bg-[#f5f3ff]",
                },
                {
                  id: "₹5,00,000+",
                  title: "₹5,00,000+",
                  desc: "Full-scale product",
                  icon: <Building2 className="w-5 h-5 text-[#db2777]" />,
                  iconBg: "bg-[#fdf2f8]",
                },
                {
                  id: "I’m not sure",
                  title: "I’m not sure",
                  desc: "Help me decide",
                  icon: <MoreHorizontal className="w-5 h-5 text-[#64748b]" />,
                  iconBg: "bg-[#f3f4f6]",
                },
              ].map((opt) => {
                const isSelected = selectedBudget === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedBudget(opt.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer text-left ${
                      isSelected
                        ? "border-[#0f5132] ring-2 ring-[#0f5132]/15 bg-[#fbfdfc] shadow-xs"
                        : "border-[#e2e8f0] bg-white hover:border-[#a3d9bc]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${opt.iconBg} flex items-center justify-center shrink-0`}
                      >
                        {opt.icon}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[#0c1510]">
                          {opt.title}
                        </h3>
                        <p className="text-xs text-[#64748b] mt-0.5 leading-snug">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    {/* Radio button */}
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                        isSelected
                          ? "border-[#0f5132] bg-[#0f5132]"
                          : "border-[#cbd5e1] bg-white"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Have a PRD or detailed idea? (Optional) Upload Box (Matches 4th-page.png) */}
            <div className="mt-6 rounded-2xl bg-[#f2f9f5] border border-[#d1e7dd] p-5 sm:p-6 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#e6f5ed] text-[#0f5132] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0c1510]">
                    Have a PRD or detailed idea?{" "}
                    <span className="text-xs font-normal text-[#64748b]">
                      (Optional)
                    </span>
                  </h4>
                  <p className="text-xs text-[#526058] mt-0.5">
                    Upload your PRD, doc or notes to get more accurate recommendations.
                  </p>
                </div>
              </div>

              {/* Dashed Upload Box */}
              <div>
                <input
                  type="file"
                  ref={prdFileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />

                {attachedFile ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#0f5132] text-xs font-semibold text-[#0f5132]">
                    <Check className="w-4 h-4" />
                    <span>{attachedFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="text-gray-400 hover:text-red-500 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => prdFileInputRef.current?.click()}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-dashed border-[#a3d9bc] bg-white/80 hover:bg-white transition flex items-center gap-3 cursor-pointer group"
                  >
                    <UploadCloud className="w-5 h-5 text-[#0f5132] shrink-0" />
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#0c1510] group-hover:text-[#0f5132]">
                        Upload a file
                      </p>
                      <p className="text-[10px] text-[#64748b]">
                        PDF, DOC, or TXT (Max 10 MB)
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Navigation: Back & Finish */}
            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#cbd5e1] bg-white text-sm font-semibold text-[#0c1510] hover:bg-[#f8fafc] transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#0f5132] hover:bg-[#0c4128] text-white text-sm sm:text-base font-semibold shadow-xs transition cursor-pointer"
              >
                <span>Finish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
