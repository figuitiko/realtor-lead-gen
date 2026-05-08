# Phase 2 — Landing Page Conversion Overhaul

## Context

Current landing has 4 sections (Hero, Qualification, Benefits, FinalCta). Goal: make it feel premium, filter bad leads before the qualification flow, and add 5 new blocks. No new backend features — pure UI/copy changes.

---

## Page Structure (after)

```
SiteHeader
│
├─ HeroSection          ← improve
├─ QualificationSection ← improve (becomes "Who This Is For / Not For")
├─ HowItWorksSection    ← NEW
├─ BenefitsSection      ← improve
├─ WhyMiamiSection      ← NEW
├─ SocialProofSection   ← NEW (placeholder)
├─ ContactSection       ← NEW ("Talk to a Miami Realtor")
└─ FinalCtaSection      ← improve
│
SiteFooter
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/features/landing/components/hero-section.tsx` | Stronger filtering headline, trust sub-copy, same amber CTA |
| `src/features/landing/components/qualification-section.tsx` | More specific criteria copy, sharper exclusions |
| `src/features/landing/components/benefits-section.tsx` | Miami-specific benefit copy, keep 4-card grid |
| `src/features/landing/components/final-cta-section.tsx` | Urgency-driven closing copy |
| `src/app/page.tsx` | Import + add new sections in order |

## Files to Create

| File | Purpose |
|------|---------|
| `src/features/landing/components/how-it-works-section.tsx` | 4-step numbered process |
| `src/features/landing/components/why-miami-section.tsx` | 4 stat cards about Miami market |
| `src/features/landing/components/social-proof-section.tsx` | 3 placeholder testimonial cards |
| `src/features/landing/components/contact-section.tsx` | "Talk to a realtor" block with CTA |

---

## Section Specs

### Hero (improve)
- Headline: `"We don't work with everyone. We work with the right buyer."`
- Subhead: `"Minimum investment $300,000 USD. English & Spanish. Ready to close in 90 days? Let's find your property."`
- Badge: `"Miami · $300K+ · 90-Day Program"`
- CTA button: `"Start My Property Match"` → `/qualify`
- Disclaimer: `"This is not a generic listing platform. We only accept qualified buyers."`
- Keep dark gradient + grid overlay

### QualificationSection (improve)
Left card (green) — "You're the right fit if":
- Budget of $300,000 or more
- Ready to move or invest within 90 days
- Want curated options, not 200-page MLS dumps
- Pre-approved or cash buyer
- Value bilingual, personalized guidance

Right card (red) — "This is not for you if":
- Budget under $300,000
- Still "just exploring" with no timeline
- Expecting generic listings
- Need to sell before you can buy
- Looking for rental under $3,000/month

### HowItWorksSection (new)
Dark background, 4-step numbered cards:
1. **Answer 5 questions** — Budget, timeline, financing, area preferences (5 min)
2. **We review your profile** — Our team qualifies you within 24 hours
3. **Get 3 curated matches** — Properties personally selected for your criteria
4. **Tour & close** — We handle negotiations, docs, and bilingual support

### BenefitsSection (improve)
Keep 4-card grid, update copy:
1. **No wasted tours** — Every showing is pre-vetted for your budget and timeline
2. **English & Spanish** — Full bilingual support from search to closing
3. **Miami market expertise** — We know Brickell, Coral Gables, Coconut Grove, and beyond
4. **Investor-grade guidance** — ROI projections, rental yield estimates, market comps

### WhyMiamiSection (new)
Light background, headline: `"Why Miami? The numbers speak."`
4 stat cards:
- `#1` — International real estate market in the US (NAR 2024)
- `0%` — State income tax in Florida
- `+18%` — Median home price growth (2022–2024)
- `$4,200` — Average monthly luxury rental yield (Brickell/Edgewater)

Disclaimer: `"Stats are illustrative. Consult a licensed advisor for investment decisions."`

### SocialProofSection (new)
Section headline: `"What serious buyers say"`
3 placeholder cards (gray, clearly marked as future testimonials):
- Each has: avatar placeholder, name, location, 5-star rating, quote
- Quotes are real-sounding but labeled `[Testimonial coming soon]`
- Small badge: `"Verified buyer"` on each card

### ContactSection (new — "Talk to a Miami Realtor")
Light/neutral background:
- Headline: `"Prefer to talk before you start?"`
- Subhead: `"Book a free 15-minute call. No pressure, no pitch. English or Spanish."`
- Primary CTA: `"Schedule a Call"` → `/qualify` (same flow for now)
- Secondary text: `"Or start the online qualification — takes 5 minutes."`
- Trust line: shield icon + `"100% confidential. We never share your data."`

### FinalCta (improve)
- Headline: `"Your next property is waiting. Are you?"`
- Body: `"Serious buyers only. If you're ready to invest $300K+ in Miami in the next 90 days, start now."`
- CTA: `"Start My Property Match"` → `/qualify`

---

## Existing Utilities to Reuse

- `cn()` from `src/lib/utils.ts`
- All icons from `lucide-react` (already in deps)
- `Card`, `CardContent`, `Badge`, `Button` from `src/components/ui/`
- Container + section padding patterns from existing components (`py-20`, `container mx-auto px-4 sm:px-6 lg:px-8`)

---

## Constraints

- All new sections: **Server Components** (no `"use client"`)
- No new deps — use existing lucide-react + shadcn/ui
- Tailwind v4: no config file, use inline classes only
- Mobile-first responsive: stack vertically, expand at `sm:` and `lg:`
- Stat/testimonial data is hardcoded (no API calls)

---

## Verification

1. `npm run dev` — visual check of all 8 sections in order
2. CTA visible above fold on 1280px, 768px, 375px viewports
3. Each CTA links to `/qualify`
4. No TypeScript errors
5. `npm run test:run` — existing tests still pass
