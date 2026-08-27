import { calculateOrderTotals, calculateSubtotal, formatRupees, resolveCartItems } from "@/lib/pricing";
import { describe, expect, it } from "vitest";

const presentation = { serviceId: "presentations", tierId: "11-to-15", quantity: 1 };
const report = { serviceId: "project-reports", tierId: "up-to-20", quantity: 1 };

describe("pricing", () => {
  it("resolves valid tier data and derives line totals", () => {
    expect(resolveCartItems([{ ...presentation, quantity: 2 }])[0]).toMatchObject({ serviceName: "Presentations", unitPrice: 249, lineTotal: 498 });
  });
  it("filters malformed entries and never surfaces an invalid amount", () => {
    expect(resolveCartItems([{ ...presentation, quantity: 0 }, { serviceId: "unknown", tierId: "x", quantity: 1 }])).toEqual([]);
    expect(formatRupees(Number.NaN)).toBe("₹0");
  });
  it("calculates a cart subtotal from line totals", () => {
    expect(calculateSubtotal([presentation, report])).toBe(448);
  });
  it("calculates whole-rupee priority and same-day fees", () => {
    expect(calculateOrderTotals([presentation, report], "priority")).toMatchObject({ subtotal: 448, deliveryFee: 112, total: 560 });
    expect(calculateOrderTotals([presentation], "same-day")).toMatchObject({ deliveryFee: 125, total: 374 });
  });
  it("defaults an unknown delivery type to standard pricing", () => {
    expect(calculateOrderTotals([presentation], "unknown")).toMatchObject({ deliveryRate: 0, deliveryFee: 0, total: 249, validDelivery: "standard" });
  });
});
