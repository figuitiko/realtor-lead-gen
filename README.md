# Miami Premier Realty — Lead Funnel

Premium AI-powered lead qualification funnel for a Miami real estate agent. Captures, scores, and manages serious buyer/investor leads.

## Features

- Public landing page with qualification CTA
- Conversational 5-step lead qualification flow
- Automated lead scoring (HOT / WARM / COLD)
- Protected admin dashboard with filters
- Lead detail view with notes and follow-up status
- Admin auth via NextAuth v5 credentials

## Tech Stack

Next.js 15 · TypeScript · Tailwind CSS · shadcn/ui · Prisma · PostgreSQL · NextAuth v5 · Zod · Vitest

## Setup

### 1. Clone and install

```bash
npm install
```

### 2. Environment

```bash
cp env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/miami_realtor"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database

```bash
npm run db:push      # push schema to DB
npm run db:seed      # create default realtor + admin + sample leads
```

### 4. Run

```bash
npm run dev
```

## Admin Credentials (seed)

| Field | Value |
|-------|-------|
| Email | admin@miamirealtor.com |
| Password | admin123 |

**Change the password after first login.**

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/qualify` | Lead qualification flow |
| `/thank-you` | Post-submission confirmation |
| `/login` | Admin login |
| `/dashboard` | Lead list with stats + filters |
| `/dashboard/leads/[id]` | Lead detail + notes |

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
npm run test:run     # run unit tests (scoring function)
npm run db:studio    # open Prisma Studio
npm run db:seed      # reseed database
```

## Demo Flow

1. Visit `/` → click "See If I Qualify"
2. Complete 5-step qualification
3. Submit → redirected to `/thank-you`
4. Login at `/login` with seed credentials
5. View lead in `/dashboard`
6. Click lead → update follow-up status and notes
