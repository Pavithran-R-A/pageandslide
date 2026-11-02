import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "@/App";

describe("service routes", () => {
  afterEach(() => window.history.replaceState({}, "", "/"));

  it("opens the combination pricing service from its catalogue route", () => {
    window.history.replaceState({}, "", "/combinations");
    render(<App />);

    expect(screen.getByRole("heading", { name: /presentation and report bundles/i })).toBeInTheDocument();
    expect(screen.getByText("15-slide Presentation + 20-page Report")).toBeInTheDocument();
  });
});
