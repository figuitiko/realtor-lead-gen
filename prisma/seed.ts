import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import ws from "ws";
import { DEFAULT_REALTOR_SLUG } from "../src/features/realtors/constants";
import { scoreLead } from "../src/features/lead-scoring/score-lead";
import type {
  FollowUpStatus,
  LeadBudget,
  LeadFinancing,
  LeadIntent,
  LeadTimeline,
} from "../src/features/lead-capture/types/lead.types";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface DemoLeadSeed {
  name: string;
  email: string;
  phone: string;
  intent: LeadIntent;
  budget: LeadBudget;
  timeline: LeadTimeline;
  financing: LeadFinancing;
  followUpStatus: FollowUpStatus;
  notes: string;
  createdAt: Date;
}

const demoLeadSource = "demo-seed";

const hotLeadSeeds: DemoLeadSeed[] = [
  {
    name: "Sofia Alvarez",
    email: "sofia.alvarez@example.com",
    phone: "+1-305-555-0101",
    intent: "LIVE",
    budget: "BUDGET_1M_PLUS",
    timeline: "ZERO_TO_THREE_MONTHS",
    financing: "CASH",
    followUpStatus: "NEW",
    notes: "Relocating from New York in 45 days. Wants turnkey condo in Brickell with water views.",
    createdAt: new Date("2026-05-10T14:20:00.000Z"),
  },
  {
    name: "Daniel Mercer",
    email: "daniel.mercer@example.com",
    phone: "+1-786-555-0142",
    intent: "INVEST",
    budget: "BUDGET_1M_PLUS",
    timeline: "ZERO_TO_THREE_MONTHS",
    financing: "APPROVED_FINANCING",
    followUpStatus: "CONTACTED",
    notes: "Looking for short-term rental potential near Miami Beach. Already reviewed lender options.",
    createdAt: new Date("2026-05-10T12:05:00.000Z"),
  },
  {
    name: "Camila Torres",
    email: "camila.torres@example.com",
    phone: "+1-954-555-0118",
    intent: "LIVE",
    budget: "BUDGET_500K_1M",
    timeline: "ZERO_TO_THREE_MONTHS",
    financing: "APPROVED_FINANCING",
    followUpStatus: "APPOINTMENT_SCHEDULED",
    notes: "Young family targeting Coral Gables or Pinecrest. Video call scheduled for Thursday.",
    createdAt: new Date("2026-05-09T16:40:00.000Z"),
  },
  {
    name: "Marc Dubois",
    email: "marc.dubois@example.com",
    phone: "+33-6-12-34-56-78",
    intent: "INVEST",
    budget: "BUDGET_1M_PLUS",
    timeline: "ZERO_TO_THREE_MONTHS",
    financing: "CASH",
    followUpStatus: "CONTACTED",
    notes: "International buyer visiting Miami next week. Wants a luxury rental-income asset in Edgewater.",
    createdAt: new Date("2026-05-09T11:15:00.000Z"),
  },
  {
    name: "Natalie Brooks",
    email: "natalie.brooks@example.com",
    phone: "+1-646-555-0187",
    intent: "LIVE",
    budget: "BUDGET_500K_1M",
    timeline: "ZERO_TO_THREE_MONTHS",
    financing: "CASH",
    followUpStatus: "NEW",
    notes: "Needs a second-home purchase before summer. Prefers low-maintenance condo with strong amenities.",
    createdAt: new Date("2026-05-08T18:05:00.000Z"),
  },
];

const warmLeadSeeds: DemoLeadSeed[] = [
  {
    name: "Andres Gil",
    email: "andres.gil@example.com",
    phone: "+57-300-555-2201",
    intent: "INVEST",
    budget: "BUDGET_500K_1M",
    timeline: "THREE_TO_SIX_MONTHS",
    financing: "APPROVED_FINANCING",
    followUpStatus: "NEW",
    notes: "Interested in pre-construction options and wants ROI comparison before committing.",
    createdAt: new Date("2026-05-08T14:00:00.000Z"),
  },
  {
    name: "Melissa Chang",
    email: "melissa.chang@example.com",
    phone: "+1-408-555-0220",
    intent: "LIVE",
    budget: "BUDGET_500K_1M",
    timeline: "THREE_TO_SIX_MONTHS",
    financing: "NEED_FINANCING",
    followUpStatus: "CONTACTED",
    notes: "Moving from California later this year. Needs lender introduction and neighborhood shortlist.",
    createdAt: new Date("2026-05-07T15:30:00.000Z"),
  },
  {
    name: "Javier Ortega",
    email: "javier.ortega@example.com",
    phone: "+1-305-555-0244",
    intent: "INVEST",
    budget: "BUDGET_300K_500K",
    timeline: "ZERO_TO_THREE_MONTHS",
    financing: "APPROVED_FINANCING",
    followUpStatus: "APPOINTMENT_SCHEDULED",
    notes: "Local buyer comparing Little Havana duplexes. Wants cash-flow numbers before touring.",
    createdAt: new Date("2026-05-07T10:10:00.000Z"),
  },
  {
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+1-917-555-0291",
    intent: "LIVE",
    budget: "BUDGET_300K_500K",
    timeline: "THREE_TO_SIX_MONTHS",
    financing: "APPROVED_FINANCING",
    followUpStatus: "CONTACTED",
    notes: "Looking for a first condo purchase. Strong buyer, just needs to finalize school-zone preferences.",
    createdAt: new Date("2026-05-06T19:25:00.000Z"),
  },
  {
    name: "Eduardo Lima",
    email: "eduardo.lima@example.com",
    phone: "+55-11-95555-3010",
    intent: "INVEST",
    budget: "BUDGET_500K_1M",
    timeline: "THREE_TO_SIX_MONTHS",
    financing: "NOT_SURE",
    followUpStatus: "NEW",
    notes: "Brazil-based buyer evaluating dollar diversification. Needs education before property selection.",
    createdAt: new Date("2026-05-06T11:55:00.000Z"),
  },
];

