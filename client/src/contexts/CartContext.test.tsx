import { CartProvider, cartReducer, useCart } from "@/contexts/CartContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function CartProbe() {
  const cart = useCart();
  return <><output data-testid="count">{cart.itemCount}</output><button onClick={() => cart.addItem("notes", "up-to-10")}>Add</button><button onClick={() => cart.increaseItem("notes", "up-to-10")}>Increase</button><button onClick={() => cart.decreaseItem("notes", "up-to-10")}>Decrease</button><button onClick={() => cart.removeItem("notes", "up-to-10")}>Remove</button></>;
}

describe("cart reducer and context", () => {
  it("adds duplicate lines by incrementing quantity", () => {
    render(<CartProvider><CartProbe /></CartProvider>);
    fireEvent.click(screen.getByText("Add")); fireEvent.click(screen.getByText("Add"));
    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });
  it("supports increase, decrease, and removing a cart line", () => {
    const item = { serviceId: "notes", tierId: "up-to-10", quantity: 1 };
    expect(cartReducer([item], { type: "increase", serviceId: "notes", tierId: "up-to-10" })[0].quantity).toBe(2);
    expect(cartReducer([item], { type: "decrease", serviceId: "notes", tierId: "up-to-10" })).toEqual([]);
    expect(cartReducer([item], { type: "remove", serviceId: "notes", tierId: "up-to-10" })).toEqual([]);
  });
});
