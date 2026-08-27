import { OrderDetailsDialog } from "@/components/OrderDetailsDialog";
import { CartProvider } from "@/contexts/CartContext";
import { CART_STORAGE_KEY } from "@/lib/cart-storage";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("OrderDetailsDialog", () => {
  beforeEach(() => { window.localStorage.clear(); window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ serviceId: "presentations", tierId: "11-to-15", quantity: 1 }])); });
  it("validates required fields and retains the order locally before channel choice", () => {
    render(<CartProvider><OrderDetailsDialog open onOpenChange={() => undefined} /></CartProvider>);
    fireEvent.click(screen.getByRole("button", { name: /review order/i }));
    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Describe the topic or requirement.")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Arun" } });
    fireEvent.change(screen.getByLabelText(/^Topic/), { target: { value: "Consumer behaviour" } });
    fireEvent.change(screen.getByLabelText(/^Deadline/), { target: { value: "2026-08-29T18:00" } });
    fireEvent.click(screen.getByLabelText(/Priority/));
    fireEvent.click(screen.getByRole("button", { name: /review order/i }));
    expect(screen.getByText("Ready to send")).toBeInTheDocument();
    expect(screen.getByText("₹311")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Order on WhatsApp/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("needs configuration");
  });
});
