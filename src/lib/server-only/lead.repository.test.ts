import { beforeEach, describe, expect, it, vi } from "vitest";

const { dbMock } = vi.hoisted(() => ({
  dbMock: {
    realtor: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("@/lib/db", () => ({ db: dbMock }));

import {
  DEFAULT_REALTOR_SLUG,
  getDefaultRealtor,
  getRealtorBySlug,
} from "./lead.repository";

describe("lead.repository realtor lookups", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses demo-realtor as the default realtor slug", async () => {
    dbMock.realtor.findUnique.mockResolvedValue({ id: "realtor-1" });

    await getDefaultRealtor();

    expect(DEFAULT_REALTOR_SLUG).toBe("demo-realtor");
    expect(dbMock.realtor.findUnique).toHaveBeenCalledWith({
      where: { slug: "demo-realtor" },
    });
  });

  it("finds realtors by slug", async () => {
    dbMock.realtor.findUnique.mockResolvedValue({ id: "realtor-2" });

    await getRealtorBySlug("demo-realtor");

    expect(dbMock.realtor.findUnique).toHaveBeenCalledWith({
      where: { slug: "demo-realtor" },
    });
  });
});
