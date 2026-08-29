import { describe, expect, it } from "vitest";
import { createTelegramContactUrl, createWhatsAppContactUrl, isConfiguredTelegramUsername, TELEGRAM_USERNAME, WHATSAPP_NUMBER } from "@/config/contact";

describe("Telegram public username validation", () => {
  it("accepts 5–32-character names that begin with a letter and use only permitted characters", () => {
    expect(isConfiguredTelegramUsername("pageandslide_test")).toBe(true);
    expect(isConfiguredTelegramUsername("A1234")).toBe(true);
    expect(isConfiguredTelegramUsername("a".repeat(32))).toBe(true);
    expect(createTelegramContactUrl("pageandslide_test")).toBe("https://t.me/pageandslide_test");
  });

  it("rejects placeholders, numeric and underscore prefixes, invalid characters, and invalid lengths", () => {
    expect(isConfiguredTelegramUsername("YOUR_USERNAME")).toBe(false);
    expect(isConfiguredTelegramUsername("1student")).toBe(false);
    expect(isConfiguredTelegramUsername("_student")).toBe(false);
    expect(isConfiguredTelegramUsername("four")).toBe(false);
    expect(isConfiguredTelegramUsername("a".repeat(33))).toBe(false);
    expect(isConfiguredTelegramUsername("student-name")).toBe(false);
  });

  it("keeps Page & Slide independent from the SoftBazzar contact identity", () => {
    expect(WHATSAPP_NUMBER).toBe("919025857269");
    expect(TELEGRAM_USERNAME).toBe("");
    expect(createWhatsAppContactUrl(WHATSAPP_NUMBER)).toBe("https://wa.me/919025857269");
    expect(createTelegramContactUrl(TELEGRAM_USERNAME)).toBeNull();
  });
});
