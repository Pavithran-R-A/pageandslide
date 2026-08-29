import { ContactPage } from "@/pages/LegalPage";
import { CartProvider } from "@/contexts/CartContext";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Page & Slide contact page", () => {
  it("uses the configured Page & Slide channels without borrowing the SoftBazzar Telegram identity", () => {
    render(<CartProvider><ContactPage /></CartProvider>);
    expect(screen.getByRole("link", { name: "Open WhatsApp" })).toHaveAttribute("href", "https://wa.me/919025857269");
    expect(screen.queryByRole("link", { name: "Open Telegram" })).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/softbazzar/i);
  });
});
