export type CurrencyRegion = "USD" | "INR";

export type BudgetGroup =
  | "Development"
  | "Design"
  | "Database & Infra"
  | "Marketing"
  | "Other";

export interface AdaptiveQuestion {
  id: string;
  question: string;
  whyWeAsk: string;
  category:
    | "target_user"
    | "technical_skill"
    | "budget"
    | "timeline"
    | "scale_features"
    | "monetization"
    | "region_compliance";
  options: string[];
  allowCustom?: boolean;
}

export interface QuestionAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export type ToolTier = "free" | "low-cost" | "scale";

export interface ToolOption {
  id: string;
  name: string;
  tier: ToolTier;
  priceDisplay: string;
  monthlyCostUSD: number;
  monthlyCostINR: number;
  pricingNote: string;
  tagline: string;
  whyRecommended: string;
  freeTierLimits: string;
  whenToUpgrade: string;
  setupDifficulty: "Easy (No-Code)" | "Moderate (Low-Code)" | "Developer";
  logoKey: string;
  websiteUrl: string;
  buyPhase: "Phase 1 (Day 1)" | "Phase 2 (Launch)" | "Phase 3 (Scale)";
}

export interface ToolCategory {
  id: string;
  name: string;
  budgetGroup: BudgetGroup;
  description: string;
  iconKey: string;
  selectedToolId: string;
  options: ToolOption[];
}

export interface BuyingPhase {
  id: string;
  phaseNumber: 1 | 2 | 3;
  title: string;
  subtitle: string;
  milestoneTrigger: string;
  monthlySpendUSD: number;
  monthlySpendINR: number;
  whatToBuyNow: {
    toolName: string;
    category: string;
    costDisplay: string;
    actionNote: string;
  }[];
  whatToWaitOn: {
    item: string;
    reasonToWait: string;
    savedAmountUSD: number;
  }[];
}

export interface OverspendTrap {
  title: string;
  mistake: string;
  smartAlternative: string;
  estimatedSavingsUSD: number;
}

export interface OneTimeCost {
  id: string;
  name: string;
  costUSD: number;
  costINR: number;
  phase: "Phase 1 (Day 1)" | "Phase 2 (Launch)" | "Phase 3 (Scale)";
  optional: boolean;
  included: boolean;
  note: string;
}

export interface BuildPlan {
  id: string;
  title: string;
  ideaDescription: string;
  createdAt: string;
  lastPriceCheckAt: string;
  sourceMode: "live-gemini-search" | "smart-curated-engine";
  groundingSources?: { title: string; url: string }[];
  region: CurrencyRegion;
  costBadge: string;
  summaryNote: string;
  answers: QuestionAnswer[];
  categories: ToolCategory[];
  phases: BuyingPhase[];
  overspendTraps: OverspendTrap[];
  oneTimeCosts: OneTimeCost[];
}

export interface SavedToolItem {
  id: string;
  tool: ToolOption;
  categoryName: string;
  savedAt: string;
  planTitle?: string;
}

export interface UserSettings {
  preferredRegion: CurrencyRegion;
  geminiApiKey?: string;
  founderName?: string;
  defaultSkillLevel?: string;
}
