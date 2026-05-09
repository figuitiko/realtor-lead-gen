import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import ws from "ws";
import { DEFAULT_REALTOR_SLUG } from "../src/features/realtors/constants";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

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

  await prisma.lead.createMany({
    data: [
      {
        realtorId: realtor.id,
        name: "Carlos Mendez",
        email: "carlos@example.com",
        phone: "+1-305-555-0101",
        intent: "INVEST",
        budget: "BUDGET_1M_PLUS",
        timeline: "ZERO_TO_THREE_MONTHS",
        financing: "CASH",
        score: 125,
        status: "HOT",
        followUpStatus: "NEW",
        source: "funnel",
      },
      {
        realtorId: realtor.id,
        name: "Ana Rodriguez",
        email: "ana@example.com",
        phone: "+1-786-555-0202",
        intent: "LIVE",
        budget: "BUDGET_500K_1M",
        timeline: "THREE_TO_SIX_MONTHS",
        financing: "APPROVED_FINANCING",
        score: 90,
        status: "HOT",
        followUpStatus: "CONTACTED",
        source: "funnel",
      },
      {
        realtorId: realtor.id,
        name: "John Smith",
        email: "john@example.com",
        phone: "+1-954-555-0303",
        intent: "LIVE",
        budget: "BUDGET_300K_500K",
        timeline: "EXPLORING",
        financing: "NOT_SURE",
        score: 25,
        status: "COLD",
        followUpStatus: "NEW",
        source: "funnel",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
