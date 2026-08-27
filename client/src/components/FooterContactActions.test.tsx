import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FooterContactActions } from "@/components/FooterContactActions";

describe("FooterContactActions", () => {
  it("renders secure direct links when contacts are valid", () => {
    render(<FooterContactActions whatsappNumber="919876543210" telegramUsername="softbazzar_test" />);
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/919876543210");
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute("href", "https://t.me/softbazzar_test");
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("gives visible safe feedback for placeholders", () => {
    render(<FooterContactActions />);
    fireEvent.click(screen.getByRole("button", { name: "WhatsApp" }));
    expect(screen.getByRole("status")).toHaveTextContent("WhatsApp contact is not configured yet.");
  });
});
