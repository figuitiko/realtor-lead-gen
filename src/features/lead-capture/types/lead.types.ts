export type LeadIntent = "LIVE" | "INVEST";
export type LeadBudget = "BUDGET_300K_500K" | "BUDGET_500K_1M" | "BUDGET_1M_PLUS";
export type LeadTimeline = "ZERO_TO_THREE_MONTHS" | "THREE_TO_SIX_MONTHS" | "EXPLORING";
export type LeadFinancing = "APPROVED_FINANCING" | "NEED_FINANCING" | "CASH" | "NOT_SURE";
export type LeadStatus = "HOT" | "WARM" | "COLD";
export type FollowUpStatus =
  | "NEW"
  | "CONTACTED"
  | "APPOINTMENT_SCHEDULED"
  | "NOT_QUALIFIED"
  | "CLOSED";

export interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  intent: LeadIntent;
  budget: LeadBudget;
  timeline: LeadTimeline;
  financing: LeadFinancing;
}

export interface UpdateLeadFollowUpInput {
  followUpStatus: FollowUpStatus;
  notes?: string;
}

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export interface QualificationAnswers {
  intent?: LeadIntent;
  budget?: LeadBudget;
  timeline?: LeadTimeline;
  financing?: LeadFinancing;
}
