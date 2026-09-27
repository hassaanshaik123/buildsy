import {
  AdaptiveQuestion,
  BudgetGroup,
  BuildPlan,
  CurrencyRegion,
  QuestionAnswer,
  ToolCategory,
} from "@/types/buildsy";

export const STARTER_IDEA_TEMPLATES = [
  {
    label: "AI SaaS Micro-Product",
    badge: "Popular",
    idea: "An AI-powered resume & interview coach for software engineers in India and the US that conducts mock voice interviews and gives actionable scorecard feedback.",
  },
  {
    label: "B2B SaaS Feedback Tool",
    badge: "SaaS",
    idea: "A lightweight customer feedback board, changelog, and public roadmap widget that indie SaaS founders can embed into their web app in 2 minutes.",
  },
  {
    label: "Hyperlocal Marketplace",
    badge: "Marketplace",
    idea: "A two-sided neighborhood marketplace connecting verified home chefs with busy professionals for healthy weekly meal subscriptions with UPI & card payments.",
  },
  {
    label: "EdTech Cohort Platform",
    badge: "EdTech",
    idea: "An interactive cohort-based learning platform for design and coding bootcamps with live session scheduling, assignment peer review, and verifiable certificates.",
  },
];

/**
 * Showcase plan that matches the exact mockup figures ($124/mo: Dev $48, Design $30, DB & Infra $28, Marketing $18, Other $10)
 * while also allowing interactive switching between Free, Low-Cost, and Scale tiers.
 */
