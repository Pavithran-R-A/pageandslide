import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FooterContactActions } from "@/components/FooterContactActions";

describe("FooterContactActions", () => {
  it("renders secure direct links for the configured public contacts", () => {
    render(<FooterContactActions />);
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/919025857269");
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute("href", "https://t.me/softbazzar");
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("gives visible safe feedback when an invalid contact is supplied", () => {
    render(<FooterContactActions whatsappNumber="91XXXXXXXXXX" telegramUsername="YOUR_USERNAME" />);
    fireEvent.click(screen.getByRole("button", { name: "WhatsApp" }));
    expect(screen.getByRole("status")).toHaveTextContent("WhatsApp contact is not configured yet.");
  });
});
