type LeadBudget = "BUDGET_300K_500K" | "BUDGET_500K_1M" | "BUDGET_1M_PLUS";
type LeadTimeline = "ZERO_TO_THREE_MONTHS" | "THREE_TO_SIX_MONTHS" | "EXPLORING";
type LeadFinancing = "APPROVED_FINANCING" | "NEED_FINANCING" | "CASH" | "NOT_SURE";
type LeadStatus = "HOT" | "WARM" | "COLD";

interface ScoreInput {
  budget: LeadBudget;
  timeline: LeadTimeline;
  financing: LeadFinancing;
}

interface ScoreResult {
  score: number;
  status: LeadStatus;
}

const BUDGET_POINTS: Record<LeadBudget, number> = {
  BUDGET_300K_500K: 20,
  BUDGET_500K_1M: 35,
  BUDGET_1M_PLUS: 50,
};

const TIMELINE_POINTS: Record<LeadTimeline, number> = {
  ZERO_TO_THREE_MONTHS: 40,
  THREE_TO_SIX_MONTHS: 25,
  EXPLORING: 5,
};

const FINANCING_POINTS: Record<LeadFinancing, number> = {
  APPROVED_FINANCING: 30,
  CASH: 35,
  NEED_FINANCING: 15,
  NOT_SURE: 5,
};

export function scoreLead(input: ScoreInput): ScoreResult {
  const score =
    BUDGET_POINTS[input.budget] +
    TIMELINE_POINTS[input.timeline] +
    FINANCING_POINTS[input.financing];

  let status: LeadStatus;
  if (score >= 80) {
    status = "HOT";
  } else if (score >= 50) {
    status = "WARM";
  } else {
    status = "COLD";
  }

  return { score, status };
}
