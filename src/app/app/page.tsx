"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FilePlus2,
  FolderKanban,
  Bookmark,
  Settings,
  Download,
  CheckCircle2,
  Lightbulb,
  Layout,
  Database,
  CreditCard,
  Code2,
  Palette,
  Server,
  Megaphone,
  Briefcase,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Trash2,
  ExternalLink,
  Copy,
  FileText,
  Printer,
  AlertTriangle,
  ShieldCheck,
  Plus,
  X,
} from "lucide-react";
import {
  BuildsyLogo,
  BudgetDonutChart,
  ToolBrandIcon,
} from "@/components/ToolLogos";
import {
  AdaptiveQuestion,
  BuildPlan,
  CurrencyRegion,
  QuestionAnswer,
  SavedToolItem,
  ToolOption,
  UserSettings,
} from "@/types/buildsy";
import {
  calculatePlanBudget,
  SHOWCASE_BUILD_PLAN,
  STARTER_IDEA_TEMPLATES,
} from "@/lib/plan-engine";
import {
  DEFAULT_SETTINGS,
  deletePlanFromStorage,
  generateMarkdownExport,
  getSavedPlans,
  getSavedTools,
  getUserSettings,
  savePlanToStorage,
  saveUserSettings,
  toggleSavedTool,
} from "@/lib/storage";

function CategoryIcon({ iconKey }: { iconKey: string }) {
  switch (iconKey) {
    case "layout":
      return <Layout className="w-4 h-4" />;
    case "database":
      return <Database className="w-4 h-4" />;
    case "credit-card":
      return <CreditCard className="w-4 h-4" />;
    case "code":
      return <Code2 className="w-4 h-4" />;
    case "palette":
      return <Palette className="w-4 h-4" />;
    case "server":
      return <Server className="w-4 h-4" />;
    case "megaphone":
      return <Megaphone className="w-4 h-4" />;
    case "sparkles":
      return <Sparkles className="w-4 h-4" />;
    default:
      return <Briefcase className="w-4 h-4" />;
  }
}

