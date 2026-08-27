import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CartProvider } from "@/contexts/CartContext";
import { ServiceCatalogue } from "@/components/ServiceCatalogue";

describe("ServiceCatalogue", () => {
  it("renders additional rows as informational and non-addable", () => {
    render(<CartProvider><ServiceCatalogue onAdded={() => undefined} /></CartProvider>);
    const additionalSlide = screen.getByText("Additional slide").closest(".tier-row");
    const additionalPage = screen.getByText("Additional page").closest(".tier-row");
    expect(additionalSlide).not.toBeNull();
    expect(additionalPage).not.toBeNull();
    expect(within(additionalSlide!).queryByRole("button", { name: "Add" })).not.toBeInTheDocument();
    expect(within(additionalPage!).queryByRole("button", { name: "Add" })).not.toBeInTheDocument();
    expect(within(additionalSlide!).getByText("Base service required")).toBeVisible();
  });
});
