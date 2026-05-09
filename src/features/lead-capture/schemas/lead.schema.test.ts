import { describe, expect, it } from "vitest";
import { createLeadSchema } from "./lead.schema";

const validLead = {
  realtorSlug: "demo-realtor",
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "+1 305 555 0100",
  intent: "INVEST",
  budget: "BUDGET_1M_PLUS",
  timeline: "ZERO_TO_THREE_MONTHS",
  financing: "CASH",
};

describe("createLeadSchema", () => {
  it("requires a realtor slug for multi-realtor lead attribution", () => {
    const result = createLeadSchema.safeParse({
      ...validLead,
      realtorSlug: "",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a complete lead submission with realtor slug", () => {
    const result = createLeadSchema.safeParse(validLead);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.realtorSlug).toBe("demo-realtor");
    }
  });
});