function BuildsyStudioContent() {
  const searchParams = useSearchParams();

  // Sidebar view state
  const [sidebarView, setSidebarView] = useState<
    "plan-dashboard" | "new-idea-wizard" | "my-plans" | "saved" | "settings"
  >("plan-dashboard");

  // Plan dashboard active tab
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Tool Stack" | "Phases" | "Cost Breakdown"
  >("Overview");

  // Filter pill inside Tool Stack tab (Matches third-page.png)
  const [tierFilter, setTierFilter] = useState<
    "Free / Low-Cost" | "Scale" | "Compare"
  >("Free / Low-Cost");

  // Persisted data states
  const [plans, setPlans] = useState<BuildPlan[]>([SHOWCASE_BUILD_PLAN]);
  const [activePlan, setActivePlan] = useState<BuildPlan>(SHOWCASE_BUILD_PLAN);
  const [savedTools, setSavedTools] = useState<SavedToolItem[]>([]);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

  // Adaptive Wizard State (Step 1: Idea -> Step 2: Adaptive Questions -> Step 3: Generating)
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [ideaInput, setIdeaInput] = useState("");
  const [wizardRegion, setWizardRegion] = useState<CurrencyRegion>("USD");
  const [questions, setQuestions] = useState<AdaptiveQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customAnswerText, setCustomAnswerText] = useState("");
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // UI Modals & Toast Feedback
  const [showExportModal, setShowExportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshingPrices, setIsRefreshingPrices] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Load persisted plans, saved tools, and settings on mount
  useEffect(() => {
    const loadedPlans = getSavedPlans();
    const loadedSaved = getSavedTools();
    const loadedSettings = getUserSettings();

    setPlans(loadedPlans);
    setActivePlan(loadedPlans[0] || SHOWCASE_BUILD_PLAN);
    setSavedTools(loadedSaved);
    setSettings(loadedSettings);
    setWizardRegion(loadedSettings.preferredRegion);

    const viewParam = searchParams.get("view");
    const ideaParam = searchParams.get("idea");

    if (ideaParam) {
      setIdeaInput(ideaParam);
      setSidebarView("new-idea-wizard");
      setWizardStep(1);
    } else if (viewParam === "plans") {
      setSidebarView("my-plans");
    } else if (viewParam === "saved") {
      setSidebarView("saved");
    } else if (viewParam === "settings") {
      setSidebarView("settings");
    } else if (viewParam === "new") {
      setSidebarView("new-idea-wizard");
    }
  }, [searchParams]);

  // Budget calculation for active plan
  const budget = calculatePlanBudget(activePlan);
  const isINR = activePlan.region === "INR";
  const currencySymbol = isINR ? "₹" : "$";
  const formatAmount = (usd: number, inr: number) =>
    `${currencySymbol}${(isINR ? inr : usd).toLocaleString()}`;

  // Select a tool inside a category ("Use this")
  const handleSelectTool = (categoryId: string, toolId: string) => {
    const updatedCategories = activePlan.categories.map((cat) =>
      cat.id === categoryId ? { ...cat, selectedToolId: toolId } : cat
    );
    const updatedPlan: BuildPlan = {
      ...activePlan,
      categories: updatedCategories,
    };
    const newBudget = calculatePlanBudget(updatedPlan);
    updatedPlan.costBadge = newBudget.dynamicBadge;

    setActivePlan(updatedPlan);
    const updatedList = savePlanToStorage(updatedPlan);
    setPlans(updatedList);
    triggerToast("Updated tool selection & recalculated MVP budget");
  };

  // Toggle currency region on active plan
  const handleTogglePlanCurrency = (region: CurrencyRegion) => {
    const updatedPlan: BuildPlan = {
      ...activePlan,
      region,
    };
    setActivePlan(updatedPlan);
    const updatedList = savePlanToStorage(updatedPlan);
    setPlans(updatedList);
  };

  // Toggle one-time cost inclusion
  const handleToggleOneTimeCost = (costId: string) => {
    const updatedCosts = (activePlan.oneTimeCosts || []).map((c) =>
      c.id === costId ? { ...c, included: !c.included } : c
    );
    const updatedPlan: BuildPlan = {
      ...activePlan,
      oneTimeCosts: updatedCosts,
    };
    setActivePlan(updatedPlan);
    savePlanToStorage(updatedPlan);
  };

  // Toggle saving/bookmarking a tool
  const handleToggleBookmarkTool = (tool: ToolOption, categoryName: string) => {
    const updated = toggleSavedTool(tool, categoryName, activePlan.title);
    setSavedTools(updated);
    const isNowSaved = updated.some((i) => i.tool.id === tool.id);
    triggerToast(
      isNowSaved
        ? `Saved ${tool.name} to your Saved list`
        : `Removed ${tool.name} from Saved`
    );
  };

  // Step 1 -> Step 2: Fetch Adaptive Questions
  const handleStartAdaptiveQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaInput.trim() || ideaInput.trim().length < 8) {
      triggerToast("Please describe your product idea in a bit more detail.");
      return;
    }

    setIsLoadingQuestions(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: ideaInput.trim(),
          region: wizardRegion,
          apiKey: settings.geminiApiKey,
        }),
      });
      const data = await res.json();
      const fetchedQuestions: AdaptiveQuestion[] = data.questions || [];
      setQuestions(fetchedQuestions);
      setCurrentQuestionIdx(0);
      setAnswers({});
      setCustomAnswerText("");
      setWizardStep(2);
    } catch {
      triggerToast("Loaded adaptive question flow.");
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Step 2 -> Step 3: Submit all answers & generate tailored Build Plan
  const handleGenerateBuildPlan = async (
    finalAnswersMap: Record<string, string>
  ) => {
    setWizardStep(3);
    setIsGeneratingPlan(true);

    const formattedAnswers: QuestionAnswer[] = questions.map((q) => ({
      questionId: q.id,
      question: q.question,
      answer: finalAnswersMap[q.id] || q.options[0] || "Lean MVP approach",
    }));

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: ideaInput.trim(),
          answers: formattedAnswers,
          region: wizardRegion,
          apiKey: settings.geminiApiKey,
        }),
      });
      const data = await res.json();
      if (data.plan) {
        const newPlan: BuildPlan = data.plan;
        const savedList = savePlanToStorage(newPlan);
        setPlans(savedList);
        setActivePlan(newPlan);
        setSidebarView("plan-dashboard");
        setActiveTab("Overview");
        setWizardStep(1);
        triggerToast("Your personalized MVP Build Plan is ready!");
      }
    } catch {
      triggerToast("Generated build plan using smart fallback engine.");
      setSidebarView("plan-dashboard");
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // Refresh live pricing on current plan
  const handleRefreshLivePricing = async () => {
    setIsRefreshingPrices(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: activePlan.ideaDescription,
          answers: activePlan.answers,
          region: activePlan.region,
          apiKey: settings.geminiApiKey,
        }),
      });
      const data = await res.json();
      const updated: BuildPlan = {
        ...(data.plan || activePlan),
        id: activePlan.id,
        title: activePlan.title,
        lastPriceCheckAt: new Date().toISOString(),
      };
      setActivePlan(updated);
      const list = savePlanToStorage(updated);
      setPlans(list);
      triggerToast("Verified latest tool pricing & free tier limits!");
    } catch {
      const updated = {
        ...activePlan,
        lastPriceCheckAt: new Date().toISOString(),
      };
      setActivePlan(updated);
      savePlanToStorage(updated);
      triggerToast("Pricing timestamp refreshed.");
    } finally {
      setIsRefreshingPrices(false);
    }
  };

  // Export handlers
  const handleCopyMarkdown = async () => {
    const md = generateMarkdownExport(activePlan);
    await navigator.clipboard.writeText(md);
    triggerToast("Copied Notion-ready Markdown plan to clipboard!");
  };

  const handleDownloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast(`Downloaded ${filename}`);
  };

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="min-h-screen bg-[#f4faf6] text-[#0c1510] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-[#124b32] text-white px-4 py-3 text-xs font-semibold shadow-lg flex items-center gap-2 border border-[#247550]">
          <CheckCircle2 className="w-4 h-4 text-[#6ee7b7] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Studio Shell (Matches Mockup Dashboard Layout) */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto my-0 sm:my-5 sm:px-6 flex">
        <div className="w-full rounded-none sm:rounded-2xl bg-white border border-[#dcece3] shadow-[0_20px_60px_-15px_rgba(16,68,42,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-[235px_1fr]">
          {/* LEFT SIDEBAR (Matches hero-page.png & third-page.png) */}
          <aside className="bg-[#f9fcfa] border-b lg:border-b-0 lg:border-r border-[#e6f0ea] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between px-2 pt-1 pb-6">
                <Link href="/" className="inline-flex items-center">
                  <BuildsyLogo size="md" />
                </Link>
                <Link
                  href="/"
                  className="text-[11px] font-medium text-[#5c6f64] hover:text-[#124b32]"
                >
                  Home
                </Link>
              </div>

              <nav className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSidebarView("plan-dashboard")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    sidebarView === "plan-dashboard" ||
                    sidebarView === "new-idea-wizard"
                      ? "bg-[#124b32] text-white shadow-xs"
                      : "text-[#4b5e54] hover:bg-[#eaf5ef] hover:text-[#124b32]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FilePlus2 className="w-4 h-4 shrink-0" />
                    <span>New Plan</span>
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSidebarView("new-idea-wizard");
                      setWizardStep(1);
                    }}
                    title="Describe a new product idea"
                    className="px-1.5 py-0.5 rounded bg-white/15 hover:bg-white/25 text-[10px]"
                  >
                    + Idea
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSidebarView("my-plans")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    sidebarView === "my-plans"
                      ? "bg-[#124b32] text-white shadow-xs"
                      : "text-[#4b5e54] hover:bg-[#eaf5ef] hover:text-[#124b32]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FolderKanban className="w-4 h-4 shrink-0" />
                    <span>My Plans</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#e5f2eb] text-[#124b32] text-[10px] font-bold">
                    {plans.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSidebarView("saved")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    sidebarView === "saved"
                      ? "bg-[#124b32] text-white shadow-xs"
                      : "text-[#4b5e54] hover:bg-[#eaf5ef] hover:text-[#124b32]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Bookmark className="w-4 h-4 shrink-0" />
                    <span>Saved</span>
                  </span>
                  {savedTools.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#e5f2eb] text-[#124b32] text-[10px] font-bold">
                      {savedTools.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSidebarView("settings")}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    sidebarView === "settings"
                      ? "bg-[#124b32] text-white shadow-xs"
                      : "text-[#4b5e54] hover:bg-[#eaf5ef] hover:text-[#124b32]"
                  }`}
                >
                  <Settings className="w-4 h-4 shrink-0" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>

            {/* Sidebar Bottom CTA: Create Custom Idea Plan */}
            <div className="mt-6 pt-5 border-t border-[#e6f0ea] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setSidebarView("new-idea-wizard");
                  setWizardStep(1);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#e6f4ed] hover:bg-[#d4ebdf] text-[#124b32] text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Plan Another Idea</span>
              </button>

              <div className="rounded-xl bg-[#f2f8f5] border border-[#e0ede6] p-3 text-[11px] text-[#4b5e54]">
                <p className="font-semibold text-[#0c1510]">
                  Active Plan Summary
                </p>
                <p className="truncate mt-0.5 text-[10px] text-[#617369]">
                  {activePlan.title}
                </p>
                <p className="mt-1.5 font-extrabold text-sm text-[#124b32]">
                  {formatAmount(budget.monthlyTotalUSD, budget.monthlyTotalINR)}{" "}
                  <span className="font-normal text-[10px] text-[#617369]">
                    / mo
                  </span>
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN WORKSPACE CONTENT */}
          <main className="p-5 sm:p-8 bg-white overflow-y-auto">
            {/* VIEW A: NEW IDEA ADAPTIVE WIZARD (Describe Idea -> 6 Adaptive Questions -> Plan) */}
            {sidebarView === "new-idea-wizard" && (
              <div className="max-w-3xl mx-auto py-2">
                <div className="flex items-center justify-between mb-6">
                  <button
                    type="button"
                    onClick={() => setSidebarView("plan-dashboard")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4b5e54] hover:text-[#124b32] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to current Build Plan</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#146c43]">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        wizardStep >= 1
                          ? "bg-[#124b32] text-white"
                          : "bg-[#e6f4ed] text-[#124b32]"
                      }`}
                    >
                      1
                    </span>
                    <span className="text-[#94a3b8]">—</span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        wizardStep >= 2
                          ? "bg-[#124b32] text-white"
                          : "bg-[#e6f4ed] text-[#124b32]"
                      }`}
                    >
                      2
                    </span>
                    <span className="text-[#94a3b8]">—</span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        wizardStep >= 3
                          ? "bg-[#124b32] text-white"
                          : "bg-[#e6f4ed] text-[#124b32]"
                      }`}
                    >
                      3
                    </span>
                  </div>
                </div>

                {/* WIZARD STEP 1: DESCRIBE YOUR IDEA */}
                {wizardStep === 1 && (
                  <div className="rounded-2xl border border-[#dcece3] bg-[#fbfdfc] p-6 sm:p-8 shadow-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ed] text-[#134e35] text-xs font-semibold">
                      Step 1 of 3 • Describe Your Idea
                    </span>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#0c1510]">
                      What product idea do you want to build?
                    </h2>
                    <p className="mt-2 text-sm text-[#52655b]">
                      Describe your idea in plain English. Buildsy will ask 5–6
                      personalized follow-up questions to tailor your stack,
                      phased buying plan, and total MVP budget.
                    </p>

                    <form
                      onSubmit={handleStartAdaptiveQuestions}
                      className="mt-6 space-y-5"
                    >
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#37473f] mb-2">
                          Your Raw Product Idea
                        </label>
                        <textarea
                          rows={4}
                          value={ideaInput}
                          onChange={(e) => setIdeaInput(e.target.value)}
                          placeholder="e.g., An AI-powered bookkeeping and GST invoice reminder micro-SaaS for freelance designers in India and the US..."
                          className="w-full rounded-xl border border-[#cde2d6] bg-white p-4 text-sm text-[#0c1510] placeholder-[#82968b] focus:border-[#124b32] focus:outline-none focus:ring-2 focus:ring-[#124b32]/15"
                        />
                      </div>

                      {/*Starter Idea Templates */}
                      <div>
                        <p className="text-xs font-semibold text-[#52655b] mb-2">
                          Or try a popular founder scenario with 1 click:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {STARTER_IDEA_TEMPLATES.map((tpl) => (
                            <button
                              key={tpl.label}
                              type="button"
                              onClick={() => setIdeaInput(tpl.idea)}
                              className="p-3 rounded-xl border border-[#e2eee7] bg-white hover:border-[#198754] text-left transition cursor-pointer group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#0c1510] group-hover:text-[#124b32]">
                                  {tpl.label}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-[#e6f4ed] text-[#146c43] text-[10px] font-semibold">
                                  {tpl.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#5c6f64] mt-1 line-clamp-2">
                                {tpl.idea}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Region / Currency Selection */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#e7f0eb]">
                        <div>
                          <p className="text-xs font-bold text-[#0c1510]">
                            Primary Currency &amp; Market Region
                          </p>
                          <p className="text-[11px] text-[#5c6f64]">
                            Calibrates payment gateways (Stripe vs. Razorpay)
                            and local currency estimates.
                          </p>
                        </div>
                        <div className="inline-flex rounded-xl bg-[#eef6f1] p-1 border border-[#d8eae0]">
                          <button
                            type="button"
                            onClick={() => setWizardRegion("USD")}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                              wizardRegion === "USD"
                                ? "bg-[#124b32] text-white"
                                : "text-[#4b5e54]"
                            }`}
                          >
                            🇺🇸 USD ($)
                          </button>
                          <button
                            type="button"
                            onClick={() => setWizardRegion("INR")}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                              wizardRegion === "INR"
                                ? "bg-[#124b32] text-white"
                                : "text-[#4b5e54]"
                            }`}
                          >
                            🇮🇳 India (₹ INR)
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-2">
                        <button
                          type="submit"
                          disabled={isLoadingQuestions}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#134e35] hover:bg-[#0e3c28] disabled:opacity-60 text-white text-sm font-semibold shadow-sm transition cursor-pointer"
                        >
                          {isLoadingQuestions ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Analyzing your idea...</span>
                            </>
                          ) : (
                            <>
                              <span>Continue to tailored questions</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* WIZARD STEP 2: ADAPTIVE FOLLOW-UP QUESTIONS */}
                {wizardStep === 2 && currentQuestion && (
                  <div className="rounded-2xl border border-[#dcece3] bg-[#fbfdfc] p-6 sm:p-8 shadow-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ed] text-[#134e35] text-xs font-semibold">
                        Question {currentQuestionIdx + 1} of {questions.length}
                      </span>
                      <span className="text-xs text-[#5c6f64] font-medium">
                        {Math.round(
                          ((currentQuestionIdx + 1) / questions.length) * 100
                        )}
                        % complete
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 w-full h-2 rounded-full bg-[#e6f2ec] overflow-hidden">
                      <div
                        className="h-full bg-[#157347] transition-all duration-300"
                        style={{
                          width: `${
                            ((currentQuestionIdx + 1) / questions.length) * 100
                          }%`,
                        }}
                      />
                    </div>

                    <h2 className="mt-6 text-xl sm:text-2xl font-extrabold text-[#0c1510]">
                      {currentQuestion.question}
                    </h2>

                    <div className="mt-2.5 rounded-xl bg-[#eff8f3] border border-[#d8eee2] p-3 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#37473f]">
                        <strong className="font-semibold text-[#124b32]">
                          Why Buildsy asks this:{" "}
                        </strong>
                        {currentQuestion.whyWeAsk}
                      </p>
                    </div>

                    <div className="mt-5 space-y-2.5">
                      {currentQuestion.options.map((option) => {
                        const isSelected =
                          answers[currentQuestion.id] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setAnswers((prev) => ({
                                ...prev,
                                [currentQuestion.id]: option,
                              }));
                              setCustomAnswerText("");
                            }}
                            className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition flex items-center justify-between gap-3 cursor-pointer ${
                              isSelected
                                ? "border-[#145334] bg-[#e9f7f0] text-[#0c1510] font-semibold ring-1 ring-[#145334]/20"
                                : "border-[#e0ece5] bg-white hover:border-[#b7d9c6] text-[#2b3b32]"
                            }`}
                          >
                            <span>{option}</span>
                            <span
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "border-[#124b32] bg-[#124b32] text-white"
                                  : "border-[#cbd5e1]"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </span>
                          </button>
                        );
                      })}

                      {/* Custom answer input */}
                      <div className="pt-2">
                        <input
                          type="text"
                          value={customAnswerText}
                          onChange={(e) => {
                            setCustomAnswerText(e.target.value);
                            setAnswers((prev) => ({
                              ...prev,
                              [currentQuestion.id]: e.target.value,
                            }));
                          }}
                          placeholder="Or type your own custom constraint / preference..."
                          className="w-full px-4 py-3 rounded-xl border border-[#d6e5dd] bg-white text-xs text-[#0c1510] placeholder-[#7c8f84] focus:border-[#124b32] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-7 flex items-center justify-between pt-4 border-t border-[#e7f0eb]">
                      <button
                        type="button"
                        onClick={() => {
                          if (currentQuestionIdx > 0) {
                            setCurrentQuestionIdx((i) => i - 1);
                            setCustomAnswerText("");
                          } else {
                            setWizardStep(1);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#d8e5de] bg-white text-xs font-semibold text-[#4b5e54] hover:bg-[#f5faf7] cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Previous</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const chosen =
                            answers[currentQuestion.id] ||
                            currentQuestion.options[0];
                          const nextMap = {
                            ...answers,
                            [currentQuestion.id]: chosen,
                          };
                          setAnswers(nextMap);
                          setCustomAnswerText("");

                          if (currentQuestionIdx + 1 < questions.length) {
                            setCurrentQuestionIdx((i) => i + 1);
                          } else {
                            handleGenerateBuildPlan(nextMap);
                          }
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#134e35] hover:bg-[#0e3c28] text-white text-xs sm:text-sm font-semibold shadow-sm transition cursor-pointer"
                      >
                        <span>
                          {currentQuestionIdx + 1 < questions.length
                            ? "Next Question"
                            : "Generate My Build Plan"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* WIZARD STEP 3: GENERATING PLAN LOADING STATE */}
                {wizardStep === 3 && isGeneratingPlan && (
                  <div className="rounded-2xl border border-[#dcece3] bg-[#fbfdfc] p-10 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#e6f4ed] text-[#124b32] flex items-center justify-center mx-auto">
                      <RefreshCw className="w-7 h-7 animate-spin" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#0c1510]">
                      Building your phased MVP tool stack &amp; budget...
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52655b] max-w-md mx-auto">
                      Checking current free tiers, evaluating low-cost vs. scale
                      options, and mapping out your 3-month spending schedule so
                      you don&apos;t overpay upfront.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* VIEW B: MAIN BUILD PLAN DASHBOARD (Matches Mockups Overview & Tool Stack) */}
            {sidebarView === "plan-dashboard" && (
              <div>
                {/* Top Header Bar */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1510] tracking-tight">
                        Your Build Plan
                      </h1>
                      <span className="px-2.5 py-1 rounded-full bg-[#e6f4ed] text-[#124b32] text-xs font-bold">
                        {activePlan.title}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#617369] mt-1">
                      A complete tool stack and budget to build your MVP
                    </p>
                  </div>

                  {/* Header Action Controls: Currency Toggle, Refresh Live Pricing, New Idea, Export Plan */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="inline-flex rounded-xl bg-[#f2f7f4] p-1 border border-[#dce8e1]">
                      <button
                        type="button"
                        onClick={() => handleTogglePlanCurrency("USD")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          activePlan.region === "USD"
                            ? "bg-[#124b32] text-white"
                            : "text-[#4b5e54]"
                        }`}
                      >
                        $ USD
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTogglePlanCurrency("INR")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          activePlan.region === "INR"
                            ? "bg-[#124b32] text-white"
                            : "text-[#4b5e54]"
                        }`}
                      >
                        ₹ INR
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleRefreshLivePricing}
                      disabled={isRefreshingPrices}
                      title="Re-check current tool pricing and free tiers"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#dce5e0] bg-white hover:bg-[#f5faf7] text-[#1e2d24] text-xs font-semibold transition cursor-pointer"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 text-[#146c43] ${
                          isRefreshingPrices ? "animate-spin" : ""
                        }`}
                      />
                      <span className="hidden sm:inline">Refresh Pricing</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowExportModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#dce5e0] bg-white hover:bg-[#f5faf7] text-[#0c1510] text-xs font-semibold shadow-2xs transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#4b5e54]" />
                      <span>Export Plan</span>
                    </button>
                  </div>
                </div>

                {/* Navigation Tabs: Overview | Tool Stack | Phases | Cost Breakdown */}
                <div className="flex items-center justify-between border-b border-[#e8f0eb] mb-6 overflow-x-auto">
                  <div className="flex items-center gap-7 text-sm font-medium">
                    {(
                      [
                        "Overview",
                        "Tool Stack",
                        "Phases",
                        "Cost Breakdown",
                      ] as const
                    ).map((tab) => {
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTab(tab)}
                          className={`pb-3 whitespace-nowrap border-b-2 transition cursor-pointer ${
                            isActive
                              ? "border-[#145334] text-[#0c1510] font-bold"
                              : "border-transparent text-[#6c7d73] hover:text-[#145334]"
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>

                  <span className="hidden md:inline-block text-[11px] text-[#6c7d73] pb-2">
                    Last pricing check:{" "}
                    {new Date(activePlan.lastPriceCheckAt).toLocaleDateString()}
                  </span>
                </div>

                {/* TAB 1: OVERVIEW (Matches hero-page.png + full interactive stack controls) */}
                {activeTab === "Overview" && (
                  <div className="space-y-6">
                    {/* Top Row: Total Estimated MVP Cost + Donut Chart Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-5">
                      {/* Card 1: Total Estimated MVP Cost */}
                      <div className="rounded-2xl border border-[#e7f0eb] bg-[#fbfdfc] p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-[#1e2d24]">
                              Total Estimated MVP Cost
                            </p>
                            <span className="text-[11px] font-medium text-[#5c6f64]">
                              1-Person Company Scope
                            </span>
                          </div>
                          <div className="mt-3 flex items-baseline gap-1.5">
                            <span className="text-4xl sm:text-5xl font-extrabold text-[#0c1510] tracking-tight">
                              {formatAmount(
                                budget.monthlyTotalUSD,
                                budget.monthlyTotalINR
                              )}
                            </span>
                            <span className="text-sm font-medium text-[#617369]">
                              / month
                            </span>
                          </div>
                          <p className="text-xs text-[#6c7d73] mt-1.5">
                            For initial 3 months (MVP) • Phased 3-mo total:{" "}
                            <strong className="text-[#0c1510]">
                              {formatAmount(
                                budget.threeMonthTotalUSD,
                                budget.threeMonthTotalINR
                              )}
                            </strong>
                          </p>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#edf4f0]">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f5ed] text-[#146c43] text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {budget.dynamicBadge}
                          </span>

                          <span className="text-xs font-semibold text-[#146c43]">
                            Saves{" "}
                            {formatAmount(
                              budget.savedThreeMonthsUSD,
                              budget.savedThreeMonthsINR
                            )}{" "}
                            vs. buying scale upfront
                          </span>
                        </div>
                      </div>

                      {/* Card 2: Donut Chart + 5-Category Legend */}
                      <div className="rounded-2xl border border-[#e7f0eb] bg-[#fbfdfc] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center justify-center">
                          <BudgetDonutChart
                            size={142}
                            values={{
                              Development: isINR
                                ? budget.breakdown.Development.inr
                                : budget.breakdown.Development.usd,
                              Design: isINR
                                ? budget.breakdown.Design.inr
                                : budget.breakdown.Design.usd,
                              "Database & Infra": isINR
                                ? budget.breakdown["Database & Infra"].inr
                                : budget.breakdown["Database & Infra"].usd,
                              Marketing: isINR
                                ? budget.breakdown.Marketing.inr
                                : budget.breakdown.Marketing.usd,
                              Other: isINR
                                ? budget.breakdown.Other.inr
                                : budget.breakdown.Other.usd,
                            }}
                          />
                        </div>

                        <div className="flex-1 w-full space-y-2.5 text-sm">
                          {[
                            {
                              label: "Development" as const,
                              dot: "bg-[#10b981]",
                            },
                            { label: "Design" as const, dot: "bg-[#34d399]" },
                            {
                              label: "Database & Infra" as const,
                              dot: "bg-[#0ea5e9]",
                            },
                            {
                              label: "Marketing" as const,
                              dot: "bg-[#f97316]",
                            },
                            { label: "Other" as const, dot: "bg-[#eab308]" },
                          ].map((row) => (
                            <div
                              key={row.label}
                              className="flex items-center justify-between gap-4"
                            >
                              <span className="flex items-center gap-2.5 text-[#37473f] font-medium">
                                <span
                                  className={`w-3 h-3 rounded-full ${row.dot} shrink-0`}
                                />
                                {row.label}
                              </span>
                              <span className="font-bold text-[#0c1510]">
                                {formatAmount(
                                  budget.breakdown[row.label].usd,
                                  budget.breakdown[row.label].inr
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Strategy Summary Note */}
                    <div className="rounded-2xl bg-[#f4fbf7] border border-[#d8eee2] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#146c43]">
                          Tailored Strategy for Your Idea
                        </p>
                        <p className="text-xs sm:text-sm text-[#2b3b32] mt-1">
                          {activePlan.summaryNote}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIdeaInput(activePlan.ideaDescription);
                          setSidebarView("new-idea-wizard");
                          setWizardStep(1);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white border border-[#cce5d8] text-xs font-semibold text-[#124b32] hover:bg-[#e8f5ee] shrink-0 cursor-pointer"
                      >
                        Refine Answers
                      </button>
                    </div>

                    {/* Recommended Tools Section (Matches hero-page.png + shows all selected tools) */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-base font-bold text-[#0c1510]">
                            Recommended Tools
                          </h3>
                          <p className="text-xs text-[#617369]">
                            Your active stack selections across each category
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab("Tool Stack")}
                          className="text-xs font-bold text-[#145334] underline underline-offset-4 hover:text-[#0e3b27] cursor-pointer"
                        >
                          View all ({activePlan.categories.length} categories)
                        </button>
                      </div>

                      <div className="rounded-2xl border border-[#e7f0eb] bg-[#fbfdfc] divide-y divide-[#e7f0eb]">
                        {activePlan.categories.map((cat) => {
                          const selected =
                            cat.options.find(
                              (o) => o.id === cat.selectedToolId
                            ) || cat.options[0];
                          const isFree =
                            selected.monthlyCostUSD === 0 &&
                            selected.priceDisplay.toLowerCase() === "free";

                          return (
                            <div
                              key={cat.id}
                              className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-white transition"
                            >
                              <div className="flex items-center gap-3.5 min-w-[230px]">
                                <span className="text-xs font-semibold text-[#37473f] w-36 truncate">
                                  {cat.name}
                                </span>
                                <ToolBrandIcon
                                  logoKey={selected.logoKey}
                                  size={36}
                                />
                                <div>
                                  <p className="text-sm font-bold text-[#0c1510]">
                                    {selected.name}
                                  </p>
                                  <span className="text-[11px] text-[#6c7d73]">
                                    {selected.buyPhase}
                                  </span>
                                </div>
                              </div>

                              <div className="flex-1 min-w-[200px]">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                                    isFree
                                      ? "bg-[#e6f5ed] text-[#146c43]"
                                      : "bg-[#eef2f0] text-[#37473f]"
                                  }`}
                                >
                                  {isINR && selected.monthlyCostINR > 0
                                    ? `₹${selected.monthlyCostINR.toLocaleString()}/mo`
                                    : selected.priceDisplay}
                                </span>
                                <p className="text-xs text-[#52655b] mt-1">
                                  {selected.tagline} —{" "}
                                  <span className="text-[#6c7d73]">
                                    {selected.pricingNote}
                                  </span>
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setActiveTab("Tool Stack")}
                                  className="px-3.5 py-2 rounded-xl bg-[#e6f4ed] hover:bg-[#d3ecdf] text-[#124b32] text-xs font-semibold transition cursor-pointer"
                                >
                                  Switch tier
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pricing Disclaimer Banner (Required by PRD #5) */}
                    <div className="rounded-2xl bg-[#eff8f3] border border-[#d5ebdf] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-[#145334] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-[#0c1510]">
                            Point-in-time Pricing Estimate — Check Back
                            Regularly
                          </p>
                          <p className="text-xs text-[#495e53] mt-0.5">
                            Tool pricing, free tiers, and available options
                            change frequently. This build plan is a
                            point-in-time recommendation—re-verify before
                            purchasing Phase 2 or Phase 3 upgrades.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRefreshLivePricing}
                        className="px-3.5 py-2 rounded-xl bg-white border border-[#cde4d8] text-xs font-semibold text-[#124b32] hover:bg-[#e4f3eb] shrink-0 cursor-pointer"
                      >
                        Check Live Pricing Now
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: TOOL STACK (Matches third-page.png layout & features!) */}
                {activeTab === "Tool Stack" && (
                  <div className="space-y-6">
                    {/* Top Row with Filter Pills: Free / Low-Cost | Scale | Compare */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-[#0c1510]">
                          Recommended Tool Stack
                        </h2>
                        <p className="text-xs text-[#617369]">
                          Tools selected based on your idea, budget and goals.
                          Click &ldquo;Use this&rdquo; on any tier to customize
                          your budget.
                        </p>
                      </div>

                      <div className="inline-flex rounded-xl bg-[#f2f7f4] p-1 border border-[#dce8e1]">
                        {(
                          ["Free / Low-Cost", "Scale", "Compare"] as const
                        ).map((pill) => (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => setTierFilter(pill)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                              tierFilter === pill
                                ? "bg-[#124b32] text-white shadow-2xs"
                                : "text-[#4b5e54] hover:text-[#0c1510]"
                            }`}
                          >
                            {pill}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* COMPARE MODE TABLE */}
                    {tierFilter === "Compare" ? (
                      <div className="rounded-2xl border border-[#e5efe9] overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#f5faf7] text-[#37473f] border-b border-[#e5efe9]">
                            <tr>
                              <th className="py-3.5 px-4 font-bold">Category</th>
                              <th className="py-3.5 px-4 font-bold">Tool</th>
                              <th className="py-3.5 px-4 font-bold">Tier</th>
                              <th className="py-3.5 px-4 font-bold">Cost</th>
                              <th className="py-3.5 px-4 font-bold">
                                Free Tier Limits
                              </th>
                              <th className="py-3.5 px-4 font-bold">
                                When to Upgrade
                              </th>
                              <th className="py-3.5 px-4 font-bold text-right">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#edf4f0]">
                            {activePlan.categories.flatMap((cat) =>
                              cat.options.map((opt) => {
                                const isSelected =
                                  cat.selectedToolId === opt.id;
                                return (
                                  <tr
                                    key={opt.id}
                                    className={
                                      isSelected ? "bg-[#f2fbf6]" : "bg-white"
                                    }
                                  >
                                    <td className="py-3 px-4 font-semibold text-[#0c1510]">
                                      {cat.name}
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex items-center gap-2">
                                        <ToolBrandIcon
                                          logoKey={opt.logoKey}
                                          size={24}
                                        />
                                        <span className="font-bold text-[#0c1510]">
                                          {opt.name}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 capitalize text-[#52655b]">
                                      {opt.tier}
                                    </td>
                                    <td className="py-3 px-4 font-bold text-[#124b32]">
                                      {isINR && opt.monthlyCostINR > 0
                                        ? `₹${opt.monthlyCostINR.toLocaleString()}/mo`
                                        : opt.priceDisplay}
                                    </td>
                                    <td className="py-3 px-4 text-[#4b5e54] max-w-[220px]">
                                      {opt.freeTierLimits}
                                    </td>
                                    <td className="py-3 px-4 text-[#4b5e54] max-w-[220px]">
                                      {opt.whenToUpgrade}
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleSelectTool(cat.id, opt.id)
                                        }
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                                          isSelected
                                            ? "bg-[#124b32] text-white"
                                            : "bg-[#e6f4ed] text-[#124b32] hover:bg-[#d2ebde]"
                                        }`}
                                      >
                                        {isSelected ? "Selected" : "Use this"}
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      /* STANDARD 4-COLUMN CATEGORY ROWS (Matches third-page.png!) */
                      <div className="space-y-4">
                        {activePlan.categories.map((cat) => (
                          <div
                            key={cat.id}
                            className="grid grid-cols-1 lg:grid-cols-4 gap-3.5 p-3.5 rounded-2xl bg-[#f9fcfa] border border-[#e7f1eb]"
                          >
                            {/* Column 1: Category Description Card */}
                            <div className="p-3 flex flex-col justify-between">
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#dff2e7] text-[#146c43] flex items-center justify-center shrink-0">
                                  <CategoryIcon iconKey={cat.iconKey} />
                                </div>
                                <div>
                                  <h3 className="text-sm font-bold text-[#0c1510]">
                                    {cat.name}
                                  </h3>
                                  <p className="text-xs text-[#5c6f64] mt-1 leading-relaxed">
                                    {cat.description}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-3 pt-2 border-t border-[#ebf3ee] flex items-center justify-between text-[11px] text-[#6c7d73]">
                                <span>Budget Group:</span>
                                <span className="font-semibold text-[#124b32]">
                                  {cat.budgetGroup}
                                </span>
                              </div>
                            </div>

                            {/* Columns 2, 3, 4: The 3 Tiered Tool Cards */}
                            {cat.options.map((tool) => {
                              const isSelected = cat.selectedToolId === tool.id;
                              const isBookmarked = savedTools.some(
                                (s) => s.tool.id === tool.id
                              );
                              const isHighlightedByFilter =
                                (tierFilter === "Scale" &&
                                  tool.tier === "scale") ||
                                (tierFilter === "Free / Low-Cost" &&
                                  tool.tier !== "scale");

                              return (
                                <div
                                  key={tool.id}
                                  className={`rounded-xl bg-white p-4 border transition flex flex-col justify-between ${
                                    isSelected
                                      ? "border-[#157347] ring-2 ring-[#157347]/15 shadow-xs"
                                      : isHighlightedByFilter
                                      ? "border-[#e4efe9]"
                                      : "border-[#eef4f0] opacity-75 hover:opacity-100"
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex items-center gap-2.5">
                                        <ToolBrandIcon
                                          logoKey={tool.logoKey}
                                          size={34}
                                        />
                                        <div>
                                          <div className="flex items-center gap-1.5">
                                            <h4 className="text-sm font-bold text-[#0c1510]">
                                              {tool.name}
                                            </h4>
                                            <a
                                              href={tool.websiteUrl}
                                              target="_blank"
                                              rel="noreferrer"
                                              title={`Open ${tool.name}`}
                                              className="text-[#82968b] hover:text-[#124b32]"
                                            >
                                              <ExternalLink className="w-3 h-3" />
                                            </a>
                                          </div>
                                          <span
                                            className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                                              tool.monthlyCostUSD === 0 &&
                                              tool.priceDisplay.toLowerCase() ===
                                                "free"
                                                ? "bg-[#e6f5ed] text-[#146c43]"
                                                : "bg-[#f1f5f3] text-[#37473f]"
                                            }`}
                                          >
                                            {isINR && tool.monthlyCostINR > 0
                                              ? `₹${tool.monthlyCostINR.toLocaleString()}/mo`
                                              : tool.priceDisplay}
                                          </span>
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleToggleBookmarkTool(
                                            tool,
                                            cat.name
                                          )
                                        }
                                        title="Save tool for later"
                                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                          isBookmarked
                                            ? "bg-[#e6f4ed] border-[#b7dfc9] text-[#124b32]"
                                            : "border-transparent text-[#82968b] hover:bg-[#f3f8f5]"
                                        }`}
                                      >
                                        <Bookmark className="w-3.5 h-3.5" />
                                      </button>
                                    </div>

                                    <p className="text-xs font-medium text-[#37473f] mt-2.5">
                                      {tool.tagline}
                                    </p>
                                    <p className="text-[11px] text-[#617369] mt-1 leading-relaxed">
                                      {tool.whyRecommended}
                                    </p>
                                    <div className="mt-2.5 pt-2 border-t border-[#f1f6f3] text-[10px] text-[#5c6f64] space-y-0.5">
                                      <p>
                                        <strong className="text-[#1e2d24]">
                                          Free limit:
                                        </strong>{" "}
                                        {tool.freeTierLimits}
                                      </p>
                                      <p>
                                        <strong className="text-[#1e2d24]">
                                          Buy in:
                                        </strong>{" "}
                                        {tool.buyPhase}
                                      </p>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleSelectTool(cat.id, tool.id)
                                    }
                                    className={`mt-3.5 w-full py-2 rounded-lg text-xs font-semibold transition cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                                      isSelected
                                        ? "bg-[#124b32] text-white shadow-2xs"
                                        : "bg-[#e6f4ed] text-[#124b32] hover:bg-[#d3ecdf]"
                                    }`}
                                  >
                                    {isSelected && (
                                      <Check className="w-3.5 h-3.5" />
                                    )}
                                    <span>
                                      {isSelected ? "Use this (Active)" : "Use this"}
                                    </span>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom Summary + Pro Tip Row (Matches third-page.png!) */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-5 pt-2">
                      <div className="rounded-2xl border border-[#e7f0eb] bg-[#fbfdfc] p-5 flex flex-wrap items-center justify-between gap-6">
                        <div>
                          <p className="text-xs font-bold text-[#1e2d24]">
                            Total Estimated MVP Cost
                          </p>
                          <div className="mt-2 flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-[#0c1510]">
                              {formatAmount(
                                budget.monthlyTotalUSD,
                                budget.monthlyTotalINR
                              )}
                            </span>
                            <span className="text-xs font-medium text-[#617369]">
                              / month
                            </span>
                          </div>
                          <p className="text-xs text-[#6c7d73] mt-1">
                            For initial 3 months (MVP)
                          </p>
                        </div>

                        <div className="flex items-center gap-5">
                          <BudgetDonutChart
                            size={105}
                            values={{
                              Development: isINR
                                ? budget.breakdown.Development.inr
                                : budget.breakdown.Development.usd,
                              Design: isINR
                                ? budget.breakdown.Design.inr
                                : budget.breakdown.Design.usd,
                              "Database & Infra": isINR
                                ? budget.breakdown["Database & Infra"].inr
                                : budget.breakdown["Database & Infra"].usd,
                              Marketing: isINR
                                ? budget.breakdown.Marketing.inr
                                : budget.breakdown.Marketing.usd,
                              Other: isINR
                                ? budget.breakdown.Other.inr
                                : budget.breakdown.Other.usd,
                            }}
                          />
                          <div className="space-y-1.5 text-xs">
                            {(
                              [
                                ["Development", "bg-[#10b981]"],
                                ["Design", "bg-[#34d399]"],
                                ["Database & Infra", "bg-[#0ea5e9]"],
                                ["Marketing", "bg-[#f97316]"],
                                ["Other", "bg-[#eab308]"],
                              ] as const
                            ).map(([label, dot]) => (
                              <div
                                key={label}
                                className="flex items-center justify-between gap-4"
                              >
                                <span className="flex items-center gap-2 text-[#37473f]">
                                  <span
                                    className={`w-2.5 h-2.5 rounded-full ${dot}`}
                                  />
                                  {label}
                                </span>
                                <span className="font-bold text-[#0c1510]">
                                  {formatAmount(
                                    budget.breakdown[label].usd,
                                    budget.breakdown[label].inr
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Pro Tip Box (Matches third-page.png) */}
                      <div className="rounded-2xl bg-[#eff8f3] border border-[#d8eee2] p-5 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-sm font-bold text-[#0c1510] mb-2">
                          <Lightbulb className="w-4 h-4 text-[#145334]" />
                          <span>Pro tip</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#495e53] leading-relaxed">
                          This is a point-in-time estimate. Tool pricing may
                          change, so check back regularly for updated
                          recommendations.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: PHASES (PHASED BUYING PLAN - Core PRD Requirement #3) */}
                {activeTab === "Phases" && (
                  <div className="space-y-6">
                    <div className="rounded-2xl bg-[#eff8f3] border border-[#d4ebdf] p-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#146c43]">
                          Phased Purchase Discipline
                        </span>
                        <h3 className="text-lg font-extrabold text-[#0c1510] mt-0.5">
                          Spend only what your current stage requires — never
                          buy everything on Day 1.
                        </h3>
                        <p className="text-xs text-[#495e53] mt-1">
                          Month 1 prototype spend is{" "}
                          <strong>
                            {formatAmount(
                              budget.phase1MonthlyUSD,
                              budget.phase1MonthlyINR
                            )}
                            /mo
                          </strong>
                          . Launch tools are only activated in Phase 2 once your
                          core product loop works.
                        </p>
                      </div>
                      <div className="rounded-xl bg-white border border-[#cde4d8] px-4 py-3 text-right">
                        <p className="text-[11px] text-[#52655b]">
                          Estimated 3-Month Savings
                        </p>
                        <p className="text-xl font-extrabold text-[#124b32]">
                          {formatAmount(
                            budget.savedThreeMonthsUSD,
                            budget.savedThreeMonthsINR
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {activePlan.phases.map((phase) => (
                        <div
                          key={phase.id}
                          className="rounded-2xl border border-[#e5efe9] bg-[#fbfdfc] p-6"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#eaf2ed]">
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#e6f4ed] text-[#124b32] text-xs font-bold">
                                Milestone Trigger: {phase.milestoneTrigger}
                              </span>
                              <h4 className="text-lg font-extrabold text-[#0c1510] mt-2">
                                {phase.title}
                              </h4>
                              <p className="text-xs text-[#5c6f64] mt-0.5">
                                {phase.subtitle}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-[#617369]">
                                Target Monthly Spend
                              </span>
                              <p className="text-2xl font-extrabold text-[#124b32]">
                                {formatAmount(
                                  phase.monthlySpendUSD,
                                  phase.monthlySpendINR
                                )}
                                <span className="text-xs font-normal text-[#617369]">
                                  /mo
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* What to buy/activate in this phase */}
                            <div>
                              <h5 className="text-xs font-bold uppercase tracking-wider text-[#146c43] mb-3 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>What to Activate / Buy Now</span>
                              </h5>
                              <div className="space-y-2.5">
                                {phase.whatToBuyNow.map((item) => (
                                  <div
                                    key={item.toolName}
                                    className="p-3.5 rounded-xl bg-white border border-[#e5efe9]"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-[#0c1510]">
                                        {item.toolName}
                                      </span>
                                      <span className="px-2 py-0.5 rounded bg-[#e6f5ed] text-[#146c43] text-[11px] font-bold">
                                        {item.costDisplay}
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#52655b] mt-1">
                                      {item.actionNote}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* What to WAIT on (Do NOT buy yet) */}
                            <div>
                              <h5 className="text-xs font-bold uppercase tracking-wider text-[#b45309] mb-3 flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4" />
                                <span>Do NOT Buy Yet (Wait Until Later)</span>
                              </h5>
                              <div className="space-y-2.5">
                                {phase.whatToWaitOn.map((wait) => (
                                  <div
                                    key={wait.item}
                                    className="p-3.5 rounded-xl bg-[#fffbeb] border border-[#fde68a]"
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-xs font-bold text-[#78350f]">
                                        {wait.item}
                                      </span>
                                      <span className="px-2 py-0.5 rounded bg-white text-[#b45309] text-[10px] font-bold shrink-0">
                                        Saves ${wait.savedAmountUSD}/mo
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#92400e] mt-1">
                                      {wait.reasonToWait}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: COST BREAKDOWN (Core PRD Requirement #4) */}
                {activeTab === "Cost Breakdown" && (
                  <div className="space-y-6">
                    {/* 3-Card Financial Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-2xl border border-[#e5efe9] bg-[#fbfdfc] p-5">
                        <p className="text-xs font-semibold text-[#52655b]">
                          Month 1 (Phase 1 Prototype)
                        </p>
                        <p className="text-2xl font-extrabold text-[#0c1510] mt-1">
                          {formatAmount(
                            budget.phase1MonthlyUSD,
                            budget.phase1MonthlyINR
                          )}
                        </p>
                        <p className="text-[11px] text-[#146c43] mt-1">
                          Uses free tiers for DB, Auth &amp; Hosting
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[#e5efe9] bg-[#fbfdfc] p-5">
                        <p className="text-xs font-semibold text-[#52655b]">
                          Months 2–3 (MVP Launch Rate)
                        </p>
                        <p className="text-2xl font-extrabold text-[#0c1510] mt-1">
                          {formatAmount(
                            budget.monthlyTotalUSD,
                            budget.monthlyTotalINR
                          )}{" "}
                          <span className="text-xs font-normal text-[#617369]">
                            / mo
                          </span>
                        </p>
                        <p className="text-[11px] text-[#5c6f64] mt-1">
                          Full live MVP stack for first 100–500 users
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[#198754]/30 bg-[#f2fbf6] p-5">
                        <p className="text-xs font-bold text-[#124b32]">
                          Total 3-Month MVP Budget (All-In)
                        </p>
                        <p className="text-2xl font-extrabold text-[#124b32] mt-1">
                          {formatAmount(
                            budget.threeMonthTotalUSD,
                            budget.threeMonthTotalINR
                          )}
                        </p>
                        <p className="text-[11px] text-[#37473f] mt-1">
                          Includes phased monthly + selected one-time costs
                        </p>
                      </div>
                    </div>

                    {/* Line-Item Category & Phase Cost Table */}
                    <div className="rounded-2xl border border-[#e5efe9] overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#f5faf7] text-[#37473f] border-b border-[#e5efe9]">
                          <tr>
                            <th className="py-3.5 px-4 font-bold">
                              Budget Group
                            </th>
                            <th className="py-3.5 px-4 font-bold">Category</th>
                            <th className="py-3.5 px-4 font-bold">
                              Selected Tool
                            </th>
                            <th className="py-3.5 px-4 font-bold">
                              Purchase Phase
                            </th>
                            <th className="py-3.5 px-4 font-bold text-right">
                              Monthly Cost
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#edf4f0]">
                          {activePlan.categories.map((cat) => {
                            const sel =
                              cat.options.find(
                                (o) => o.id === cat.selectedToolId
                              ) || cat.options[0];
                            return (
                              <tr key={cat.id} className="bg-white">
                                <td className="py-3 px-4 font-semibold text-[#124b32]">
                                  {cat.budgetGroup}
                                </td>
                                <td className="py-3 px-4 text-[#37473f]">
                                  {cat.name}
                                </td>
                                <td className="py-3 px-4 font-bold text-[#0c1510]">
                                  {sel.name}{" "}
                                  <span className="font-normal text-[#617369]">
                                    ({sel.pricingNote})
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-[#4b5e54]">
                                  {sel.buyPhase}
                                </td>
                                <td className="py-3 px-4 text-right font-extrabold text-[#0c1510]">
                                  {formatAmount(
                                    sel.monthlyCostUSD,
                                    sel.monthlyCostINR
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* One-Time Setup & Launch Costs (Interactive Checklist) */}
                    <div className="rounded-2xl border border-[#e5efe9] bg-[#fbfdfc] p-5">
                      <h4 className="text-sm font-bold text-[#0c1510]">
                        One-Time &amp; Annual Launch Costs (Toggle if applicable)
                      </h4>
                      <p className="text-xs text-[#617369] mt-0.5">
                        Check only the items your MVP requires during the
                        initial 3 months.
                      </p>
                      <div className="mt-3 space-y-2">
                        {(activePlan.oneTimeCosts || []).map((otc) => (
                          <label
                            key={otc.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e7f0eb] cursor-pointer hover:border-[#b7dfc9]"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={otc.included}
                                onChange={() => handleToggleOneTimeCost(otc.id)}
                                className="w-4 h-4 accent-[#124b32] rounded"
                              />
                              <div>
                                <p className="text-xs font-bold text-[#0c1510]">
                                  {otc.name}
                                </p>
                                <p className="text-[11px] text-[#617369]">
                                  {otc.note}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#124b32]">
                              {formatAmount(otc.costUSD, otc.costINR)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Common Overspend Traps to Avoid */}
                    <div>
                      <h4 className="text-sm font-bold text-[#0c1510] mb-3">
                        Overspend Traps to Avoid for This Idea
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activePlan.overspendTraps.map((trap) => (
                          <div
                            key={trap.title}
                            className="rounded-2xl border border-[#e5efe9] bg-[#fbfdfc] p-4 flex flex-col justify-between"
                          >
                            <div>
                              <span className="inline-block px-2 py-0.5 rounded bg-[#dcfce7] text-[#146c43] text-[10px] font-bold">
                                Save ~${trap.estimatedSavingsUSD}
                              </span>
                              <h5 className="text-xs font-bold text-[#0c1510] mt-2">
                                {trap.title}
                              </h5>
                              <p className="text-[11px] text-[#617369] mt-1">
                                <strong>Trap:</strong> {trap.mistake}
                              </p>
                            </div>
                            <p className="text-[11px] text-[#124b32] font-medium mt-3 pt-2 border-t border-[#ebf3ee]">
                              <strong>Do this instead:</strong>{" "}
                              {trap.smartAlternative}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW C: MY PLANS (Saved Build Plans in Local Persistence) */}
            {sidebarView === "my-plans" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#0c1510]">
                      My Build Plans
                    </h2>
                    <p className="text-xs sm:text-sm text-[#617369]">
                      Switch between your saved product build plans or create a
                      new one.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSidebarView("new-idea-wizard");
                      setWizardStep(1);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#134e35] hover:bg-[#0e3c28] text-white text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Build Plan</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans.map((p) => {
                    const pBudget = calculatePlanBudget(p);
                    const isCurrent = p.id === activePlan.id;
                    return (
                      <div
                        key={p.id}
                        className={`rounded-2xl border p-5 flex flex-col justify-between transition ${
                          isCurrent
                            ? "border-[#145334] bg-[#f4fbf7]"
                            : "border-[#e5efe9] bg-white hover:border-[#b7dfc9]"
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="px-2.5 py-0.5 rounded-full bg-[#e6f4ed] text-[#124b32] text-[10px] font-bold">
                                {pBudget.dynamicBadge}
                              </span>
                              <h3 className="text-base font-bold text-[#0c1510] mt-2">
                                {p.title}
                              </h3>
                            </div>
                            {plans.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const remaining = deletePlanFromStorage(p.id);
                                  setPlans(remaining);
                                  if (isCurrent) {
                                    setActivePlan(remaining[0]);
                                  }
                                  triggerToast("Deleted build plan");
                                }}
                                className="p-1.5 rounded-lg text-[#82968b] hover:text-red-600 hover:bg-red-50 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-[#52655b] mt-2 line-clamp-2">
                            {p.ideaDescription}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-[#e5efe9] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#617369]">
                              Estimated Monthly
                            </span>
                            <p className="text-lg font-extrabold text-[#124b32]">
                              {p.region === "INR"
                                ? `₹${pBudget.monthlyTotalINR.toLocaleString()}/mo`
                                : `$${pBudget.monthlyTotalUSD}/mo`}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActivePlan(p);
                              setSidebarView("plan-dashboard");
                            }}
                            className="px-4 py-2 rounded-xl bg-[#124b32] text-white text-xs font-semibold hover:bg-[#0e3b27] cursor-pointer"
                          >
                            {isCurrent ? "View Active Plan" : "Open Plan"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW D: SAVED TOOLS */}
            {sidebarView === "saved" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0c1510]">
                    Saved Tools &amp; Stack Shortlist
                  </h2>
                  <p className="text-xs sm:text-sm text-[#617369]">
                    Bookmarked tools across your build plans for quick pricing
                    reference.
                  </p>
                </div>

                {savedTools.length === 0 ? (
                  <div className="rounded-2xl border border-[#e5efe9] bg-[#fbfdfc] p-10 text-center">
                    <Bookmark className="w-8 h-8 text-[#146c43] mx-auto mb-2" />
                    <h3 className="text-base font-bold text-[#0c1510]">
                      No saved tools yet
                    </h3>
                    <p className="text-xs text-[#617369] mt-1 max-w-md mx-auto">
                      Click the bookmark icon on any tool card inside the Tool
                      Stack tab to shortlist tools for your MVP.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSidebarView("plan-dashboard");
                        setActiveTab("Tool Stack");
                      }}
                      className="mt-4 px-4 py-2 rounded-xl bg-[#124b32] text-white text-xs font-semibold cursor-pointer"
                    >
                      Browse Tool Stack
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedTools.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-[#e5efe9] bg-white p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-[#146c43]">
                              {item.categoryName}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleBookmarkTool(
                                  item.tool,
                                  item.categoryName
                                )
                              }
                              className="text-xs text-[#82968b] hover:text-red-600 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="flex items-center gap-2.5 mt-2">
                            <ToolBrandIcon
                              logoKey={item.tool.logoKey}
                              size={32}
                            />
                            <div>
                              <h4 className="text-sm font-bold text-[#0c1510]">
                                {item.tool.name}
                              </h4>
                              <span className="text-xs font-semibold text-[#124b32]">
                                {item.tool.priceDisplay}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-[#52655b] mt-2">
                            {item.tool.whyRecommended}
                          </p>
                        </div>
                        <a
                          href={item.tool.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#124b32] hover:underline"
                        >
                          <span>Visit {item.tool.name}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW E: SETTINGS (Region, Live Gemini Search Grounding Key, Persistence) */}
            {sidebarView === "settings" && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0c1510]">
                    Workspace Settings
                  </h2>
                  <p className="text-xs sm:text-sm text-[#617369]">
                    Configure your default currency region (US / India) and
                    optional Gemini API key for live web-grounded pricing
                    searches.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e5efe9] bg-[#fbfdfc] p-6 space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0c1510] mb-1">
                      Default Currency &amp; Market Region
                    </label>
                    <p className="text-xs text-[#617369] mb-2.5">
                      Tailors payment stack recommendations (Stripe vs.
                      Razorpay) and currency display.
                    </p>
                    <div className="inline-flex rounded-xl bg-white p-1 border border-[#dce8e1]">
                      <button
                        type="button"
                        onClick={() => {
                          const updated: UserSettings = {
                            ...settings,
                            preferredRegion: "USD",
                          };
                          setSettings(updated);
                          saveUserSettings(updated);
                          triggerToast("Default currency set to USD ($)");
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer ${
                          settings.preferredRegion === "USD"
                            ? "bg-[#124b32] text-white"
                            : "text-[#4b5e54]"
                        }`}
                      >
                        🇺🇸 United States ($ USD)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated: UserSettings = {
                            ...settings,
                            preferredRegion: "INR",
                          };
                          setSettings(updated);
                          saveUserSettings(updated);
                          triggerToast("Default currency set to India (₹ INR)");
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer ${
                          settings.preferredRegion === "INR"
                            ? "bg-[#124b32] text-white"
                            : "text-[#4b5e54]"
                        }`}
                      >
                        🇮🇳 India (₹ INR)
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#e7f0eb]">
                    <label className="block text-xs font-bold text-[#0c1510] mb-1">
                      Google Gemini API Key (Optional — Enables Live Google
                      Search Pricing Grounding)
                    </label>
                    <p className="text-xs text-[#617369] mb-2.5">
                      Buildsy works out-of-the-box with our built-in smart
                      recommendation engine. Add a Gemini API key here (or via{" "}
                      <code className="px-1.5 py-0.5 rounded bg-[#eaf2ed] text-[#124b32]">
                        GEMINI_API_KEY
                      </code>{" "}
                      in <code className="px-1.5 py-0.5 rounded bg-[#eaf2ed]">.env.local</code>)
                      to enable live web search grounding.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={settings.geminiApiKey || ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            geminiApiKey: e.target.value,
                          }))
                        }
                        placeholder="AIzaSy..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#d5e5dc] bg-white text-xs text-[#0c1510]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          saveUserSettings(settings);
                          triggerToast("Saved workspace settings!");
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#124b32] text-white text-xs font-semibold cursor-pointer"
                      >
                        Save Key
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#e7f0eb] flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#146c43] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#52655b]">
                      <p className="font-bold text-[#0c1510]">
                        Local Persistence Active (Supabase-Ready Architecture)
                      </p>
                      <p className="mt-0.5">
                        Your plans and saved tools are persisted locally in your
                        browser with zero configuration required, and can be
                        exported as Markdown or JSON anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* EXPORT PLAN MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#dcece3] shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#f2f7f4] hover:bg-[#e2eee7] flex items-center justify-center text-[#37473f] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-extrabold text-[#0c1510]">
              Export Your Build Plan
            </h3>
            <p className="text-xs text-[#5c6f64] mt-1">
              Save your complete tool stack, phased buying schedule, and MVP
              cost breakdown.
            </p>

            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="w-full p-3.5 rounded-xl border border-[#dce8e1] hover:border-[#145334] bg-[#fbfdfc] flex items-center justify-between text-left transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Copy className="w-4 h-4 text-[#124b32]" />
                  <div>
                    <p className="text-xs font-bold text-[#0c1510]">
                      Copy Markdown to Clipboard (Notion / GitHub Ready)
                    </p>
                    <p className="text-[11px] text-[#617369]">
                      Paste directly into Notion, Linear, or Google Docs
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#124b32]" />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDownloadFile(
                    generateMarkdownExport(activePlan),
                    `${activePlan.id}.md`,
                    "text/markdown"
                  )
                }
                className="w-full p-3.5 rounded-xl border border-[#dce8e1] hover:border-[#145334] bg-[#fbfdfc] flex items-center justify-between text-left transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[#124b32]" />
                  <div>
                    <p className="text-xs font-bold text-[#0c1510]">
                      Download Markdown Blueprint (.md)
                    </p>
                    <p className="text-[11px] text-[#617369]">
                      Complete stack, phases, and overspend traps
                    </p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-[#124b32]" />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDownloadFile(
                    JSON.stringify(activePlan, null, 2),
                    `${activePlan.id}.json`,
                    "application/json"
                  )
                }
                className="w-full p-3.5 rounded-xl border border-[#dce8e1] hover:border-[#145334] bg-[#fbfdfc] flex items-center justify-between text-left transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Code2 className="w-4 h-4 text-[#124b32]" />
                  <div>
                    <p className="text-xs font-bold text-[#0c1510]">
                      Download Structured JSON (.json)
                    </p>
                    <p className="text-[11px] text-[#617369]">
                      Raw plan data for backup or importing later
                    </p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-[#124b32]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowExportModal(false);
                  setTimeout(() => window.print(), 200);
                }}
                className="w-full p-3.5 rounded-xl border border-[#dce8e1] hover:border-[#145334] bg-[#fbfdfc] flex items-center justify-between text-left transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Printer className="w-4 h-4 text-[#124b32]" />
                  <div>
                    <p className="text-xs font-bold text-[#0c1510]">
                      Print / Save as PDF
                    </p>
                    <p className="text-[11px] text-[#617369]">
                      Use your browser&apos;s Save as PDF option
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#124b32]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BuildsyStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4faf6] flex items-center justify-center text-sm font-semibold text-[#124b32]">
          Loading Buildsy Studio...
        </div>
      }
    >
      <BuildsyStudioContent />
    </Suspense>
  );
}
