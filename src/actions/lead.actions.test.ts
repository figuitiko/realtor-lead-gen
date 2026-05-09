import { beforeEach, describe, expect, it, vi } from "vitest";

const { repositoryMock, redirectMock, messagingMock } = vi.hoisted(() => ({
  repositoryMock: {
    createLead: vi.fn(),
    getRealtorBySlug: vi.fn(),
    updateLeadFollowUp: vi.fn(),
  },
  redirectMock: vi.fn(),
  messagingMock: {
    sendHotLeadMessage: vi.fn(),
  },
}));

vi.mock("@/lib/server-only/lead.repository", () => repositoryMock);
vi.mock("@/features/messaging/send-message", () => messagingMock);
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

import { createLeadAction } from "./lead.actions";

function createValidFormData(overrides: Record<string, string> = {}) {
  const formData = new FormData();
  const values = {
    realtorSlug: "demo-realtor",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 305 555 0100",
    intent: "INVEST",
    budget: "BUDGET_1M_PLUS",
    timeline: "ZERO_TO_THREE_MONTHS",
    financing: "CASH",
    ...overrides,
  };

  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value);
  }

  return formData;
}

describe("createLeadAction multi-realtor support", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation((path: string) => {
      throw new Error(`NEXT_REDIRECT:${path}`);
    });
  });

  it("rejects submissions without a realtor slug", async () => {
    const result = await createLeadAction(
      { ok: false, error: "" },
      createValidFormData({ realtorSlug: "" })
    );

    expect(result).toEqual({
      ok: false,
      error: expect.any(String),
    });
    expect(repositoryMock.getRealtorBySlug).not.toHaveBeenCalled();
  });

  it("rejects submissions for an unknown realtor slug", async () => {
    repositoryMock.getRealtorBySlug.mockResolvedValue(null);

    const result = await createLeadAction(
      { ok: false, error: "" },
      createValidFormData({ realtorSlug: "not-real" })
    );

    expect(result).toEqual({
      ok: false,
      error: "Invalid realtor link. Please check the URL and try again.",
    });
    expect(repositoryMock.getRealtorBySlug).toHaveBeenCalledWith("not-real");
    expect(repositoryMock.createLead).not.toHaveBeenCalled();
  });

  it("creates the lead for the realtor resolved from the submitted slug", async () => {
    repositoryMock.getRealtorBySlug.mockResolvedValue({ id: "realtor-1" });
    repositoryMock.createLead.mockResolvedValue({
      name: "Jane Doe",
      phone: "+1 305 555 0100",
      email: "jane@example.com",
      intent: "INVEST",
      budget: "BUDGET_1M_PLUS",
      timeline: "ZERO_TO_THREE_MONTHS",
      financing: "CASH",
      score: 125,
      status: "HOT",
      createdAt: new Date("2026-05-09T00:00:00.000Z"),
    });

    await expect(
      createLeadAction({ ok: false, error: "" }, createValidFormData())
    ).rejects.toThrow("NEXT_REDIRECT:/thank-you");

    expect(repositoryMock.createLead).toHaveBeenCalledWith(
      expect.objectContaining({
        realtorId: "realtor-1",
        realtorSlug: "demo-realtor",
      })
    );
  });
});
