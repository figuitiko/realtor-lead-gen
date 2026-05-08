"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createLeadSchema, updateFollowUpSchema } from "@/features/lead-capture/schemas/lead.schema";
import { scoreLead } from "@/features/lead-scoring/score-lead";
import { createLead, getDefaultRealtor, updateLeadFollowUp } from "@/lib/server-only/lead.repository";
import { notifyHotLead } from "@/lib/server-only/notifications";
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

  const realtor = await getDefaultRealtor();
  if (!realtor) {
    return { ok: false, error: "Configuration error. Please try again later." };
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
    await notifyHotLead({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      score: lead.score,
    });
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
