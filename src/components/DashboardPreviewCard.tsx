"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  FilePlus2,
  FolderKanban,
  Bookmark,
  Settings,
  CheckCircle2,
  Lightbulb,
  Layout,
  Database,
  CreditCard,
  Check,
} from "lucide-react";
import {
  BuildsyLogo,
  BudgetDonutChart,
  ToolBrandIcon,
} from "@/components/ToolLogos";

interface DashboardPreviewCardProps {
  defaultTab?: "Overview" | "Tool Stack" | "Phases" | "Cost Breakdown";
  compact?: boolean;
}

export function DashboardPreviewCard({
  defaultTab = "Overview",
  compact = false,
}: DashboardPreviewCardProps) {
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Tool Stack" | "Phases" | "Cost Breakdown"
  >(defaultTab);
  const [tierFilter, setTierFilter] = useState<
    "Free / Low-Cost" | "Scale" | "Compare"
  >("Free / Low-Cost");

  // Track interactive tool selections inside the preview card
  const [selectedTools, setSelectedTools] = useState<{
    Frontend: string;
    Backend: string;
    Payments: string;
  }>({
    Frontend: "Next.js",
    Backend: "Supabase",
    Payments: "Stripe",
  });

  // Compute live cost based on user interaction inside preview
  const frontendAdd =
    selectedTools.Frontend === "Webflow"
      ? 18
      : selectedTools.Frontend === "Framer"
      ? 20
      : 0;
  const backendAdd =
    selectedTools.Backend === "Firebase"
      ? 25
      : selectedTools.Backend === "MongoDB"
      ? 57
      : 0;
  const paymentsAdd =
    selectedTools.Payments === "LemonSqueezy"
      ? 20
      : selectedTools.Payments === "Razorpay"
      ? 2
      : 0;

  const devCost = 48 + frontendAdd;
  const designCost = 30;
  const dbInfraCost = 28 + backendAdd;
  const marketingCost = 18;
  const otherCost = 10 + paymentsAdd;
  const totalMonthly =
    devCost + designCost + dbInfraCost + marketingCost + otherCost;

  return (
    <div className="w-full rounded-2xl bg-white border border-[#dcece3] shadow-[0_20px_60px_-15px_rgba(16,68,42,0.12)] overflow-hidden text-left">
      <div className="grid grid-cols-1 md:grid-cols-[175px_1fr] min-h-[480px]">
        {/* Left Sidebar */}
        <div className="bg-[#f9fcfa] border-b md:border-b-0 md:border-r border-[#e8f2ec] p-4 flex flex-col justify-between">
          <div>
            <div className="px-2 pt-1 pb-5">
              <BuildsyLogo size="sm" />
            </div>
            <nav className="space-y-1.5">
              <Link
                href="/app"
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#124b32] text-white text-xs font-semibold shadow-xs transition hover:bg-[#0e3b27]"
              >
                <FilePlus2 className="w-3.5 h-3.5 shrink-0" />
                <span>New Plan</span>
              </Link>
              <Link
                href="/app?view=plans"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#4b5e54] hover:bg-[#eef7f2] hover:text-[#124b32] text-xs font-medium transition"
              >
                <FolderKanban className="w-3.5 h-3.5 shrink-0" />
                <span>My Plans</span>
              </Link>
              <Link
                href="/app?view=saved"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#4b5e54] hover:bg-[#eef7f2] hover:text-[#124b32] text-xs font-medium transition"
              >
                <Bookmark className="w-3.5 h-3.5 shrink-0" />
                <span>Saved</span>
              </Link>
              <Link
                href="/app?view=settings"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#4b5e54] hover:bg-[#eef7f2] hover:text-[#124b32] text-xs font-medium transition"
              >
                <Settings className="w-3.5 h-3.5 shrink-0" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>

          <div className="hidden md:block pt-4 border-t border-[#e8f2ec]">
            <Link
              href="/app"
              className="block rounded-lg bg-[#e8f5ee] p-2.5 text-[11px] text-[#124b32] font-medium hover:bg-[#d7eee2] transition"
            >
              ✨ Try interactive studio →
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-5 sm:p-6 bg-white flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0c1510] tracking-tight">
                  Your Build Plan
                </h3>
                <p className="text-xs text-[#617369] mt-0.5">
                  A complete tool stack and budget to build your MVP
                </p>
              </div>
              <Link
                href="/app"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dce5e0] bg-white hover:bg-[#f6faf8] text-[#1e2d24] text-xs font-medium shadow-2xs transition"
              >
                <Download className="w-3.5 h-3.5 text-[#4b5e54]" />
                <span>Export Plan</span>
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-5 border-b border-[#edf3ef] text-xs font-medium mb-5 overflow-x-auto">
              {(
                ["Overview", "Tool Stack", "Phases", "Cost Breakdown"] as const
              ).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2.5 whitespace-nowrap border-b-2 transition cursor-pointer ${
                      isActive
                        ? "border-[#145334] text-[#0c1510] font-semibold"
                        : "border-transparent text-[#6c7d73] hover:text-[#145334]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* TAB 1: OVERVIEW (Matches hero-page.png & second-page.png) */}
            {activeTab === "Overview" && (
              <div className="space-y-5">
                {/* Top 2 Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.35fr] gap-3.5">
                  {/* Total Estimated MVP Cost Card */}
                  <div className="rounded-xl border border-[#eef4f0] bg-[#fbfdfc] p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#1e2d24]">
                        Total Estimated MVP Cost
                      </p>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#0c1510] tracking-tight">
                          ${totalMonthly}
                        </span>
                        <span className="text-xs font-medium text-[#617369]">
                          / month
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6c7d73] mt-1">
                        For initial 3 months (MVP)
                      </p>
                    </div>
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e6f5ed] text-[#146c43] text-[11px] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Low cost MVP
                      </span>
                    </div>
                  </div>

                  {/* Donut Chart + Category Legend Card */}
                  <div className="rounded-xl border border-[#eef4f0] bg-[#fbfdfc] p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center">
                      <BudgetDonutChart
                        size={compact ? 104 : 114}
                        values={{
                          Development: devCost,
                          Design: designCost,
                          "Database & Infra": dbInfraCost,
                          Marketing: marketingCost,
                          Other: otherCost,
                        }}
                      />
                    </div>
                    <div className="flex-1 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-[#37473f]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shrink-0" />
                          Development
                        </span>
                        <span className="font-bold text-[#0c1510]">
                          ${devCost}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-[#37473f]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] shrink-0" />
                          Design
                        </span>
                        <span className="font-bold text-[#0c1510]">
                          ${designCost}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-[#37473f]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0ea5e9] shrink-0" />
                          Database &amp; Infra
                        </span>
                        <span className="font-bold text-[#0c1510]">
                          ${dbInfraCost}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-[#37473f]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] shrink-0" />
                          Marketing
                        </span>
                        <span className="font-bold text-[#0c1510]">
                          ${marketingCost}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-[#37473f]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] shrink-0" />
                          Other
                        </span>
                        <span className="font-bold text-[#0c1510]">
                          ${otherCost}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Tools List */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-sm font-bold text-[#0c1510]">
                      Recommended Tools
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveTab("Tool Stack")}
                      className="text-xs font-semibold text-[#145334] underline underline-offset-2 hover:text-[#0d3823] cursor-pointer"
                    >
                      View all
                    </button>
                  </div>

                  <div className="rounded-xl border border-[#eef4f0] bg-[#fbfdfc] divide-y divide-[#eef4f0]">
                    {/* Row 1: Frontend */}
                    <div className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-[155px]">
                        <span className="text-xs font-semibold text-[#1e2d24] w-16">
                          Frontend
                        </span>
                        <ToolBrandIcon logoKey="nextjs" size={30} />
                        <span className="text-xs font-bold text-[#0c1510]">
                          Next.js
                        </span>
                      </div>
                      <div className="hidden sm:block flex-1">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-[#e6f5ed] text-[#146c43] text-[10px] font-semibold">
                          Free
                        </span>
                        <p className="text-[11px] text-[#617369] mt-0.5">
                          Best for MVPs, easy to deploy
                        </p>
                      </div>
                      <Link
                        href="/app"
                        className="px-3 py-1.5 rounded-lg bg-[#e6f4ed] hover:bg-[#d3ecdf] text-[#124b32] text-xs font-semibold transition"
                      >
                        Use this
                      </Link>
                    </div>

                    {/* Row 2: Database */}
                    <div className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-[155px]">
                        <span className="text-xs font-semibold text-[#1e2d24] w-16">
                          Database
                        </span>
                        <ToolBrandIcon logoKey="supabase" size={30} />
                        <span className="text-xs font-bold text-[#0c1510]">
                          Supabase
                        </span>
                      </div>
                      <div className="hidden sm:block flex-1">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-[#e6f5ed] text-[#146c43] text-[10px] font-semibold">
                          Free
                        </span>
                        <p className="text-[11px] text-[#617369] mt-0.5">
                          Scalable and developer friendly
                        </p>
                      </div>
                      <Link
                        href="/app"
                        className="px-3 py-1.5 rounded-lg bg-[#e6f4ed] hover:bg-[#d3ecdf] text-[#124b32] text-xs font-semibold transition"
                      >
                        Use this
                      </Link>
                    </div>

                    {/* Row 3: Payments */}
                    <div className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-[155px]">
                        <span className="text-xs font-semibold text-[#1e2d24] w-16">
                          Payments
                        </span>
                        <ToolBrandIcon logoKey="stripe" size={30} />
                        <span className="text-xs font-bold text-[#0c1510]">
                          Stripe
                        </span>
                      </div>
                      <div className="hidden sm:block flex-1">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-[#f1f5f3] text-[#37473f] text-[10px] font-semibold">
                          $0/txn
                        </span>
                        <p className="text-[11px] text-[#617369] mt-0.5">
                          Industry standard, easy setup
                        </p>
                      </div>
                      <Link
                        href="/app"
                        className="px-3 py-1.5 rounded-lg bg-[#e6f4ed] hover:bg-[#d3ecdf] text-[#124b32] text-xs font-semibold transition"
                      >
                        Use this
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TOOL STACK (Matches third-page.png exactly!) */}
            {activeTab === "Tool Stack" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-[#0c1510]">
                      Recommended Tool Stack
                    </h4>
                    <p className="text-[11px] text-[#6c7d73]">
                      Tools selected based on your idea, budget and goals.
                    </p>
                  </div>
                  <div className="inline-flex rounded-lg bg-[#f2f7f4] p-0.5 border border-[#e3ede7]">
                    {(["Free / Low-Cost", "Scale", "Compare"] as const).map(
                      (pill) => (
                        <button
                          key={pill}
                          type="button"
                          onClick={() => setTierFilter(pill)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                            tierFilter === pill
                              ? "bg-[#124b32] text-white shadow-2xs"
                              : "text-[#4b5e54] hover:text-[#0c1510]"
                          }`}
                        >
                          {pill}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* 3 Category Rows x 4 Cards */}
                <div className="space-y-2.5">
                  {/* Row 1: Frontend */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-2 rounded-xl bg-[#f9fcfa] border border-[#edf4f0]">
                    <div className="p-2 flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#e2f3ea] text-[#157347] flex items-center justify-center shrink-0 mt-0.5">
                        <Layout className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0c1510]">
                          Frontend
                        </p>
                        <p className="text-[10px] text-[#617369] leading-snug mt-0.5">
                          Build and deploy your frontend quickly.
                        </p>
                      </div>
                    </div>
                    {[
                      {
                        name: "Next.js",
                        logo: "nextjs",
                        price: "Free",
                        isFree: true,
                        desc: "Best for MVPs, easy to deploy",
                      },
                      {
                        name: "Webflow",
                        logo: "webflow",
                        price: "$18/mo",
                        isFree: false,
                        desc: "No-code option",
                      },
                      {
                        name: "Framer",
                        logo: "framer",
                        price: "$20/mo",
                        isFree: false,
                        desc: "Design + deploy",
                      },
                    ].map((tool) => {
                      const isSelected = selectedTools.Frontend === tool.name;
                      return (
                        <div
                          key={tool.name}
                          className={`rounded-lg bg-white p-2.5 border transition flex flex-col justify-between ${
                            isSelected
                              ? "border-[#198754] ring-1 ring-[#198754]/20"
                              : "border-[#edf3ef]"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <ToolBrandIcon logoKey={tool.logo} size={24} />
                              <div>
                                <p className="text-xs font-bold text-[#0c1510] leading-none">
                                  {tool.name}
                                </p>
                                <span
                                  className={`inline-block mt-1 px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                                    tool.isFree
                                      ? "bg-[#e6f5ed] text-[#146c43]"
                                      : "bg-[#f1f5f3] text-[#37473f]"
                                  }`}
                                >
                                  {tool.price}
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] text-[#617369] mt-1.5">
                              {tool.desc}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTools((s) => ({
                                ...s,
                                Frontend: tool.name,
                              }))
                            }
                            className={`mt-2 w-full py-1 rounded-md text-[10px] font-semibold transition cursor-pointer inline-flex items-center justify-center gap-1 ${
                              isSelected
                                ? "bg-[#124b32] text-white"
                                : "bg-[#e6f4ed] text-[#124b32] hover:bg-[#d4ebdf]"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            {isSelected ? "Selected" : "Use this"}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Row 2: Backend / Database */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-2 rounded-xl bg-[#f9fcfa] border border-[#edf4f0]">
                    <div className="p-2 flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#e2f3ea] text-[#157347] flex items-center justify-center shrink-0 mt-0.5">
                        <Database className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0c1510]">
                          Backend / Database
                        </p>
                        <p className="text-[10px] text-[#617369] leading-snug mt-0.5">
                          Scalable and developer friendly.
                        </p>
                      </div>
                    </div>
                    {[
                      {
                        name: "Supabase",
                        logo: "supabase",
                        price: "Free",
                        isFree: true,
                        desc: "Open source, scalable",
                      },
                      {
                        name: "Firebase",
                        logo: "firebase",
                        price: "$25/mo",
                        isFree: false,
                        desc: "Google ecosystem",
                      },
                      {
                        name: "MongoDB",
                        logo: "mongodb",
                        price: "$57/mo",
                        isFree: false,
                        desc: "For complex needs",
                      },
                    ].map((tool) => {
                      const isSelected = selectedTools.Backend === tool.name;
                      return (
                        <div
                          key={tool.name}
                          className={`rounded-lg bg-white p-2.5 border transition flex flex-col justify-between ${
                            isSelected
                              ? "border-[#198754] ring-1 ring-[#198754]/20"
                              : "border-[#edf3ef]"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <ToolBrandIcon logoKey={tool.logo} size={24} />
                              <div>
                                <p className="text-xs font-bold text-[#0c1510] leading-none">
                                  {tool.name}
                                </p>
                                <span
                                  className={`inline-block mt-1 px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                                    tool.isFree
                                      ? "bg-[#e6f5ed] text-[#146c43]"
                                      : "bg-[#f1f5f3] text-[#37473f]"
                                  }`}
                                >
                                  {tool.price}
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] text-[#617369] mt-1.5">
                              {tool.desc}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTools((s) => ({
                                ...s,
                                Backend: tool.name,
                              }))
                            }
                            className={`mt-2 w-full py-1 rounded-md text-[10px] font-semibold transition cursor-pointer inline-flex items-center justify-center gap-1 ${
                              isSelected
                                ? "bg-[#124b32] text-white"
                                : "bg-[#e6f4ed] text-[#124b32] hover:bg-[#d4ebdf]"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            {isSelected ? "Selected" : "Use this"}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Row 3: Payments */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-2 rounded-xl bg-[#f9fcfa] border border-[#edf4f0]">
                    <div className="p-2 flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#f3e8ff] text-[#7e22ce] flex items-center justify-center shrink-0 mt-0.5">
                        <CreditCard className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0c1510]">
                          Payments
                        </p>
                        <p className="text-[10px] text-[#617369] leading-snug mt-0.5">
                          Setup payments and subscriptions.
                        </p>
                      </div>
                    </div>
                    {[
                      {
                        name: "Stripe",
                        logo: "stripe",
                        price: "$0/txn",
                        isFree: false,
                        desc: "Industry standard",
                      },
                      {
                        name: "Razorpay",
                        logo: "razorpay",
                        price: "₹149/mo",
                        isFree: false,
                        desc: "Best for India",
                      },
                      {
                        name: "LemonSqueezy",
                        logo: "lemonsqueezy",
                        price: "$20/mo",
                        isFree: false,
                        desc: "For SaaS products",
                      },
                    ].map((tool) => {
                      const isSelected = selectedTools.Payments === tool.name;
                      return (
                        <div
                          key={tool.name}
                          className={`rounded-lg bg-white p-2.5 border transition flex flex-col justify-between ${
                            isSelected
                              ? "border-[#198754] ring-1 ring-[#198754]/20"
                              : "border-[#edf3ef]"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <ToolBrandIcon logoKey={tool.logo} size={24} />
                              <div>
                                <p className="text-xs font-bold text-[#0c1510] leading-none">
                                  {tool.name}
                                </p>
                                <span className="inline-block mt-1 px-1.5 py-0.2 rounded bg-[#f1f5f3] text-[#37473f] text-[10px] font-semibold">
                                  {tool.price}
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] text-[#617369] mt-1.5">
                              {tool.desc}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTools((s) => ({
                                ...s,
                                Payments: tool.name,
                              }))
                            }
                            className={`mt-2 w-full py-1 rounded-md text-[10px] font-semibold transition cursor-pointer inline-flex items-center justify-center gap-1 ${
                              isSelected
                                ? "bg-[#124b32] text-white"
                                : "bg-[#e6f4ed] text-[#124b32] hover:bg-[#d4ebdf]"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            {isSelected ? "Selected" : "Use this"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Summary Row + Pro Tip Disclaimer (Matches third-page.png) */}
                <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-3 pt-1">
                  <div className="rounded-xl border border-[#eef4f0] bg-[#fbfdfc] p-3.5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold text-[#1e2d24]">
                        Total Estimated MVP Cost
                      </p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-[#0c1510]">
                          ${totalMonthly}
                        </span>
                        <span className="text-[11px] text-[#617369]">
                          / month
                        </span>
                      </div>
                      <p className="text-[10px] text-[#6c7d73] mt-0.5">
                        For initial 3 months (MVP)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <BudgetDonutChart
                        size={78}
                        values={{
                          Development: devCost,
                          Design: designCost,
                          "Database & Infra": dbInfraCost,
                          Marketing: marketingCost,
                          Other: otherCost,
                        }}
                      />
                      <div className="space-y-1 text-[10px]">
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-1.5 text-[#37473f]">
                            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                            Development
                          </span>
                          <span className="font-bold">${devCost}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-1.5 text-[#37473f]">
                            <span className="w-2 h-2 rounded-full bg-[#34d399]" />
                            Design
                          </span>
                          <span className="font-bold">${designCost}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-1.5 text-[#37473f]">
                            <span className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
                            Database &amp; Infra
                          </span>
                          <span className="font-bold">${dbInfraCost}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-1.5 text-[#37473f]">
                            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                            Marketing
                          </span>
                          <span className="font-bold">${marketingCost}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-1.5 text-[#37473f]">
                            <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                            Other
                          </span>
                          <span className="font-bold">${otherCost}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pro Tip Disclaimer Box */}
                  <div className="rounded-xl bg-[#eff8f3] border border-[#d8eee2] p-3.5 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0c1510] mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-[#145334]" />
                      <span>Pro tip</span>
                    </div>
                    <p className="text-[11px] text-[#495e53] leading-relaxed">
                      This is a point-in-time estimate. Tool pricing may change,
                      so check back regularly for updated recommendations.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PHASES */}
            {activeTab === "Phases" && (
              <div className="space-y-3">
                <div className="rounded-xl bg-[#eff8f3] border border-[#d8eee2] p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#124b32]">
                      Phased Buying Plan — Avoid Buying Everything Upfront
                    </p>
                    <p className="text-[11px] text-[#495e53]">
                      Start on free tiers in Weeks 1–4. Upgrade only when real
                      user milestones trigger it.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white text-[#124b32] text-xs font-bold shrink-0">
                    Saves $460+ in 3 mos
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      phase: "Phase 1: Prototype",
                      time: "Weeks 1–4",
                      cost: "$78/mo",
                      items: [
                        "Next.js + Supabase Free ($0)",
                        "Cursor Pro + Dev ($48)",
                        "Figma UI System ($30)",
                      ],
                    },
                    {
                      phase: "Phase 2: MVP Launch",
                      time: "Months 2–3",
                      cost: `$${totalMonthly}/mo`,
                      items: [
                        "Resend Pro + Redis ($28)",
                        "Launch Analytics ($18)",
                        "Custom Domain + Inbox ($10)",
                      ],
                    },
                    {
                      phase: "Phase 3: Scale",
                      time: "Month 4+ ($2k MRR)",
                      cost: "$245/mo",
                      items: [
                        "Supabase Pro Backups ($25)",
                        "Lifecycle Email CRM ($99)",
                        "Multi-seat Team Ops ($36)",
                      ],
                    },
                  ].map((p) => (
                    <div
                      key={p.phase}
                      className="rounded-xl border border-[#eef4f0] bg-[#fbfdfc] p-3.5"
                    >
                      <span className="text-[10px] font-semibold text-[#198754] uppercase">
                        {p.time}
                      </span>
                      <h5 className="text-xs font-bold text-[#0c1510] mt-0.5">
                        {p.phase}
                      </h5>
                      <p className="text-lg font-extrabold text-[#124b32] mt-1">
                        {p.cost}
                      </p>
                      <ul className="mt-2 space-y-1 text-[11px] text-[#4b5e54]">
                        {p.items.map((it) => (
                          <li key={it} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-[#198754] shrink-0" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: COST BREAKDOWN */}
            {activeTab === "Cost Breakdown" && (
              <div className="space-y-3">
                <div className="rounded-xl border border-[#eef4f0] overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f6faf8] text-[#4b5e54] border-b border-[#eef4f0]">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">Category</th>
                        <th className="py-2.5 px-3 font-semibold">
                          Selected Tool
                        </th>
                        <th className="py-2.5 px-3 font-semibold">Buy Phase</th>
                        <th className="py-2.5 px-3 font-semibold text-right">
                          Monthly
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eef4f0]">
                      <tr>
                        <td className="py-2 px-3 font-medium">Development</td>
                        <td className="py-2 px-3">
                          {selectedTools.Frontend} + Cursor Pro
                        </td>
                        <td className="py-2 px-3 text-[#146c43]">Phase 1</td>
                        <td className="py-2 px-3 text-right font-bold">
                          ${devCost}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">Design</td>
                        <td className="py-2 px-3">Figma Pro + UI Kit</td>
                        <td className="py-2 px-3 text-[#146c43]">Phase 1</td>
                        <td className="py-2 px-3 text-right font-bold">
                          ${designCost}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Database &amp; Infra
                        </td>
                        <td className="py-2 px-3">
                          {selectedTools.Backend} + Resend
                        </td>
                        <td className="py-2 px-3 text-[#d97706]">Phase 2</td>
                        <td className="py-2 px-3 text-right font-bold">
                          ${dbInfraCost}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">Marketing</td>
                        <td className="py-2 px-3">PostHog + Launch Email</td>
                        <td className="py-2 px-3 text-[#d97706]">Phase 2</td>
                        <td className="py-2 px-3 text-right font-bold">
                          ${marketingCost}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Other &amp; Payments
                        </td>
                        <td className="py-2 px-3">
                          {selectedTools.Payments} + Domain/Inbox
                        </td>
                        <td className="py-2 px-3 text-[#d97706]">Phase 2</td>
                        <td className="py-2 px-3 text-right font-bold">
                          ${otherCost}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
