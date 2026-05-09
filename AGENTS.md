# Miami Premier Realty — Lead Funnel

## Stack

- **Next.js 16** App Router (TypeScript)
- **Tailwind CSS v4** + shadcn/ui (manual, no CLI)
- **Prisma 7** + PostgreSQL
- **NextAuth v5 beta** — credentials provider, JWT strategy
- **Zod v4** — validation on both client and server
- **React 19** + react-hook-form v7
- **Vitest v4** — unit tests (scoring function only)
- **sonner v2** — toast notifications

## Commands

```bash
npm run dev          # dev server
npm run test:run     # run unit tests
npm run db:push      # push Prisma schema to DB (no migrations)
npm run db:seed      # seed default admin + realtor + 3 sample leads
npm run db:studio    # Prisma Studio
npm run db:generate  # prisma generate (run after schema changes)
```

## Folder Structure

```
src/
  actions/           # Server Actions (lead.actions.ts, auth.actions.ts)
  app/               # Next.js App Router pages and layouts
  components/
    layout/          # site-header, site-footer
    ui/              # shadcn/ui primitives (button, card, badge, input, ...)
  features/
    dashboard/       # Admin dashboard components
    landing/         # Public landing page sections
    lead-capture/    # Qualification flow, schemas, types
    lead-scoring/    # Pure scoring function + Vitest tests
  lib/
    auth.ts          # NextAuth v5 config
    db.ts            # Prisma client singleton
    utils.ts         # cn() utility
    server-only/     # DB repository + notifications (server-only enforced)
  types/
    next-auth.d.ts   # session.user.id augmentation
  proxy.ts           # Auth proxy (Next.js 16 replacement for middleware.ts)
prisma/
  schema.prisma
  seed.ts
```

## Key Conventions

### Server-only enforcement
Files under `src/lib/server-only/` use `import "server-only"` at the top. Never import these from client components.

### Prisma types in client components
Use **local string literal types** (in `src/features/lead-capture/types/lead.types.ts`), NOT imported enums from `@prisma/client`. This avoids Prisma runtime in the browser.

### Server Actions
- Defined in `src/actions/`
- Return `ActionResult<T>` (discriminated union `{ ok: true; data: T } | { ok: false; error: string }`)
- Actions that call `redirect()` (like `createLeadAction`) use `useTransition`, NOT `useActionState`
- Actions that return data (like `updateLeadFollowUpAction`) can use `useActionState`

### Lead Scoring
Pure function at `src/features/lead-scoring/score-lead.ts`. No Prisma imports. Takes `{ budget, timeline, financing }` → returns `{ score, status }`.

Scoring table:
| Factor | Points |
|--------|--------|
| Budget $300K–$500K | 20 |
| Budget $500K–$1M | 35 |
| Budget $1M+ | 50 |
| Timeline 0–3 months | 40 |
| Timeline 3–6 months | 25 |
| Exploring | 5 |
| Financing approved | 30 |
| Cash buyer | 35 |
| Needs financing | 15 |
| Not sure | 5 |

HOT ≥ 80 · WARM ≥ 50 · COLD < 50

### Auth
- NextAuth v5 beta credentials provider
- Session callback adds `user.id` from DB user
- Protected routes handled by `src/proxy.ts` (Next.js 16 proxy convention)
- Dashboard protected: `/dashboard/:path*`

### Next.js 16 proxy (was middleware)
In Next.js 16, `middleware.ts` was renamed to `proxy.ts`. The function export convention follows `proxy` instead of `middleware`. This project uses NextAuth's `auth()` wrapper as the default export — no function rename needed since it's a default export.

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/miami_realtor"
NEXTAUTH_SECRET="<openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
```

## Seed Credentials

| Field    | Value                    |
|----------|--------------------------|
| Email    | admin@miamirealtor.com   |
| Password | admin123                 |

## Routes

| Route                    | Access  |
|--------------------------|---------|
| `/`                      | Public  |
| `/qualify`               | Public  |
| `/thank-you`             | Public  |
| `/login`                 | Public  |
| `/dashboard`             | Admin   |
| `/dashboard/leads/[id]`  | Admin   |

## Important Gotchas

- **Next.js 15→16**: `middleware.ts` → `proxy.ts`. `experimental.serverActions` config removed (stabilized).
- **Tailwind v4**: No `tailwind.config.ts` — theme lives in `globals.css` via `@theme inline {}`. PostCSS uses `@tailwindcss/postcss` (no autoprefixer needed — built-in). `tailwindcss-animate` removed; keyframes defined directly in CSS.
- **Async searchParams**: Next.js 15+ requires `await searchParams` in page components. Already applied in `dashboard/page.tsx`.
- **useTransition vs useActionState**: Use `useTransition` when the action calls `redirect()` (no return value needed). Use `useActionState` when you need the returned value.
- **shadcn/ui**: Installed manually without CLI. Components are in `src/components/ui/`.
- **Prisma generate**: Must run `npm run db:generate` before first build or after schema changes. Prisma 7 — run after `npm install`.
- **Prisma 7 client URL**: Pass `datasourceUrl: process.env.DATABASE_URL` in the `PrismaClient` constructor (`src/lib/db.ts`). The schema `env()` is for CLI tooling only (studio, db push) — omitting from constructor triggers a VS Code extension warning.

## Docs / Plans

Architecture plans and phase docs live in `docs/` inside the project root (e.g. `docs/phase-2-improve-landing.md`).


<claude-mem-context>
# Memory Context

# [realtor] recent context, 2026-05-08 10:26pm CST

No previous sessions found.
</claude-mem-context>