import { describe, expect, it } from "vitest";
import { isPastDeadline, minimumDeadline } from "@/lib/deadline";

describe("deadline helpers", () => {
  const now = new Date("2026-08-27T10:30:29");
  it("sets the minimum to the next local minute", () => {
    expect(minimumDeadline(now)).toBe("2026-08-27T10:31");
  });
  it("rejects a past deadline while accepting a future deadline", () => {
    expect(isPastDeadline("2026-08-27T10:29", now)).toBe(true);
    expect(isPastDeadline("2026-08-27T10:31", now)).toBe(false);
  });
});
