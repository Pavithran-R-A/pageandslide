import { createOrderMessage, createOrderReference, createTelegramOrderUrl, createWhatsAppOrderUrl } from "@/lib/order";
import { calculateOrderTotals, resolveCartItems } from "@/lib/pricing";
import { describe, expect, it } from "vitest";

const items = [{ serviceId: "presentations", tierId: "11-to-15", quantity: 1 }, { serviceId: "project-reports", tierId: "up-to-20", quantity: 1 }];
const input = { orderId: "PS-20260827-A7K3", lines: resolveCartItems(items), totals: calculateOrderTotals(items, "priority"), details: { name: "Arun", topic: "Consumer Behaviour", deadline: "2026-08-29T18:00", delivery: "priority" as const, notes: "Please use the department format." } };

describe("order communication", () => {
  it("makes the expected local conversation reference", () => expect(createOrderReference(new Date(2026, 7, 27), () => 0.01)).toBe("PS-20260827-AAAA"));
  it("generates a complete human-readable order message", () => {
    const message = createOrderMessage(input);
    expect(message).toContain("Presentation");
    expect(message).toContain("Priority delivery (+25%): ₹112");
    expect(message).toContain("Total: ₹560");
    expect(message).toContain("Name: Arun");
  });
  it("creates URL-encoded official-style WhatsApp and Telegram URLs", () => {
    const message = createOrderMessage(input);
    expect(createWhatsAppOrderUrl("919876543210", message)).toBe(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`);
    expect(createTelegramOrderUrl("pageandslide_orders", message)).toBe(`https://t.me/pageandslide_orders?text=${encodeURIComponent(message)}`);
  });
  it("refuses placeholder or invalid recipients", () => {
    expect(createWhatsAppOrderUrl("91XXXXXXXXXX", "test")).toBeNull();
    expect(createTelegramOrderUrl("YOUR_USERNAME", "test")).toBeNull();
  });
});
