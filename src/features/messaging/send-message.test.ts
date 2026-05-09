import { afterEach, describe, expect, it, vi } from "vitest";
import { sendHotLeadMessage } from "./send-message";

describe("sendHotLeadMessage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses the default console provider for HOT leads", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await sendHotLeadMessage({
      name: "Jane Doe",
      phone: "+1 305 555 0100",
      email: "jane@example.com",
      intent: "LIVE",
      budget: "BUDGET_500K_1M",
      timeline: "THREE_TO_SIX_MONTHS",
      financing: "APPROVED_FINANCING",
      score: 90,
      createdAt: new Date("2026-05-08T18:30:00.000Z"),
    });

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0]?.[0]).toContain("[Messaging]");
    expect(consoleSpy.mock.calls[0]?.[0]).toContain("New HOT lead for Miami Realtor");
    expect(consoleSpy.mock.calls[0]?.[0]).toContain("Name: Jane Doe");
  });
});
