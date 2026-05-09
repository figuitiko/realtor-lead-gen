import "server-only";
import { db } from "@/lib/db";
import type { CreateLeadInput, UpdateLeadFollowUpInput } from "@/features/lead-capture/types/lead.types";
import { DEFAULT_REALTOR_SLUG } from "@/features/realtors/constants";
import type { LeadStatus, FollowUpStatus } from "@prisma/client";

export { DEFAULT_REALTOR_SLUG };

export async function createLead(data: CreateLeadInput & { realtorId: string; score: number; status: LeadStatus }) {
  return db.lead.create({
    data: {
      realtorId: data.realtorId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      intent: data.intent,
      budget: data.budget,
      timeline: data.timeline,
      financing: data.financing,
      score: data.score,
      status: data.status,
      source: "funnel",
    },
  });
}

export async function getLeads(filters?: {
  status?: LeadStatus;
  followUpStatus?: FollowUpStatus;
  realtorId?: string;
}) {
  return db.lead.findMany({
    where: {
      ...(filters?.status && { status: filters.status }),
      ...(filters?.followUpStatus && { followUpStatus: filters.followUpStatus }),
      ...(filters?.realtorId && { realtorId: filters.realtorId }),
    },
    orderBy: { createdAt: "desc" },
    include: { realtor: true },
  });
}

export async function getLeadById(id: string, realtorId?: string) {
  return db.lead.findFirst({
    where: {
      id,
      ...(realtorId && { realtorId }),
    },
    include: { realtor: true },
  });
}

export async function updateLeadFollowUp(data: UpdateLeadFollowUpInput & { id: string }) {
  return db.lead.update({
    where: { id: data.id },
    data: {
      followUpStatus: data.followUpStatus,
      ...(data.notes !== undefined && { notes: data.notes }),
    },
  });
}

export async function getDashboardStats(realtorId?: string) {
  const where = realtorId ? { realtorId } : {};

  const [total, hot, warm, cold, newLeads] = await Promise.all([
    db.lead.count({ where }),
    db.lead.count({ where: { ...where, status: "HOT" } }),
    db.lead.count({ where: { ...where, status: "WARM" } }),
    db.lead.count({ where: { ...where, status: "COLD" } }),
    db.lead.count({ where: { ...where, followUpStatus: "NEW" } }),
  ]);

  return { total, hot, warm, cold, newLeads };
}

export async function getDefaultRealtor() {
  return getRealtorBySlug(DEFAULT_REALTOR_SLUG);
}

export async function getRealtorBySlug(slug: string) {
  return db.realtor.findUnique({
    where: { slug },
  });
}