export const SHOWCASE_BUILD_PLAN: BuildPlan = {
  id: "showcase-mvp-plan",
  title: "SaaS Product & Web MVP Build Plan",
  ideaDescription:
    "A modern SaaS web application for solo founders and small teams with authentication, recurring subscriptions, database storage, and analytics.",
  createdAt: new Date().toISOString(),
  lastPriceCheckAt: new Date().toISOString(),
  sourceMode: "smart-curated-engine",
  region: "USD",
  costBadge: "Low cost MVP",
  summaryNote:
    "Built for a 1–2 person founding team launching in under 6 weeks. Starts lean on generous free tiers for core infrastructure while budgeting sensibly for essential dev velocity, UI polish, and initial launch distribution.",
  answers: [
    {
      questionId: "q1",
      question: "What is your technical comfort level for building this MVP?",
      answer: "Comfortable with code / AI coding assistants (Cursor, Next.js)",
    },
    {
      questionId: "q2",
      question: "Where are your initial target customers located?",
      answer: "United States & India (Global + local payments)",
    },
    {
      questionId: "q3",
      question: "What is your target monthly tool budget during the 3-month MVP phase?",
      answer: "Lean budget ($50–$150/month for high-leverage tools)",
    },
    {
      questionId: "q4",
      question: "How quickly do you want to ship the first usable version?",
      answer: "Within 4–6 weeks",
    },
    {
      questionId: "q5",
      question: "How will you monetize the product initially?",
      answer: "Monthly / Annual SaaS subscriptions",
    },
  ],
  categories: [
    {
      id: "cat-frontend",
      name: "Frontend",
      budgetGroup: "Development",
      description: "Build and deploy your frontend quickly.",
      iconKey: "layout",
      selectedToolId: "tool-nextjs",
      options: [
        {
          id: "tool-nextjs",
          name: "Next.js",
          tier: "free",
          priceDisplay: "Free",
          monthlyCostUSD: 0,
          monthlyCostINR: 0,
          pricingNote: "Open-source React framework; free on Vercel Hobby tier",
          tagline: "Best for MVPs, easy to deploy",
          whyRecommended:
            "Zero license cost, massive ecosystem of UI kits, and built-in API routes so you don't need a separate backend server for your MVP.",
          freeTierLimits: "100GB bandwidth/mo, 100k serverless function invocations on Vercel Hobby",
          whenToUpgrade: "Upgrade to Vercel Pro ($20/mo) when you add team members or exceed 100GB bandwidth.",
          setupDifficulty: "Developer",
          logoKey: "nextjs",
          websiteUrl: "https://nextjs.org",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-webflow",
          name: "Webflow",
          tier: "low-cost",
          priceDisplay: "$18/mo",
          monthlyCostUSD: 18,
          monthlyCostINR: 1500,
          pricingNote: "Basic Site plan billed monthly ($14/mo billed annually)",
          tagline: "No-code option",
          whyRecommended:
            "Ideal if you want visual control over landing pages and CMS without writing frontend code from scratch.",
          freeTierLimits: "Free staging on webflow.io subdomain (2 pages limit)",
          whenToUpgrade: "Pay $18/mo only when connecting your custom domain for public launch.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "webflow",
          websiteUrl: "https://webflow.com",
          buyPhase: "Phase 2 (Launch)",
        },
        {
          id: "tool-framer",
          name: "Framer",
          tier: "scale",
          priceDisplay: "$20/mo",
          monthlyCostUSD: 20,
          monthlyCostINR: 1680,
          pricingNote: "Pro landing site plan with custom domain, staging & analytics",
          tagline: "Design + deploy",
          whyRecommended:
            "Fastest canvas-to-production workflow for design-led founders who want high-converting interactive pages.",
          freeTierLimits: "Free with Framer banner on framer.app subdomain",
          whenToUpgrade: "Upgrade on launch day when removing watermark and adding custom domain.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "framer",
          websiteUrl: "https://framer.com",
          buyPhase: "Phase 2 (Launch)",
        },
      ],
    },
    {
      id: "cat-database",
      name: "Backend / Database",
      budgetGroup: "Database & Infra",
      description: "Scalable and developer friendly.",
      iconKey: "database",
      selectedToolId: "tool-supabase",
      options: [
        {
          id: "tool-supabase",
          name: "Supabase",
          tier: "free",
          priceDisplay: "Free",
          monthlyCostUSD: 0,
          monthlyCostINR: 0,
          pricingNote: "Generous Free Tier with Postgres DB, Auth, Storage & Edge Functions",
          tagline: "Scalable and developer friendly",
          whyRecommended:
            "Replaces 4 separate paid tools (Postgres database, user authentication, file storage, and real-time subscriptions) in one open-source platform.",
          freeTierLimits: "500MB database space, 50,000 monthly active users, 1GB file storage",
          whenToUpgrade: "Upgrade to Pro ($25/mo) when you need daily automated backups or exceed 500MB DB size.",
          setupDifficulty: "Developer",
          logoKey: "supabase",
          websiteUrl: "https://supabase.com",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-firebase",
          name: "Firebase",
          tier: "low-cost",
          priceDisplay: "$25/mo",
          monthlyCostUSD: 25,
          monthlyCostINR: 2100,
          pricingNote: "Blaze pay-as-you-go estimate for active MVP traffic & Cloud Functions",
          tagline: "Google ecosystem",
          whyRecommended:
            "Great for real-time mobile/web sync and seamless Google Cloud & Analytics integration.",
          freeTierLimits: "Spark Plan includes 1GiB Firestore storage & 50k reads/day free",
          whenToUpgrade: "Switch to Blaze plan when integrating external APIs inside Cloud Functions.",
          setupDifficulty: "Moderate (Low-Code)",
          logoKey: "firebase",
          websiteUrl: "https://firebase.google.com",
          buyPhase: "Phase 2 (Launch)",
        },
        {
          id: "tool-mongodb",
          name: "MongoDB",
          tier: "scale",
          priceDisplay: "$57/mo",
          monthlyCostUSD: 57,
          monthlyCostINR: 4790,
          pricingNote: "Dedicated M10 cluster on MongoDB Atlas with auto-scaling",
          tagline: "For complex needs",
          whyRecommended:
            "Best when your product processes unstructured JSON documents at high write throughput.",
          freeTierLimits: "M0 Shared cluster is free up to 512MB storage",
          whenToUpgrade: "Stay on M0 Free until you have paying customers requiring dedicated IOPS.",
          setupDifficulty: "Developer",
          logoKey: "mongodb",
          websiteUrl: "https://mongodb.com",
          buyPhase: "Phase 3 (Scale)",
        },
      ],
    },
    {
      id: "cat-payments",
      name: "Payments",
      budgetGroup: "Other",
      description: "Setup payments and subscriptions.",
      iconKey: "credit-card",
      selectedToolId: "tool-stripe",
      options: [
        {
          id: "tool-stripe",
          name: "Stripe",
          tier: "free",
          priceDisplay: "$0/txn",
          monthlyCostUSD: 0,
          monthlyCostINR: 0,
          pricingNote: "$0 monthly fixed fee (2.9% + 30¢ only when you make a sale)",
          tagline: "Industry standard, easy setup",
          whyRecommended:
            "Zero fixed monthly cost. Hosted Stripe Checkout lets you validate willingness-to-pay in 30 minutes without building custom billing forms.",
          freeTierLimits: "No monthly subscription fee; pay-as-you-earn per transaction",
          whenToUpgrade: "Enable Stripe Tax / Billing automation only after $10k+ MRR.",
          setupDifficulty: "Moderate (Low-Code)",
          logoKey: "stripe",
          websiteUrl: "https://stripe.com",
          buyPhase: "Phase 2 (Launch)",
        },
        {
          id: "tool-razorpay",
          name: "Razorpay",
          tier: "low-cost",
          priceDisplay: "₹149/mo",
          monthlyCostUSD: 2,
          monthlyCostINR: 149,
          pricingNote: "2% per Indian UPI/Card transaction + instant payment links",
          tagline: "Best for India",
          whyRecommended:
            "Essential if selling to Indian users or businesses — supports UPI Autopay, RuPay, Netbanking, and international cards.",
          freeTierLimits: "Zero setup fee; standard 2% platform fee on live transactions",
          whenToUpgrade: "Add Razorpay Route or Subscriptions add-on when scaling recurring plans.",
          setupDifficulty: "Moderate (Low-Code)",
          logoKey: "razorpay",
          websiteUrl: "https://razorpay.com",
          buyPhase: "Phase 2 (Launch)",
        },
        {
          id: "tool-lemonsqueezy",
          name: "LemonSqueezy",
          tier: "scale",
          priceDisplay: "$20/mo",
          monthlyCostUSD: 20,
          monthlyCostINR: 1680,
          pricingNote: "Merchant of Record (5% + 50¢ per txn; handles global VAT/GST automatically)",
          tagline: "For SaaS products",
          whyRecommended:
            "Acts as your Merchant of Record so you don't need to register for tax compliance in 50+ countries as a solo founder.",
          freeTierLimits: "$0 base fee; estimated $20/mo effective email/usage overhead at launch",
          whenToUpgrade: "Use from day 1 of monetization if selling globally without a US LLC.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "lemonsqueezy",
          websiteUrl: "https://lemonsqueezy.com",
          buyPhase: "Phase 2 (Launch)",
        },
      ],
    },
    {
      id: "cat-dev-velocity",
      name: "AI Coding & Hosting",
      budgetGroup: "Development",
      description: "Ship 5x faster as a solo founder without hiring early.",
      iconKey: "code",
      selectedToolId: "tool-cursor-vercel",
      options: [
        {
          id: "tool-vscode-free",
          name: "VS Code + Free Tier AI",
          tier: "free",
          priceDisplay: "Free",
          monthlyCostUSD: 0,
          monthlyCostINR: 0,
          pricingNote: "Free IDE + GitHub Copilot Free (2,000 completions/mo)",
          tagline: "Zero-cost coding setup",
          whyRecommended:
            "Completely free way to write and deploy code if you are on a strict $0 bootstrap budget.",
          freeTierLimits: "2,000 code completions & 50 chat messages per month",
          whenToUpgrade: "Upgrade to a full AI editor when building complex multi-file features.",
          setupDifficulty: "Developer",
          logoKey: "vercel",
          websiteUrl: "https://code.visualstudio.com",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-cursor-vercel",
          name: "Cursor Pro + Vercel Pro",
          tier: "low-cost",
          priceDisplay: "$48/mo",
          monthlyCostUSD: 48,
          monthlyCostINR: 4030,
          pricingNote: "Cursor Pro ($20/mo) + Vercel Pro ($20/mo) + GitHub/CI ($8/mo)",
          tagline: "Highest-leverage solo builder stack",
          whyRecommended:
            "The single highest-ROI spend for a solo founder: Cursor Pro acts as a senior pair programmer while Vercel handles zero-downtime preview & production deploys.",
          freeTierLimits: "14-day trial on Cursor; free Hobby tier on Vercel before custom commercial launch",
          whenToUpgrade: "Start on Free Hobby in Week 1, upgrade to Pro ($48/mo combined) when shipping daily.",
          setupDifficulty: "Developer",
          logoKey: "vercel",
          websiteUrl: "https://cursor.com",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-aws-scale",
          name: "AWS Amplify + Claude Max",
          tier: "scale",
          priceDisplay: "$120/mo",
          monthlyCostUSD: 120,
          monthlyCostINR: 10080,
          pricingNote: "Heavy AI agent usage + dedicated cloud pipelines",
          tagline: "High-throughput engineering",
          whyRecommended:
            "For full-time technical founders running autonomous coding agents and multi-region cloud environments.",
          freeTierLimits: "AWS Free Tier credits available for new startups",
          whenToUpgrade: "Only needed if your daily token velocity exceeds standard Pro plans.",
          setupDifficulty: "Developer",
          logoKey: "aws",
          websiteUrl: "https://aws.amazon.com",
          buyPhase: "Phase 3 (Scale)",
        },
      ],
    },
    {
      id: "cat-design",
      name: "Design & UI System",
      budgetGroup: "Design",
      description: "Design wireframes, UI components, and brand assets.",
      iconKey: "palette",
      selectedToolId: "tool-figma-pro",
      options: [
        {
          id: "tool-figma-starter",
          name: "Figma Starter + shadcn/ui",
          tier: "free",
          priceDisplay: "Free",
          monthlyCostUSD: 0,
          monthlyCostINR: 0,
          pricingNote: "Free for up to 3 Figma files + open-source React components",
          tagline: "Free design & component kit",
          whyRecommended:
            "Covers 100% of early wireframing needs and gives you accessible, production-ready UI components at $0.",
          freeTierLimits: "3 collaborative design files, unlimited personal drafts",
          whenToUpgrade: "Upgrade only if you need shared team component libraries or Dev Mode.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "figma",
          websiteUrl: "https://figma.com",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-figma-pro",
          name: "Figma Pro + Tailwind UI",
          tier: "low-cost",
          priceDisplay: "$30/mo",
          monthlyCostUSD: 30,
          monthlyCostINR: 2520,
          pricingNote: "Figma Professional ($15/mo) + premium UI blocks ($15/mo amortized)",
          tagline: "Polished, credible UI fast",
          whyRecommended:
            "Lets you ship a product that looks like a funded startup without hiring a $3,000/mo designer.",
          freeTierLimits: "Free starter plan available for initial wireframes",
          whenToUpgrade: "Subscribe during Phase 1 UI buildout; pause once core design system is locked.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "figma",
          websiteUrl: "https://figma.com",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-design-scale",
          name: "Figma Org + LottieFiles",
          tier: "scale",
          priceDisplay: "$75/mo",
          monthlyCostUSD: 75,
          monthlyCostINR: 6300,
          pricingNote: "Multi-seat design system + custom interactive motion assets",
          tagline: "Full design studio stack",
          whyRecommended:
            "Best once you bring on a dedicated product designer or freelance brand studio.",
          freeTierLimits: "Basic static exports are free",
          whenToUpgrade: "Phase 3 when hiring your first product designer.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "figma",
          websiteUrl: "https://figma.com",
          buyPhase: "Phase 3 (Scale)",
        },
      ],
    },
    {
      id: "cat-infra",
      name: "Cloud, Email & Monitoring",
      budgetGroup: "Database & Infra",
      description: "Transactional emails, queues, backups, and error tracking.",
      iconKey: "server",
      selectedToolId: "tool-infra-lean",
      options: [
        {
          id: "tool-infra-free",
          name: "Resend Free + Sentry Dev",
          tier: "free",
          priceDisplay: "Free",
          monthlyCostUSD: 0,
          monthlyCostINR: 0,
          pricingNote: "3,000 emails/mo free on Resend + 5k error events/mo on Sentry",
          tagline: "Free transactional stack",
          whyRecommended:
            "More than enough for your first 200 beta users without spending a rupee or dollar.",
          freeTierLimits: "100 emails/day limit on Resend Free; 1 custom domain",
          whenToUpgrade: "Upgrade when sending onboarding drips to >100 signups/day.",
          setupDifficulty: "Developer",
          logoKey: "cloudflare",
          websiteUrl: "https://resend.com",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-infra-lean",
          name: "Resend Pro + Upstash Redis",
          tier: "low-cost",
          priceDisplay: "$28/mo",
          monthlyCostUSD: 28,
          monthlyCostINR: 2350,
          pricingNote: "Resend Pro ($20/mo for 50k emails) + Upstash Rate Limiting & Backups ($8/mo)",
          tagline: "Reliable production infra",
          whyRecommended:
            "Removes daily email caps on launch day, adds unlimited domains, and protects your API routes against abuse/bots.",
          freeTierLimits: "Free tier available during local development",
          whenToUpgrade: "Turn on in Phase 2 right before Product Hunt / public launch.",
          setupDifficulty: "Developer",
          logoKey: "cloudflare",
          websiteUrl: "https://resend.com",
          buyPhase: "Phase 2 (Launch)",
        },
        {
          id: "tool-infra-scale",
          name: "AWS SES + Datadog + Cloudflare Pro",
          tier: "scale",
          priceDisplay: "$85/mo",
          monthlyCostUSD: 85,
          monthlyCostINR: 7140,
          pricingNote: "WAF protection, full APM observability, and high-volume email",
          tagline: "Enterprise-grade reliability",
          whyRecommended:
            "Full observability and DDoS mitigation once you have steady revenue and strict SLA expectations.",
          freeTierLimits: "Cloudflare DNS and basic proxy are free forever",
          whenToUpgrade: "Phase 3 after reaching $5k+ MRR.",
          setupDifficulty: "Developer",
          logoKey: "aws",
          websiteUrl: "https://cloudflare.com",
          buyPhase: "Phase 3 (Scale)",
        },
      ],
    },
    {
      id: "cat-marketing",
      name: "Marketing & Analytics",
      budgetGroup: "Marketing",
      description: "Product analytics, session replays, and launch email capture.",
      iconKey: "megaphone",
      selectedToolId: "tool-marketing-lean",
      options: [
        {
          id: "tool-posthog-free",
          name: "PostHog Free",
          tier: "free",
          priceDisplay: "Free",
          monthlyCostUSD: 0,
          monthlyCostINR: 0,
          pricingNote: "1M events/mo + 5,000 session recordings/mo completely free",
          tagline: "Best free product analytics",
          whyRecommended:
            "Gives you funnels, retention charts, feature flags, and session replays for $0 — never pay for Mixpanel or Hotjar early on.",
          freeTierLimits: "1 million events & 5,000 session replays every month free",
          whenToUpgrade: "Almost never during MVP — free tier easily covers your first 5,000 users.",
          setupDifficulty: "Moderate (Low-Code)",
          logoKey: "posthog",
          websiteUrl: "https://posthog.com",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-marketing-lean",
          name: "PostHog + Plausible / Beehiiv",
          tier: "low-cost",
          priceDisplay: "$18/mo",
          monthlyCostUSD: 18,
          monthlyCostINR: 1510,
          pricingNote: "Lightweight privacy web analytics + waitlist & launch newsletter automation",
          tagline: "Launch growth & attribution",
          whyRecommended:
            "Tracks which launch channels (X, Reddit, Product Hunt, LinkedIn) actually convert visitors into signups.",
          freeTierLimits: "PostHog core is free; $18/mo covers attribution & launch outreach tooling",
          whenToUpgrade: "Activate 2 weeks before public launch to capture and convert waitlist leads.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "posthog",
          websiteUrl: "https://posthog.com",
          buyPhase: "Phase 2 (Launch)",
        },
        {
          id: "tool-marketing-scale",
          name: "Customer.io + Ahrefs Starter",
          tier: "scale",
          priceDisplay: "$99/mo",
          monthlyCostUSD: 99,
          monthlyCostINR: 8300,
          pricingNote: "Behavioral lifecycle automation + SEO keyword & backlink tracking",
          tagline: "Full growth engine",
          whyRecommended:
            "Automates onboarding nudges and scales organic search traffic once your core retention is proven.",
          freeTierLimits: "Ahrefs Webmaster Tools is free for your own verified domain",
          whenToUpgrade: "Wait until Phase 3 when you have at least 500 active users.",
          setupDifficulty: "Moderate (Low-Code)",
          logoKey: "posthog",
          websiteUrl: "https://customer.io",
          buyPhase: "Phase 3 (Scale)",
        },
      ],
    },
    {
      id: "cat-other",
      name: "Domain, Workspace & Ops",
      budgetGroup: "Other",
      description: "Custom domain, founder workspace, issue tracking, and docs.",
      iconKey: "briefcase",
      selectedToolId: "tool-ops-lean",
      options: [
        {
          id: "tool-ops-free",
          name: "Notion Free + Linear Free",
          tier: "free",
          priceDisplay: "Free",
          monthlyCostUSD: 0,
          monthlyCostINR: 0,
          pricingNote: "$0/mo for personal Notion docs, Linear issue tracking, and Zoho Mail Free",
          tagline: "Zero-cost founder ops",
          whyRecommended:
            "Notion and Linear both offer generous free plans for small teams; pair with Zoho Mail Free for custom domain email at $0/mo.",
          freeTierLimits: "Unlimited pages for individuals in Notion; 250 active issues in Linear",
          whenToUpgrade: "Upgrade only when adding external contractors or exceeding 10 team members.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "notion",
          websiteUrl: "https://notion.so",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-ops-lean",
          name: "Google Workspace + Cloudflare Domain",
          tier: "low-cost",
          priceDisplay: "$10/mo",
          monthlyCostUSD: 10,
          monthlyCostINR: 840,
          pricingNote: "Google Workspace Business Starter ($7/mo) + at-cost .com domain (~$3/mo amortized)",
          tagline: "Professional founder setup",
          whyRecommended:
            "Avoids GoDaddy renewal markups by buying your domain at wholesale cost on Cloudflare Registrar + professional founder@yourdomain.com email.",
          freeTierLimits: "Cloudflare DNS and email routing forwarding are free",
          whenToUpgrade: "Purchase domain and 1 inbox right before sharing links publicly.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "notion",
          websiteUrl: "https://workspace.google.com",
          buyPhase: "Phase 2 (Launch)",
        },
        {
          id: "tool-ops-scale",
          name: "Notion Plus + Linear Basic + Slack Pro",
          tier: "scale",
          priceDisplay: "$36/mo",
          monthlyCostUSD: 36,
          monthlyCostINR: 3020,
          pricingNote: "Paid team seats across docs, roadmap, and Slack history",
          tagline: "Multi-person team workspace",
          whyRecommended:
            "Unlocks unlimited file uploads, guest permissions, and full message history for a growing 3+ person team.",
          freeTierLimits: "90-day message history on Slack Free",
          whenToUpgrade: "Never pay for Slack Pro or Notion Plus as a solo founder — wait until you hire.",
          setupDifficulty: "Easy (No-Code)",
          logoKey: "linear",
          websiteUrl: "https://linear.app",
          buyPhase: "Phase 3 (Scale)",
        },
      ],
    },
  ],
  phases: [
    {
      id: "phase-1",
      phaseNumber: 1,
      title: "Phase 1: Build & Prototype (Weeks 1–4)",
      subtitle: "Build the core product loop locally and on free staging environments.",
      milestoneTrigger: "0 users — validating core workflow & UI prototype",
      monthlySpendUSD: 78,
      monthlySpendINR: 6550,
      whatToBuyNow: [
        {
          toolName: "Next.js + Supabase (Free Tiers)",
          category: "Frontend & Database",
          costDisplay: "$0/mo",
          actionNote: "Use Vercel Hobby & Supabase Free tier (500MB DB + 50k MAU included).",
        },
        {
          toolName: "Cursor Pro + Dev Tooling",
          category: "Development",
          costDisplay: "$48/mo",
          actionNote: "Invest in build speed so one founder can ship a full-stack app in weeks.",
        },
        {
          toolName: "Figma Pro + UI Kit",
          category: "Design",
          costDisplay: "$30/mo",
          actionNote: "Lock in high-trust UI screens and component library early.",
        },
      ],
      whatToWaitOn: [
        {
          item: "Paid Database Clusters (Supabase Pro / MongoDB M10)",
          reasonToWait: "You have 0 production users in Weeks 1–4. Free Postgres handles 10,000+ rows effortlessly.",
          savedAmountUSD: 57,
        },
        {
          item: "Paid Analytics (Mixpanel / Amplitude / Hotjar)",
          reasonToWait: "PostHog's free tier gives you 1M events and 5,000 session replays per month for $0.",
          savedAmountUSD: 49,
        },
        {
          item: "Slack Pro / Notion Plus / Linear Paid",
          reasonToWait: "Solo founders and 2-person teams never hit the collaboration limits of free tiers.",
          savedAmountUSD: 36,
        },
      ],
    },
    {
      id: "phase-2",
      phaseNumber: 2,
      title: "Phase 2: Public Launch & First 100 Users (Months 2–3)",
      subtitle: "Connect custom domain, remove email sandbox limits, and start collecting payments.",
      milestoneTrigger: "Ready to onboard beta users and collect first dollar/rupee",
      monthlySpendUSD: 124,
      monthlySpendINR: 10410,
      whatToBuyNow: [
        {
          toolName: "Resend Pro + Upstash Redis",
          category: "Database & Infra",
          costDisplay: "$28/mo",
          actionNote: "Remove the 100/day email cap so launch day signups receive magic links & welcome emails.",
        },
        {
          toolName: "Launch Analytics & Newsletter",
          category: "Marketing",
          costDisplay: "$18/mo",
          actionNote: "Track conversion rates from launch posts and nurture waitlist leads.",
        },
        {
          toolName: "Cloudflare Domain + Google Workspace",
          category: "Other",
          costDisplay: "$10/mo",
          actionNote: "Set up your custom domain and founder@ inbox for customer trust and Stripe verification.",
        },
        {
          toolName: "Stripe / Razorpay Live Mode",
          category: "Payments",
          costDisplay: "$0/mo base",
          actionNote: "Complete KYC 7 days before launch so payouts aren't delayed.",
        },
      ],
      whatToWaitOn: [
        {
          item: "SOC-2 Compliance Tools (Vanta / Drata)",
          reasonToWait: "Costs $3,000+/yr. Wait until an enterprise prospect explicitly signs an LOI requiring it.",
          savedAmountUSD: 250,
        },
        {
          item: "Paid Ads (Google / Meta Ads) before organic validation",
          reasonToWait: "Validate onboarding conversion with direct outreach & community launches first.",
          savedAmountUSD: 300,
        },
      ],
    },
    {
      id: "phase-3",
      phaseNumber: 3,
      title: "Phase 3: Early Traction & Scale (Month 4+ / $2k+ MRR)",
      subtitle: "Upgrade infrastructure only after revenue pays for the stack.",
      milestoneTrigger: "500+ active users or $2,000+ monthly recurring revenue",
      monthlySpendUSD: 245,
      monthlySpendINR: 20580,
      whatToBuyNow: [
        {
          toolName: "Supabase Pro Tier",
          category: "Backend / Database",
          costDisplay: "$25/mo",
          actionNote: "Enable daily automated point-in-time DB backups and remove 7-day inactivity pausing.",
        },
        {
          toolName: "Customer.io / Lifecycle Automation",
          category: "Marketing",
          costDisplay: "$99/mo",
          actionNote: "Automate trial-to-paid upgrade sequences based on in-app events.",
        },
      ],
      whatToWaitOn: [
        {
          item: "Custom Kubernetes / DevOps Contractors",
          reasonToWait: "Managed serverless on Vercel + Supabase easily scales past 50,000 users without DevOps.",
          savedAmountUSD: 800,
        },
      ],
    },
  ],
  overspendTraps: [
    {
      title: "Buying Annual SaaS Plans Before Product-Market Fit",
      mistake:
        "Founders often buy 1-year annual plans for Webflow, Notion, CRM, and SEO tools on Day 1 to get a '20% discount', locking up $800+ on tools they abandon 6 weeks later.",
      smartAlternative:
        "Stay strictly on Free tiers during Phase 1, and pay monthly for the first 3 months even if monthly billing is 15% higher.",
      estimatedSavingsUSD: 640,
    },
    {
      title: "Paying for Auth0 or Clerk Pro Early",
      mistake:
        "Subscribing to standalone authentication platforms at $25–$35/mo when your database already includes production-ready auth.",
      smartAlternative:
        "Use Supabase Auth (free up to 50,000 monthly active users) or NextAuth/BetterAuth (open source, $0).",
      estimatedSavingsUSD: 105,
    },
    {
      title: "Overpaying for Domain & Email Bundles on GoDaddy",
      mistake:
        "Buying a domain with privacy protection, SSL add-ons, and email bundles that jump to $180/year upon renewal.",
      smartAlternative:
        "Buy your domain at wholesale cost (~$10.44/yr) on Cloudflare Registrar (free SSL + free WHOIS privacy + free email routing).",
      estimatedSavingsUSD: 140,
    },
  ],
  oneTimeCosts: [
    {
      id: "otc-domain",
      name: "Custom Domain Registration (.com or .in for 1 Year)",
      costUSD: 11,
      costINR: 899,
      phase: "Phase 2 (Launch)",
      optional: false,
      included: true,
      note: "Purchase via Cloudflare or Porkbun at wholesale cost.",
    },
    {
      id: "otc-playstore",
      name: "Google Play Developer Account (One-time)",
      costUSD: 25,
      costINR: 2100,
      phase: "Phase 2 (Launch)",
      optional: true,
      included: false,
      note: "Only needed if shipping an Android app on the Play Store.",
    },
    {
      id: "otc-appstore",
      name: "Apple Developer Program (Annual)",
      costUSD: 99,
      costINR: 8300,
      phase: "Phase 2 (Launch)",
      optional: true,
      included: false,
      note: "Wait until your web/PWA version has validated user demand.",
    },
  ],
};

