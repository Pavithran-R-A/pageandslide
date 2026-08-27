import { CART_STORAGE_KEY, readStoredCart, writeStoredCart } from "@/lib/cart-storage";
import { beforeEach, describe, expect, it } from "vitest";

describe("cart storage", () => {
  beforeEach(() => window.localStorage.clear());
  it("persists only valid cart rows", () => {
    writeStoredCart([{ serviceId: "notes", tierId: "up-to-10", quantity: 2 }]);
    expect(readStoredCart()).toEqual([{ serviceId: "notes", tierId: "up-to-10", quantity: 2 }]);
  });
  it("recovers gracefully from malformed local storage", () => {
    window.localStorage.setItem(CART_STORAGE_KEY, "not-json");
    expect(readStoredCart()).toEqual([]);
  });
  it("drops unknown, zero, and negative quantities", () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ serviceId: "notes", tierId: "up-to-10", quantity: 0 }, { serviceId: "missing", tierId: "missing", quantity: 1 }, { serviceId: "notes", tierId: "up-to-10", quantity: -2 }]));
    expect(readStoredCart()).toEqual([]);
  });
});
