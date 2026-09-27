# Buildsy. — Turn Your Idea Into a Clear, Affordable Build Plan

Buildsy helps solo founders and small teams (1–3 people) turn a raw product idea into a concrete, budget-disciplined MVP build plan — before they spend money or time on the wrong tools.

## Core Features

- **Adaptive Personalized Diagnostic**: Asks 5–8 targeted, idea-specific follow-up questions covering technical comfort level, target geography (US `$ USD` vs. India `₹ INR`), budget constraints, and launch timeline.
- **Tiered Tool Stack Recommendations**: Recommends 3 options per category (**Free**, **Low-Cost**, and **Scale**) with real-time budget recalculation when toggling tools via **"Use this"**.
- **Phased Buying Plan**: Breaks spending into **Phase 1 (Prototype)**, **Phase 2 (MVP Launch)**, and **Phase 3 (Scale)**, explicitly listing what to activate now vs. what NOT to buy yet.
- **Total MVP Cost Breakdown**: Interactive SVG Donut Chart and category-level breakdown (`Development`, `Design`, `Database & Infra`, `Marketing`, `Other`), plus one-time launch costs and idea-specific overspend traps.
- **Live Pricing Grounding & Refresh**: Powered by Google Gemini (`gemini-2.5-flash`) with Google Search Grounding (plus a zero-config smart recommendation engine out of the box).
- **1-Click Export**: Export your build plan as Notion-ready Markdown (`.md`), JSON (`.json`), or Print / Save as PDF.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page, or [http://localhost:3000/app](http://localhost:3000/app) to launch the interactive Buildsy Studio.

### Optional Environment Variables

Copy `.env.example` to `.env.local` (or configure directly inside the **Settings** tab in `/app`):

```bash
GEMINI_API_KEY=your_gemini_api_key
```
