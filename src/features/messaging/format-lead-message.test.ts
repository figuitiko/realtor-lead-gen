import { describe, expect, it } from "vitest";
import { formatLeadMessage } from "./format-lead-message";

describe("formatLeadMessage", () => {
  it("formats the HOT lead summary with human-readable labels", () => {
    const message = formatLeadMessage({
      name: "Jane Doe",
      phone: "+1 305 555 0100",
      email: "jane@example.com",
      intent: "INVEST",
      budget: "BUDGET_1M_PLUS",
      timeline: "ZERO_TO_THREE_MONTHS",
      financing: "CASH",
      score: 125,
      createdAt: new Date("2026-05-08T18:30:00.000Z"),
    });

    expect(message).toBe(`New HOT lead for Miami Realtor

Name: Jane Doe
Phone: +1 305 555 0100
Email: jane@example.com
Intent: Invest
Budget: $1M+
Timeline: 0–3 months
Financing: Cash buyer
Score: 125
Created at: 2026-05-08 18:30 UTC`);
  });
});
