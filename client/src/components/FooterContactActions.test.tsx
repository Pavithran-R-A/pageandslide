import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FooterContactActions } from "@/components/FooterContactActions";

describe("FooterContactActions", () => {
  it("renders the configured WhatsApp destination without borrowing SoftBazzar's Telegram identity", () => {
    render(<FooterContactActions />);
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/919025857269");
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("target", "_blank");
    expect(screen.queryByRole("link", { name: "Telegram" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Telegram" }));
    expect(screen.getByRole("status")).toHaveTextContent("Telegram contact is not configured yet.");
  });
  it("gives visible safe feedback when an invalid contact is supplied", () => {
    render(<FooterContactActions whatsappNumber="91XXXXXXXXXX" telegramUsername="YOUR_USERNAME" />);
    fireEvent.click(screen.getByRole("button", { name: "WhatsApp" }));
    expect(screen.getByRole("status")).toHaveTextContent("WhatsApp contact is not configured yet.");
  });
});