const coldLeadSeeds: DemoLeadSeed[] = [
  {
    name: "Tyler Benson",
    email: "tyler.benson@example.com",
    phone: "+1-404-555-0312",
    intent: "LIVE",
    budget: "BUDGET_300K_500K",
    timeline: "EXPLORING",
    financing: "NOT_SURE",
    followUpStatus: "NEW",
    notes: "Very early research stage. Wants general market education first.",
    createdAt: new Date("2026-05-05T14:45:00.000Z"),
  },
  {
    name: "Helena Costa",
    email: "helena.costa@example.com",
    phone: "+351-91-555-3344",
    intent: "INVEST",
    budget: "BUDGET_300K_500K",
    timeline: "EXPLORING",
    financing: "NEED_FINANCING",
    followUpStatus: "NOT_QUALIFIED",
    notes: "Interested in Miami eventually, but financing and timeline are both too early for active service.",
    createdAt: new Date("2026-05-05T09:35:00.000Z"),
  },
  {
    name: "Brian Walters",
    email: "brian.walters@example.com",
    phone: "+1-312-555-0366",
    intent: "LIVE",
    budget: "BUDGET_300K_500K",
    timeline: "EXPLORING",
    financing: "NOT_SURE",
    followUpStatus: "CONTACTED",
    notes: "Exploring a future move to Florida. Asked for a market overview email only.",
    createdAt: new Date("2026-05-04T17:05:00.000Z"),
  },
  {
    name: "Luciana Reyes",
    email: "luciana.reyes@example.com",
    phone: "+1-786-555-0378",
    intent: "INVEST",
    budget: "BUDGET_300K_500K",
    timeline: "THREE_TO_SIX_MONTHS",
    financing: "NOT_SURE",
    followUpStatus: "NEW",
    notes: "Likes the market but is still comparing Miami to Orlando. Not ready for a high-touch search yet.",
    createdAt: new Date("2026-05-04T12:20:00.000Z"),
  },
  {
    name: "Ethan Powell",
    email: "ethan.powell@example.com",
    phone: "+1-720-555-0399",
    intent: "LIVE",
    budget: "BUDGET_300K_500K",
    timeline: "EXPLORING",
    financing: "NEED_FINANCING",
    followUpStatus: "CLOSED",
    notes: "Decided to pause home search until next year after reviewing financing options.",
    createdAt: new Date("2026-05-03T15:15:00.000Z"),
  },
];

function buildLeadData(realtorId: string, lead: DemoLeadSeed) {
  const { score, status } = scoreLead({
    budget: lead.budget,
    timeline: lead.timeline,
    financing: lead.financing,
  });

  return {
    realtorId,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    intent: lead.intent,
    budget: lead.budget,
    timeline: lead.timeline,
    financing: lead.financing,
    score,
    status,
    followUpStatus: lead.followUpStatus,
    source: demoLeadSource,
    notes: lead.notes,
    createdAt: lead.createdAt,
  };
}

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.adminUser.upsert({
    where: { email: "admin@miamirealtor.com" },
    update: {},
    create: {
      email: "admin@miamirealtor.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  const realtor = await prisma.realtor.upsert({
    where: { slug: DEFAULT_REALTOR_SLUG },
    update: {
      name: "Miami Premier Realty",
      email: "contact@miamipremier.com",
      phone: "+1-305-555-0100",
    },
    create: {
      name: "Miami Premier Realty",
      email: "contact@miamipremier.com",
      phone: "+1-305-555-0100",
      slug: DEFAULT_REALTOR_SLUG,
    },
  });

  await prisma.lead.deleteMany({
    where: {
      realtorId: realtor.id,
      source: demoLeadSource,
    },
  });

  const allDemoLeads = [...hotLeadSeeds, ...warmLeadSeeds, ...coldLeadSeeds].map((lead) =>
    buildLeadData(realtor.id, lead)
  );

  await prisma.lead.createMany({
    data: allDemoLeads,
  });

  console.log(`Seed complete: ${hotLeadSeeds.length} HOT, ${warmLeadSeeds.length} WARM, ${coldLeadSeeds.length} COLD demo leads created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
