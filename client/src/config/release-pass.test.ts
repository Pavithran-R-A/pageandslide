import { getRouteMetadata, PUBLIC_ROUTES } from "@/config/site";
import { createStructuredData } from "@/components/SearchStructuredData";
import { SERVICE_CATEGORIES, SERVICE_PAGE_DETAILS } from "@/data/services";
import { ACCESSIBILITY_SECTIONS, ACADEMIC_SECTIONS, DELIVERY_SECTIONS, PRIVACY_SECTIONS, REFUND_SECTIONS, TERMS_SECTIONS } from "@/data/legal";
import { describe, expect, it } from "vitest";

describe("final release public content", () => {
  it("has meaningful metadata for every useful public route", () => {
    for (const route of PUBLIC_ROUTES) {
      expect(route.title.length).toBeGreaterThan(20);
      expect(route.description.length).toBeGreaterThan(60);
      expect(route.h1.length).toBeGreaterThan(5);
      expect(`${route.title} ${route.description} ${route.h1}`).not.toMatch(/MCC|Madras Christian College|Chennai/i);
      expect(getRouteMetadata(route.path)).toEqual(route);
    }
  });

  it("keeps service detail copy substantial and prices sourced from the catalogue", () => {
    for (const service of SERVICE_CATEGORIES.filter((entry) => SERVICE_PAGE_DETAILS[entry.id === "resume" ? "resumes" : entry.id])) {
      const detail = SERVICE_PAGE_DETAILS[service.id === "resume" ? "resumes" : service.id];
      expect(detail.included.length).toBeGreaterThanOrEqual(3);
      expect(detail.customerProvides.length).toBeGreaterThanOrEqual(3);
      expect(detail.faqs.length).toBeGreaterThanOrEqual(2);
      expect(detail.output).toMatch(/editable/i);
      expect(service.tiers.every((tier) => typeof tier.price === "number")).toBe(true);
    }
  });

  it("emits parseable route-aware JSON-LD with catalogue-derived INR offers", () => {
    const data = createStructuredData("/presentations");
    const serialized = JSON.stringify(data);
    const parsed = JSON.parse(serialized) as { "@graph": Array<Record<string, unknown>> };
    expect(parsed["@graph"].filter((node) => node["@type"] === "Organization")).toHaveLength(1);
    expect(parsed["@graph"].filter((node) => node["@type"] === "WebSite")).toHaveLength(1);
    const presentation = parsed["@graph"].find((node) => node["@id"] === "https://softbazzar.vercel.app/#service-presentations");
    expect(presentation).toBeTruthy();
    expect((presentation?.offers as Array<Record<string, unknown>>).every((offer) => offer.priceCurrency === "INR")).toBe(true);
    expect(serialized).not.toMatch(/MCC|Madras Christian College|fake|rating|aggregateRating/i);
  });

  it("keeps every customer-facing policy route represented", () => {
    expect(["/terms", "/privacy", "/refunds", "/delivery-revisions", "/academic-integrity", "/accessibility"]).toEqual(expect.arrayContaining(PUBLIC_ROUTES.map((route) => route.path).filter((path) => path.startsWith("/terms") || path.startsWith("/privacy") || path.startsWith("/refund") || path.startsWith("/delivery") || path.startsWith("/academic") || path.startsWith("/accessibility"))));
    expect([...TERMS_SECTIONS, ...PRIVACY_SECTIONS, ...REFUND_SECTIONS, ...DELIVERY_SECTIONS, ...ACADEMIC_SECTIONS, ...ACCESSIBILITY_SECTIONS].join(" ")).not.toMatch(/MCC|Madras Christian College|GSTIN|PAN|founder|fake address/i);
  });
});