/**
 * Dynamically computes the budget breakdown of any BuildPlan based on the currently selected tools
 * across categories (`selectedToolId`).
 */
export function calculatePlanBudget(plan: BuildPlan) {
  const breakdown: Record<BudgetGroup, { usd: number; inr: number }> = {
    Development: { usd: 0, inr: 0 },
    Design: { usd: 0, inr: 0 },
    "Database & Infra": { usd: 0, inr: 0 },
    Marketing: { usd: 0, inr: 0 },
    Other: { usd: 0, inr: 0 },
  };

  let monthlyTotalUSD = 0;
  let monthlyTotalINR = 0;
  let scaleTierMonthlyUSD = 0;
  let scaleTierMonthlyINR = 0;
  let phase1MonthlyUSD = 0;
  let phase1MonthlyINR = 0;

  for (const cat of plan.categories) {
    const selected =
      cat.options.find((o) => o.id === cat.selectedToolId) || cat.options[0];
    const scaleOption =
      cat.options.find((o) => o.tier === "scale") ||
      cat.options[cat.options.length - 1];

    if (selected) {
      breakdown[cat.budgetGroup].usd += selected.monthlyCostUSD;
      breakdown[cat.budgetGroup].inr += selected.monthlyCostINR;
      monthlyTotalUSD += selected.monthlyCostUSD;
      monthlyTotalINR += selected.monthlyCostINR;

      if (selected.buyPhase === "Phase 1 (Day 1)") {
        phase1MonthlyUSD += selected.monthlyCostUSD;
        phase1MonthlyINR += selected.monthlyCostINR;
      }
    }

    if (scaleOption) {
      scaleTierMonthlyUSD += scaleOption.monthlyCostUSD;
      scaleTierMonthlyINR += scaleOption.monthlyCostINR;
    }
  }

  const oneTimeTotalUSD = (plan.oneTimeCosts || [])
    .filter((c) => c.included)
    .reduce((acc, c) => acc + c.costUSD, 0);
  const oneTimeTotalINR = (plan.oneTimeCosts || [])
    .filter((c) => c.included)
    .reduce((acc, c) => acc + c.costINR, 0);

  // 3-month MVP calculation: Month 1 is Phase 1 spend, Months 2 & 3 are full MVP Launch spend + one-time costs
  const threeMonthTotalUSD =
    phase1MonthlyUSD + monthlyTotalUSD * 2 + oneTimeTotalUSD;
  const threeMonthTotalINR =
    phase1MonthlyINR + monthlyTotalINR * 2 + oneTimeTotalINR;

  const threeMonthUpfrontScaleUSD = scaleTierMonthlyUSD * 3 + 250;
  const savedThreeMonthsUSD = Math.max(
    0,
    threeMonthUpfrontScaleUSD - threeMonthTotalUSD
  );
  const savedThreeMonthsINR = savedThreeMonthsUSD * 84;

  let dynamicBadge = "Low cost MVP";
  if (monthlyTotalUSD === 0) {
    dynamicBadge = "Zero-cost Bootstrap ($0/mo)";
  } else if (monthlyTotalUSD <= 60) {
    dynamicBadge = "Ultra-lean MVP";
  } else if (monthlyTotalUSD <= 150) {
    dynamicBadge = "Low cost MVP";
  } else {
    dynamicBadge = "Scale-ready Stack";
  }

  return {
    monthlyTotalUSD,
    monthlyTotalINR,
    phase1MonthlyUSD,
    phase1MonthlyINR,
    threeMonthTotalUSD,
    threeMonthTotalINR,
    oneTimeTotalUSD,
    oneTimeTotalINR,
    scaleTierMonthlyUSD,
    scaleTierMonthlyINR,
    savedThreeMonthsUSD,
    savedThreeMonthsINR,
    dynamicBadge,
    breakdown,
  };
}

