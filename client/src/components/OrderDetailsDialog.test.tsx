import { CartProvider } from "@/contexts/CartContext";
import { CART_STORAGE_KEY } from "@/lib/cart-storage";
import { OrderDetailsDialog } from "@/components/OrderDetailsDialog";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function renderDialog(props: Partial<React.ComponentProps<typeof OrderDetailsDialog>> = {}) {
  return render(<CartProvider><OrderDetailsDialog open onOpenChange={() => undefined} {...props} /></CartProvider>);
}

function completeRequiredDetails(deadline = "2026-08-29T18:00"): void {
  fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Arun" } });
  fireEvent.change(screen.getByLabelText(/^Topic/), { target: { value: "Consumer behaviour" } });
  fireEvent.change(screen.getByLabelText(/^Deadline/), { target: { value: deadline } });
}

describe("OrderDetailsDialog", () => {
  beforeEach(() => { window.localStorage.clear(); window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ serviceId: "presentations", tierId: "11-to-15", quantity: 1 }])); });
  afterEach(() => vi.useRealTimers());

  it("validates required fields and retains the order locally before a placeholder channel choice", () => {
    renderDialog();
    fireEvent.click(screen.getByRole("button", { name: /review order/i }));
    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Describe the topic or requirement.")).toBeInTheDocument();
    completeRequiredDetails();
    fireEvent.click(screen.getByLabelText(/Priority/));
    fireEvent.click(screen.getByRole("button", { name: /review order/i }));
    expect(screen.getByText("Ready to send")).toBeInTheDocument();
    expect(screen.getByText("₹311")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Order on WhatsApp/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("needs configuration");
  });

  it("rejects a past deadline and exposes deterministic minimum and length limits", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-27T12:00:30"));
    renderDialog();
    expect(screen.getByLabelText(/^Name/)).toHaveAttribute("maxlength", "80");
    expect(screen.getByLabelText(/^Topic/)).toHaveAttribute("maxlength", "200");
    expect(screen.getByLabelText(/Additional notes/)).toHaveAttribute("maxlength", "500");
    expect(screen.getByLabelText(/^Deadline/)).toHaveAttribute("min", "2026-08-27T12:01");
    completeRequiredDetails("2026-08-27T11:59");
    fireEvent.click(screen.getByRole("button", { name: /review order/i }));
    expect(screen.getByText("Choose a deadline in the future.")).toBeInTheDocument();
  });

  it("renders secure valid channel destinations without a false popup-blocked error", () => {
    renderDialog({ whatsappNumber: "919876543210", telegramUsername: "softbazzar_test" });
    completeRequiredDetails();
    fireEvent.click(screen.getByRole("button", { name: /review order/i }));
    const whatsapp = screen.getByRole("link", { name: /Order on WhatsApp/i });
    const telegram = screen.getByRole("link", { name: /Order on Telegram/i });
    expect(whatsapp).toHaveAttribute("href", expect.stringMatching(/^https:\/\/wa\.me\/919876543210\?text=/));
    expect(telegram).toHaveAttribute("href", expect.stringMatching(/^https:\/\/t\.me\/softbazzar_test\?text=/));
    expect(whatsapp).toHaveAttribute("target", "_blank");
    expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByText(/prevented the order window/i)).not.toBeInTheDocument();
  });
});
