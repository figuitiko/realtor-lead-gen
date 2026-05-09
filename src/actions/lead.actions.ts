"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createLeadSchema, updateFollowUpSchema } from "@/features/lead-capture/schemas/lead.schema";
import { scoreLead } from "@/features/lead-scoring/score-lead";
import { createLead, getRealtorBySlug, updateLeadFollowUp } from "@/lib/server-only/lead.repository";
import { sendHotLeadMessage } from "@/features/messaging/send-message";
import type { ActionResult } from "@/features/lead-capture/types/lead.types";

export async function createLeadAction(
  _prev: ActionResult<null>,
  formData: FormData
): Promise<ActionResult<null>> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = createLeadSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid data",
    };
  }

  const realtor = await getRealtorBySlug(parsed.data.realtorSlug);
  if (!realtor) {
    return { ok: false, error: "Invalid realtor link. Please check the URL and try again." };
  }

  const { score, status } = scoreLead({
    budget: parsed.data.budget,
    timeline: parsed.data.timeline,
    financing: parsed.data.financing,
  });

  const lead = await createLead({
    ...parsed.data,
    realtorId: realtor.id,
    score,
    status,
  });

  if (status === "HOT") {
    try {
      await sendHotLeadMessage({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        intent: lead.intent,
        budget: lead.budget,
        timeline: lead.timeline,
        financing: lead.financing,
        score: lead.score,
        createdAt: lead.createdAt,
      });
    } catch (error) {
      console.error("[Messaging] Failed to notify HOT lead", error);
    }
  }

  redirect("/thank-you");
}

export async function updateLeadFollowUpAction(
  _prev: ActionResult<null>,
  formData: FormData
): Promise<ActionResult<null>> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = updateFollowUpSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid data",
    };
  }

  await updateLeadFollowUp({
    id: parsed.data.id,
    followUpStatus: parsed.data.followUpStatus,
    notes: parsed.data.notes,
  });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/leads/${parsed.data.id}`);

  return { ok: true, data: null };
}
