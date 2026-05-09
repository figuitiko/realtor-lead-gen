import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaDatabaseUrl: string | undefined;
};

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  return databaseUrl;
}

function createPrismaClient(databaseUrl: string) {
  const adapter = new PrismaNeon({ connectionString: databaseUrl });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

const databaseUrl = getDatabaseUrl();
const shouldReusePrismaClient =
  globalForPrisma.prisma && globalForPrisma.prismaDatabaseUrl === databaseUrl;

export const db = shouldReusePrismaClient
  ? globalForPrisma.prisma!
  : createPrismaClient(databaseUrl);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
  globalForPrisma.prismaDatabaseUrl = databaseUrl;
}
