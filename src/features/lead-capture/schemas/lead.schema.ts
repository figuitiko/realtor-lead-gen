import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone must be at least 8 characters"),
  intent: z.enum(["LIVE", "INVEST"], { required_error: "Select an option" }),
  budget: z.enum(["BUDGET_300K_500K", "BUDGET_500K_1M", "BUDGET_1M_PLUS"], {
    required_error: "Select a budget",
  }),
  timeline: z.enum(["ZERO_TO_THREE_MONTHS", "THREE_TO_SIX_MONTHS", "EXPLORING"], {
    required_error: "Select a timeline",
  }),
  financing: z.enum(["APPROVED_FINANCING", "NEED_FINANCING", "CASH", "NOT_SURE"], {
    required_error: "Select a financing option",
  }),
});

export type CreateLeadFormValues = z.infer<typeof createLeadSchema>;

export const updateFollowUpSchema = z.object({
  id: z.string().cuid(),
  followUpStatus: z.enum([
    "NEW",
    "CONTACTED",
    "APPOINTMENT_SCHEDULED",
    "NOT_QUALIFIED",
    "CLOSED",
  ]),
  notes: z.string().optional(),
});

export type UpdateFollowUpFormValues = z.infer<typeof updateFollowUpSchema>;
