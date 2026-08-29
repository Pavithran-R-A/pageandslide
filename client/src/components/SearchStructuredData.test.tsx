import { SearchStructuredData } from "@/components/SearchStructuredData";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("SearchStructuredData", () => {
  it("publishes valid Organization, WebSite, and truthful purchasable service offers", () => {
    const { container } = render(<SearchStructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const graph = JSON.parse(script?.textContent ?? "{}") as { "@context": string; "@graph": Array<Record<string, unknown>> };
    expect(graph["@context"]).toBe("https://schema.org");
    const organization = graph["@graph"].find((entry) => entry["@type"] === "Organization");
    const website = graph["@graph"].find((entry) => entry["@type"] === "WebSite");
    const services = graph["@graph"].filter((entry) => entry["@type"] === "Service");
    const offers = services.flatMap((entry) => entry.offers as Array<{ name: string; price: number; priceCurrency: string }>);
    expect(organization).toMatchObject({ name: "Page & Slide", telephone: "+91 9025857269" });
    expect(organization).not.toHaveProperty("sameAs");
    expect(website).toMatchObject({ name: "Page & Slide", url: "https://pageandslide.vercel.app/" });
    expect(services).toHaveLength(6);
    expect(offers).toContainEqual(expect.objectContaining({ name: "Up to 5 slides", price: 99, priceCurrency: "INR" }));
    expect(offers.map((offer) => offer.name)).not.toContain("Additional slide");
    expect(offers.map((offer) => offer.name)).not.toContain("Additional page");
  });
});
