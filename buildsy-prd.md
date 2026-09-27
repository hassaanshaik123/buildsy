# Buildsy — Product Requirements Document

## 1. Overview
Buildsy is a platform that helps solo founders and small teams turn a raw product idea into a concrete, budget-disciplined build plan — before they spend money or time on the wrong tools.

## 2. Problem Statement
Solo founders and small teams waste significant time and money in the early stages of building a product because:
- They don't know which tools they actually need to build their idea.
- They overpay for tools or capabilities they don't need yet, often buying everything upfront instead of what the current stage requires.
- They have no reliable way to estimate the total cost of building their MVP before they start, which leads to under-budgeting or abandoning projects mid-build.
- Tool pricing, free tiers, and available options change frequently, so even a good plan goes stale fast.

## 3. Solution
A platform where the user describes the idea they want to build. The product then:
1. **Asks targeted, personalized follow-up questions** to understand the idea in depth (target user, technical skill level, budget constraints, timeline, etc.), rather than relying on a single static form.
2. **Searches for and recommends a tool stack** tailored specifically to that idea, sourced from current information rather than a fixed internal list.
3. **Provides a phased buying plan** per tool, so the user spends only what's needed at their current stage instead of purchasing everything upfront.
4. **Calculates a total estimated budget** to build the MVP as a one-person company, broken down by phase/category.
5. **Surfaces a disclaimer to check back regularly**, since tool pricing and availability change and the plan is a point-in-time recommendation, not a permanent one.

## 4. Target Users
- Solo founders and indie hackers building their first MVP.
- Small teams (1–3 people) who don't have a dedicated technical co-founder or CTO to make stack decisions.
- Primary markets: India and the United States.

## 5. Core User Flow
1. User lands on the platform and describes their idea in free text.
2. Buildsy asks a short set of adaptive, personalized questions based on that idea.
3. Buildsy returns:
   - A recommended tool stack (with tiered options where relevant: free / low-cost / scale).
   - A phased purchase plan (what to buy now vs. later).
   - A total estimated MVP budget with a category-level breakdown.
4. User sees a note advising them to check back for updated recommendations as pricing/tools change.

## 6. MLP (Minimum Lovable Product) Scope
In scope for MLP:
- The adaptive question flow (5–8 sharp, idea-specific questions).
- Tool stack recommendation with 2–3 tiers per category, sourced live.
- A single total budget number with a visible breakdown by category/phase.
- The pricing-changes disclaimer.

Out of scope for MLP (future consideration):
- Workforce/hiring planning (roles needed to scale, experience level, expected compensation) — flagged as a harder, higher-risk feature requiring reliable, region-specific compensation data (India and US), to be tackled only after the core product is validated.

## 7. Success Signals (to be defined further)
- Users complete the question flow rather than abandoning it.
- Users report the recommended stack and budget as accurate/useful after they start building.
- Repeat visits to check for updated recommendations.

## 8. Open Questions
- Monetization model: one-time paid report, subscription, or another approach — needs to avoid any conflict of interest with tool recommendations (e.g., affiliate revenue undermining the "avoid overspending" promise).
- How recommendations stay current over time (manual re-check vs. automated refresh).
- Scope and data source for the future workforce-planning feature.
