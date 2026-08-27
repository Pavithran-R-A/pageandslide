import { describe, expect, it } from "vitest";
import { findPurchasableServiceTier, findServiceTier } from "@/data/services";
import { isValidCartItem, resolveCartItems } from "@/lib/pricing";

describe("add-on purchasing rules", () => {
  it("keeps additional slide and page prices visible but rejects them as standalone cart products", () => {
    expect(findServiceTier("presentations", "additional-slide")?.tier.price).toBe(15);
    expect(findServiceTier("assignment-support", "additional-page")?.tier.price).toBe(8);
    expect(findPurchasableServiceTier("presentations", "additional-slide")).toBeNull();
    expect(findPurchasableServiceTier("assignment-support", "additional-page")).toBeNull();
    expect(isValidCartItem({ serviceId: "presentations", tierId: "additional-slide", quantity: 1 })).toBe(false);
    expect(resolveCartItems([{ serviceId: "assignment-support", tierId: "additional-page", quantity: 1 }])).toEqual([]);
  });
});