/**
 * Generates 6 sharp, idea-specific follow-up questions when running in smart fallback mode
 */
export function generateAdaptiveQuestionsFallback(
  idea: string
): AdaptiveQuestion[] {
  const lower = idea.toLowerCase();
  const isAI =
    lower.includes("ai") ||
    lower.includes("gpt") ||
    lower.includes("agent") ||
    lower.includes("llm") ||
    lower.includes("voice") ||
    lower.includes("chat") ||
    lower.includes("coach") ||
    lower.includes("resume");
  const isMobile =
    lower.includes("mobile") ||
    lower.includes("ios") ||
    lower.includes("android") ||
    lower.includes("app") ||
    lower.includes("delivery");
  const isMarketplace =
    lower.includes("marketplace") ||
    lower.includes("connect") ||
    lower.includes("two-sided") ||
    lower.includes("booking") ||
    lower.includes("chefs") ||
    lower.includes("tutors");

  const questions: AdaptiveQuestion[] = [
    {
      id: "q-skill",
      question:
        "How will you build the product, and what is your technical comfort level?",
      whyWeAsk:
        "Determines whether we recommend code-first frameworks (Next.js/Supabase), AI-assisted coding tools (Cursor), or pure no-code builders (Bubble/Softr/FlutterFlow).",
      category: "technical_skill",
      options: [
        "Non-technical founder — I need No-Code / visual builders",
        "Semi-technical — I use AI coding tools (Cursor, Lovable, v0) with templates",
        "Full-stack developer — I write code and want the fastest modern dev stack",
        "Small 2–3 person team with mixed design & coding skills",
      ],
      allowCustom: true,
    },
    {
      id: "q-market",
      question:
        "Where are your primary target users located, and how will they pay you?",
      whyWeAsk:
        "Payment gateways, compliance, and pricing tiers differ drastically between India (UPI/Razorpay) and the US/Global market (Stripe/LemonSqueezy).",
      category: "region_compliance",
      options: [
        "India first — need UPI, RuPay, Netbanking & INR pricing (Razorpay/Cashfree)",
        "US & Global — need USD cards, Apple Pay & automated global tax (Stripe/LemonSqueezy)",
        "Both India & US/Global — hybrid setup supporting local UPI + international SaaS billing",
        "Free during MVP — focusing purely on user adoption before turning on payments",
      ],
      allowCustom: true,
    },
    {
      id: "q-budget",
      question:
        "What is your strict monthly tool budget for the initial 3-month MVP build?",
      whyWeAsk:
        "Helps us lock your default stack to $0 free tiers or allocate a high-leverage budget only where it saves weeks of work.",
      category: "budget",
      options: [
        "Strict $0–$20/mo (₹0–₹1,600/mo) — Bootstrap strictly on free tiers",
        "Lean $50–$150/mo (₹4,000–₹12,500/mo) — Pay only for tools that save 10+ hours/week",
        "Growth $150–$300/mo (₹12,500–₹25,000/mo) — Ready for managed pro tiers & polish",
      ],
      allowCustom: true,
    },
    {
      id: "q-platform",
      question: isMobile
        ? "Do you genuinely need a native iOS/Android app on Day 1, or can you validate with a mobile-responsive web app first?"
        : "What is the primary interface your first 100 users will interact with?",
      whyWeAsk:
        "Skipping Apple ($99/yr) & Google Play ($25) store review cycles during Month 1 often saves 3+ weeks and hundreds of dollars.",
      category: "scale_features",
      options: [
        "Responsive Web App (PWA) — works on mobile & desktop browsers immediately",
        "Cross-platform Mobile App (React Native / Expo / FlutterFlow)",
        "Desktop-first SaaS Dashboard + Chrome Extension / Embed Widget",
        "High-converting Landing Page + Waitlist & Concierge MVP backend",
      ],
      allowCustom: true,
    },
    {
      id: "q-core-complexity",
      question: isAI
        ? "What kind of AI capabilities are core to your MVP's value?"
        : isMarketplace
        ? "What is the hardest operational part of your marketplace MVP?"
        : "Which technical capability is most critical to your MVP's core loop?",
      whyWeAsk:
        "Ensures we budget accurately for usage-based APIs (LLM tokens, video/voice streaming, or split payouts) and avoid unnecessary add-ons.",
      category: "scale_features",
      options: isAI
        ? [
            "Text generation, structured analysis & chat (Gemini Flash / GPT-4o-mini)",
            "Real-time voice, audio transcription, or video analysis (Whisper / Deepgram / ElevenLabs)",
            "RAG over user PDFs/documents with vector search (Supabase pgvector)",
            "Lightweight background AI automations & workflows",
          ]
        : isMarketplace
        ? [
            "Two-sided profiles, search/filtering & instant booking calendar",
            "Split payments, escrow & automated vendor payouts",
            "Location-based discovery, maps & WhatsApp/SMS notifications",
            "Manual concierge matching first, automated platform second",
          ]
        : [
            "Real-time collaboration, database CRUD & clean role-based auth",
            "Automated email/WhatsApp notifications & scheduled cron jobs",
            "File uploads, media processing, or PDF generation",
            "Analytics dashboards, reporting & third-party integrations",
          ],
      allowCustom: true,
    },
    {
      id: "q-timeline",
      question:
        "What is your target timeline to put this MVP in front of real users?",
      whyWeAsk:
        "Calibrates your Phased Buying Plan so you don't buy Phase 2 launch tools while still in Phase 1 prototyping.",
      category: "timeline",
      options: [
        "Weekend / 2-week sprint — need extreme speed and pre-built blocks",
        "4 to 6 weeks — balanced custom build with clean architecture",
        "2 to 3 months — building nights & weekends alongside a day job",
      ],
      allowCustom: true,
    },
  ];

  return questions;
}

