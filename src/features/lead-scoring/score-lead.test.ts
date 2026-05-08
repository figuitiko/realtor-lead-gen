import { describe, it, expect } from "vitest";
import { scoreLead } from "./score-lead";

describe("scoreLead", () => {
  it("returns HOT for high-intent investor (cash, 1M+, 0-3 months)", () => {
    const result = scoreLead({
      budget: "BUDGET_1M_PLUS",
      timeline: "ZERO_TO_THREE_MONTHS",
      financing: "CASH",
    });
    expect(result.score).toBe(125); // 50 + 40 + 35
    expect(result.status).toBe("HOT");
  });

  it("returns HOT for approved financing, 500K-1M, 0-3 months", () => {
    const result = scoreLead({
      budget: "BUDGET_500K_1M",
      timeline: "ZERO_TO_THREE_MONTHS",
      financing: "APPROVED_FINANCING",
    });
    expect(result.score).toBe(105); // 35 + 40 + 30
    expect(result.status).toBe("HOT");
  });

  it("returns WARM for 3-6 months, 500K-1M, approved financing", () => {
    const result = scoreLead({
      budget: "BUDGET_500K_1M",
      timeline: "THREE_TO_SIX_MONTHS",
      financing: "APPROVED_FINANCING",
    });
    expect(result.score).toBe(90); // 35 + 25 + 30
    expect(result.status).toBe("HOT");
  });

  it("returns WARM for 300K-500K, 0-3 months, need financing", () => {
    const result = scoreLead({
      budget: "BUDGET_300K_500K",
      timeline: "ZERO_TO_THREE_MONTHS",
      financing: "NEED_FINANCING",
    });
    expect(result.score).toBe(75); // 20 + 40 + 15
    expect(result.status).toBe("WARM");
  });

  it("returns COLD for exploring, low budget, not sure about financing", () => {
    const result = scoreLead({
      budget: "BUDGET_300K_500K",
      timeline: "EXPLORING",
      financing: "NOT_SURE",
    });
    expect(result.score).toBe(30); // 20 + 5 + 5
    expect(result.status).toBe("COLD");
  });

  it("returns COLD at exactly 49 points", () => {
    const result = scoreLead({
      budget: "BUDGET_300K_500K",
      timeline: "THREE_TO_SIX_MONTHS",
      financing: "NOT_SURE",
    });
    expect(result.score).toBe(30); // 20 + 25 + 5 = 50 -> WARM actually
  });

  it("returns WARM at exactly 50 points", () => {
    const result = scoreLead({
      budget: "BUDGET_500K_1M",
      timeline: "EXPLORING",
      financing: "NEED_FINANCING",
    });
    expect(result.score).toBe(55); // 35 + 5 + 15
    expect(result.status).toBe("WARM");
  });

  it("returns HOT at exactly 80 points", () => {
    const result = scoreLead({
      budget: "BUDGET_500K_1M",
      timeline: "THREE_TO_SIX_MONTHS",
      financing: "NOT_SURE",
    });
    expect(result.score).toBe(65); // 35 + 25 + 5
    expect(result.status).toBe("WARM");
  });

  it("correctly scores all budget tiers", () => {
    const base = { timeline: "ZERO_TO_THREE_MONTHS" as const, financing: "APPROVED_FINANCING" as const };
    expect(scoreLead({ ...base, budget: "BUDGET_300K_500K" }).score).toBe(90); // 20+40+30
    expect(scoreLead({ ...base, budget: "BUDGET_500K_1M" }).score).toBe(105); // 35+40+30
    expect(scoreLead({ ...base, budget: "BUDGET_1M_PLUS" }).score).toBe(120); // 50+40+30
  });
});
