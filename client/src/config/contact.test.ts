import { describe, expect, it } from "vitest";
import { createTelegramContactUrl, isConfiguredTelegramUsername } from "@/config/contact";

describe("Telegram public username validation", () => {
  it("accepts 5–32-character names that begin with a letter and use only permitted characters", () => {
    expect(isConfiguredTelegramUsername("softbazzar_test")).toBe(true);
    expect(isConfiguredTelegramUsername("A1234")).toBe(true);
    expect(isConfiguredTelegramUsername("a".repeat(32))).toBe(true);
    expect(createTelegramContactUrl("softbazzar_test")).toBe("https://t.me/softbazzar_test");
  });

  it("rejects placeholders, numeric and underscore prefixes, invalid characters, and invalid lengths", () => {
    expect(isConfiguredTelegramUsername("YOUR_USERNAME")).toBe(false);
    expect(isConfiguredTelegramUsername("1student")).toBe(false);
    expect(isConfiguredTelegramUsername("_student")).toBe(false);
    expect(isConfiguredTelegramUsername("four")).toBe(false);
    expect(isConfiguredTelegramUsername("a".repeat(33))).toBe(false);
    expect(isConfiguredTelegramUsername("student-name")).toBe(false);
  });
});