/**
 * Generates a customized BuildPlan tailored to the user's idea and answers when no external API key is used
 */
export function generateTailoredPlanFallback(
  idea: string,
  answers: QuestionAnswer[],
  region: CurrencyRegion
): BuildPlan {
  const combinedText = `${idea} ${answers
    .map((a) => `${a.question} ${a.answer}`)
    .join(" ")}`.toLowerCase();

  const isNoCode =
    combinedText.includes("no-code") ||
    combinedText.includes("non-technical") ||
    combinedText.includes("visual");
  const isStrictZeroBudget =
    combinedText.includes("$0") ||
    combinedText.includes("strict") ||
    combinedText.includes("bootstrap");
  const isIndiaFocused =
    region === "INR" ||
    combinedText.includes("india") ||
    combinedText.includes("upi") ||
    combinedText.includes("razorpay") ||
    combinedText.includes("inr");
  const isAI =
    combinedText.includes("ai") ||
    combinedText.includes("llm") ||
    combinedText.includes("gpt") ||
    combinedText.includes("gemini") ||
    combinedText.includes("voice") ||
    combinedText.includes("resume") ||
    combinedText.includes("interview");

  // Clone base showcase plan and tailor it deeply
  const baseCategories: ToolCategory[] = JSON.parse(
    JSON.stringify(SHOWCASE_BUILD_PLAN.categories)
  );

  // Adjust selections based on user's budget & skill answers
  for (const cat of baseCategories) {
    if (isStrictZeroBudget) {
      const freeOpt = cat.options.find((o) => o.tier === "free");
      if (freeOpt) cat.selectedToolId = freeOpt.id;
    } else if (cat.id === "cat-frontend" && isNoCode) {
      cat.selectedToolId = "tool-webflow";
    } else if (cat.id === "cat-payments" && isIndiaFocused) {
      cat.selectedToolId = "tool-razorpay";
    }
  }

  // If the idea involves AI, inject a dedicated AI & LLM APIs category
  if (isAI) {
    baseCategories.splice(2, 0, {
      id: "cat-ai-apis",
      name: "AI Models & Inference",
      budgetGroup: "Development",
      description: "LLM reasoning, structured outputs, embeddings, and voice/text AI.",
      iconKey: "sparkles",
      selectedToolId: isStrictZeroBudget ? "tool-gemini-free" : "tool-gemini-paid",
      options: [
        {
          id: "tool-gemini-free",
          name: "Google Gemini 2.5 Flash (Free Tier)",
          tier: "free",
          priceDisplay: "Free",
          monthlyCostUSD: 0,
          monthlyCostINR: 0,
          pricingNote: "Free tier in Google AI Studio with generous RPM/RPD limits",
          tagline: "Best free multimodal LLM API",
          whyRecommended:
            "Lets you build, test, and onboard your first beta users with multimodal AI and structured JSON outputs at $0 API cost.",
          freeTierLimits: "Free rate-limited requests via Google AI Studio API key",
          whenToUpgrade: "Switch to pay-as-you-go billing before public launch so requests aren't rate-limited.",
          setupDifficulty: "Developer",
          logoKey: "gemini",
          websiteUrl: "https://aistudio.google.com",
          buyPhase: "Phase 1 (Day 1)",
        },
        {
          id: "tool-gemini-paid",
          name: "Gemini Flash + OpenAI API Credits",
          tier: "low-cost",
          priceDisplay: "$15/mo",
          monthlyCostUSD: 15,
          monthlyCostINR: 1260,
          pricingNote: "Pay-as-you-go usage (~50M tokens/mo on Flash models)",
          tagline: "Production AI inference",
          whyRecommended:
            "Using Flash-class models instead of flagship heavy models cuts your AI unit economics by 90% while keeping sub-second latency.",
          freeTierLimits: "Pay only for exact tokens consumed",
          whenToUpgrade: "Add prompt caching and batch API calls when token spend exceeds $50/mo.",
          setupDifficulty: "Developer",
          logoKey: "openai",
          websiteUrl: "https://ai.google.dev",
          buyPhase: "Phase 2 (Launch)",
        },
        {
          id: "tool-ai-scale",
          name: "Anthropic Claude + ElevenLabs / Deepgram",
          tier: "scale",
          priceDisplay: "$65/mo",
          monthlyCostUSD: 65,
          monthlyCostINR: 5460,
          pricingNote: "Premium reasoning + real-time voice synthesis & transcription",
          tagline: "Multi-model + voice stack",
          whyRecommended:
            "Ideal when your product charges $29+/mo per user and requires lifelike voice or deep document reasoning.",
          freeTierLimits: "$5–$10 free starter credits on signup",
          whenToUpgrade: "Wait until Phase 3 or gate voice features behind paid user plans.",
          setupDifficulty: "Developer",
          logoKey: "openai",
          websiteUrl: "https://anthropic.com",
          buyPhase: "Phase 3 (Scale)",
        },
      ],
    });
  }

  // Generate clean plan title from idea
  const words = idea.trim().split(/\s+/).slice(0, 6).join(" ");
  const cleanTitle =
    words.length > 10
      ? `${words.replace(/[.,!?]+$/, "")}... — MVP Plan`
      : "Custom Product MVP Build Plan";

  const plan: BuildPlan = {
    ...SHOWCASE_BUILD_PLAN,
    id: `plan-${Date.now()}`,
    title: cleanTitle,
    ideaDescription: idea,
    createdAt: new Date().toISOString(),
    lastPriceCheckAt: new Date().toISOString(),
    sourceMode: "smart-curated-engine",
    region,
    summaryNote: `Tailored for your idea ("${idea.slice(
      0,
      90
    )}${idea.length > 90 ? "..." : ""}"). Prioritizes ${
      isStrictZeroBudget
        ? "strictly $0 free tiers for Day 1 validation"
        : isNoCode
        ? "fast visual/no-code shipping with minimal recurring overhead"
        : "a high-velocity solo founder stack with strict phased spending"
    }.`,
    answers,
    categories: baseCategories,
  };

  const budget = calculatePlanBudget(plan);
  plan.costBadge = budget.dynamicBadge;

  return plan;
}
