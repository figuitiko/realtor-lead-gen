# Phase 5 — Basic Multi-Realtor Funnel Support

## Summary
Add slug-based public realtor funnels without SaaS features. `demo-realtor` becomes the seeded default realtor. `/` redirects to `/r/demo-realtor`, `/qualify` redirects to `/r/demo-realtor/qualify`, invalid realtor slugs return `notFound()`, and submitted leads are stored with the matching `realtorId`.

## Key Changes
- Add realtor lookup support in the server-only repository layer:
  - `DEFAULT_REALTOR_SLUG = "demo-realtor"`.
  - `getDefaultRealtor()` must resolve by `demo-realtor`, not oldest created realtor.
  - Add `getRealtorBySlug(slug)` for public slug routes and lead creation.
  - Dashboard queries must pass the default realtor id into `getLeads()` and `getDashboardStats()`.
- Add App Router pages:
  - `/r/[slug]`: load realtor by slug; `notFound()` if missing; render existing landing sections with realtor-aware links.
  - `/r/[slug]/qualify`: load realtor by slug; `notFound()` if missing; render `QualificationFlow` tied to that slug.
  - `/`: redirect to `/r/demo-realtor`.
  - `/qualify`: redirect to `/r/demo-realtor/qualify`.
- Update lead creation flow:
  - `QualificationFlow` receives `realtorSlug` and includes it in `FormData`.
  - `createLeadAction` validates `realtorSlug`, resolves the realtor by slug, and creates the lead with that realtor’s id.
  - Keep successful redirect to existing `/thank-you`.
- Update landing CTA links:
  - Parameterize header/hero/contact/final CTA links so realtor pages point to `/r/[slug]/qualify` instead of hard-coded `/qualify`.
- Update seed:
  - Upsert one default realtor with slug `demo-realtor`.
  - Link sample leads to that realtor.

## Public Interfaces / Types
- Extend lead form schema/input with `realtorSlug: string`.
- Keep the Prisma schema unchanged because `Realtor.slug` and required `Lead.realtorId` already exist.
- If touching `createLeadSchema`, make it Zod v4-compatible by replacing `required_error` enum options with supported Zod v4 error config or plain enums plus existing client-side validation.

## Test Plan
- Add/adjust tests for:
  - `getRealtorBySlug("demo-realtor")`-style repository behavior where practical.
  - `createLeadAction` rejects invalid/missing realtor slug.
  - `createLeadAction` stores the lead with the realtor id resolved from the submitted slug.
- Manual route acceptance:
  - `/r/demo-realtor` loads the landing page.
  - `/r/demo-realtor/qualify` loads the flow.
  - `/r/not-real` returns not found.
  - `/` redirects to `/r/demo-realtor`.
  - `/qualify` redirects to `/r/demo-realtor/qualify`.
  - Dashboard only shows default realtor leads.
- Run targeted tests/checks only; do not run a production build.

## Assumptions
- No billing, realtor self-signup, tenant admin, or auth-per-realtor access control.
- One seeded default realtor is enough for Phase 5.
- Existing `/thank-you` remains shared for all realtor funnels.
