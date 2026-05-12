# Phase 5 Finalization — Seed and Verify Multi-Realtor Funnel

## Summary
Phase 5 code is already present. The remaining work is environment setup and verification: ensure the `demo-realtor` row exists in the active database, then validate the slug routes and lead relation behavior.

## Key Changes / Actions
- Run the existing seed command in the target environment:
  - `npm run db:seed`
- Confirm `demo-realtor` exists in the `Realtor` table.
- Verify the public routes:
  - `/r/demo-realtor`
  - `/r/demo-realtor/qualify`
  - `/r/not-real` should return 404.
- Submit a test lead through `/r/demo-realtor/qualify` and confirm the created lead has `realtorId` linked to the `demo-realtor` realtor.

## Test Plan
- Run targeted checks:
  - `npx tsc --noEmit`
  - Relevant Vitest tests for lead schema, repository lookup, and lead action.
- Manual browser verification:
  - `/` redirects to `/r/demo-realtor`
  - `/qualify` redirects to `/r/demo-realtor/qualify`
  - Dashboard only shows leads for default realtor.

## Assumptions
- No Prisma schema migration is needed.
- If `/r/demo-realtor/qualify` returns 404, the most likely cause is missing seed data, not missing route code.
- Existing shared `/thank-you` remains correct.
