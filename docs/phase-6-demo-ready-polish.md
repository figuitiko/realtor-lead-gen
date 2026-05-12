# Phase 6 — Demo-Ready MVP Polish

## Summary
Polish the existing Miami Realtor funnel so it feels ready for a client demo without adding major features. Focus on clearer funnel storytelling, better mobile/form UX, stronger dashboard demo usability, intentional empty/error/loading states, realistic 15-lead demo seed data, and README demo instructions.

## Key Changes
- **Landing + CTA polish**
  - Tighten hero copy around the filtering strategy: “we qualify serious Miami buyers before spending time on tours.”
  - Keep current sections, but improve visual hierarchy, spacing, CTA clarity, and mobile readability.
  - Ensure `/r/demo-realtor` CTA links consistently point to `/r/demo-realtor/qualify`.

- **Qualification form UX**
  - Improve option card tap targets, selected states, inline validation copy, and mobile spacing.
  - Add clearer progress/support copy so the demo presenter can explain why each answer matters.
  - Keep the current 5-step flow; no new qualification questions.

- **Dashboard polish**
  - Improve lead table readability for demo use: clearer columns, better mobile handling, stronger empty state copy, and more useful filter empty states.
  - Improve lead detail page hierarchy so contact info, score, status, notes, and follow-up action are easier to demo.
  - Improve mutation feedback copy for follow-up status/notes.

- **Loading, error, and empty states**
  - Replace generic full-screen spinner feel with calmer skeleton/loading states where useful.
  - Make global error and not-found copy more demo-appropriate and route-aware.
  - Ensure dashboard empty state explains whether there are no leads or filters are hiding leads.

- **Demo seed data**
  - Update `prisma/seed.ts` to create realistic demo data:
    - 5 HOT leads
    - 5 WARM leads
    - 5 COLD leads
  - Use realistic Miami/international buyer names, budgets, timelines, financing, statuses, notes, and follow-up statuses.
  - Make seed idempotent by deleting/replacing only demo-seed leads for `demo-realtor`, not arbitrary user-submitted leads.
  - Keep default admin and default `demo-realtor`.

- **README**
  - Update stack/version notes to match the current project.
  - Document `/r/demo-realtor` and `/r/demo-realtor/qualify`.
  - Add the required `Demo Flow` section:
    1. Open landing page.
    2. Explain the filtering strategy.
    3. Complete qualification as a hot lead.
    4. Show dashboard.
    5. Open lead detail.
    6. Update follow-up status and notes.

## Public Interfaces / Data
- No Prisma schema changes expected.
- Seed data should use existing `Lead`, `Realtor`, and `AdminUser` models.
- Demo seed leads should use a deterministic `source`, e.g. `demo-seed`, so reseeding can replace demo data without deleting real funnel submissions.

## Test Plan
- Run targeted tests/checks only; do **not** run a production build.
- Verify:
  - `npx tsc --noEmit`
  - Existing relevant Vitest tests for lead schema, repository, actions, messaging, and scoring.
  - `npm run db:seed` creates exactly 15 demo leads for `demo-realtor`.
  - `/r/demo-realtor` loads.
  - `/r/demo-realtor/qualify` submits a HOT lead end-to-end.
  - `/dashboard` shows default realtor leads with realistic hot/warm/cold distribution.
  - Lead detail allows updating follow-up status and notes.
  - Empty, loading, error, and not-found states are presentable.

## Assumptions
- No billing, realtor signup, new auth model, analytics, external notifications, or real Twilio integration in Phase 6.
- Existing `/thank-you` remains shared.
- Demo polish should improve the current visual system, not introduce a new design language.
