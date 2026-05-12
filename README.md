# Miami Premier Realty — Lead Funnel

Demo-ready lead qualification funnel for a Miami realtor. The app captures inbound buyers, scores them as HOT / WARM / COLD, and gives the team a clean dashboard for follow-up.

## Features

- Multi-realtor-ready public funnel using realtor slugs
- Qualification flow that captures intent, budget, timeline, and financing
- Automatic lead scoring (HOT / WARM / COLD)
- Protected admin dashboard with filters, notes, and follow-up statuses
- HOT lead messaging abstraction (console provider by default)
- Realistic demo seed data for presentations and walkthroughs

## Tech Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui (manual setup)
- Prisma 7 + PostgreSQL
- NextAuth v5 beta
- Zod v4
- React 19 + react-hook-form v7
- Vitest v4
- sonner v2

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/miami_realtor"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Prepare the database

```bash
npm run db:push
npm run db:seed
```

The seed creates:
- default admin user
- default realtor: `demo-realtor`
- 15 realistic demo leads
  - 5 HOT
  - 5 WARM
  - 5 COLD

### 4. Start the app

```bash
npm run dev
```

## Admin Credentials

| Field | Value |
|-------|-------|
| Email | admin@miamirealtor.com |
| Password | admin123 |

## Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to the default realtor landing |
| `/qualify` | Redirects to the default realtor qualification flow |
| `/r/demo-realtor` | Demo landing page |
| `/r/demo-realtor/qualify` | Demo qualification flow |
| `/thank-you` | Post-submission confirmation |
| `/login` | Admin login |
| `/dashboard` | Lead list with stats + filters |
| `/dashboard/leads/[id]` | Lead detail with notes + follow-up |

## Lead Scoring

| Factor | Points |
|--------|--------|
| Budget $300K–$500K | 20 |
| Budget $500K–$1M | 35 |
| Budget $1M+ | 50 |
| Timeline 0–3 months | 40 |
| Timeline 3–6 months | 25 |
| Timeline exploring | 5 |
| Financing approved | 30 |
| Cash buyer | 35 |
| Needs financing | 15 |
| Not sure | 5 |

**HOT** = 80+ · **WARM** = 50–79 · **COLD** < 50

## Scripts

```bash
npm run dev          # start dev server
npm run test:run     # run unit tests
npm run db:push      # push Prisma schema
npm run db:seed      # seed demo admin, realtor, and 15 demo leads
npm run db:studio    # open Prisma Studio
npm run db:generate  # regenerate Prisma client
```

## Demo Flow

1. Open the landing page at `/r/demo-realtor`.
2. Explain the filtering strategy: budget, timeline, and financing determine how serious the buyer is.
3. Complete the qualification flow as a hot lead.
4. Show the dashboard and point out the HOT / WARM / COLD segmentation.
5. Open a lead detail page.
6. Update the follow-up status and notes to show the handoff workflow.
