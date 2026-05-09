import type { LeadMessageInput, LeadMessageLabels } from "./types";

const labels: LeadMessageLabels = {
  intent: {
    LIVE: "Live",
    INVEST: "Invest",
  },
  budget: {
    BUDGET_300K_500K: "$300K – $500K",
    BUDGET_500K_1M: "$500K – $1M",
    BUDGET_1M_PLUS: "$1M+",
  },
  timeline: {
    ZERO_TO_THREE_MONTHS: "0–3 months",
    THREE_TO_SIX_MONTHS: "3–6 months",
    EXPLORING: "Just exploring",
  },
  financing: {
    APPROVED_FINANCING: "Approved financing",
    NEED_FINANCING: "Needs financing",
    CASH: "Cash buyer",
    NOT_SURE: "Not sure",
  },
};

function formatCreatedAt(createdAt: Date) {
  const isoString = createdAt.toISOString();

  return `${isoString.slice(0, 10)} ${isoString.slice(11, 16)} UTC`;
}

export function formatLeadMessage(lead: LeadMessageInput) {
  return `New HOT lead for Miami Realtor

Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Intent: ${labels.intent[lead.intent]}
Budget: ${labels.budget[lead.budget]}
Timeline: ${labels.timeline[lead.timeline]}
Financing: ${labels.financing[lead.financing]}
Score: ${lead.score}
Created at: ${formatCreatedAt(lead.createdAt)}`;
}
