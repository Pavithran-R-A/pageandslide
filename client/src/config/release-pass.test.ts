import { createStructuredData } from "@/components/SearchStructuredData";
import { TELEGRAM_USERNAME } from "@/config/contact";
import { getRouteMetadata, PUBLIC_ROUTES } from "@/config/site";
import { SERVICE_CATEGORIES, SERVICE_PAGE_DETAILS } from "@/data/services";
import { ACCESSIBILITY_SECTIONS, ACADEMIC_SECTIONS, DELIVERY_SECTIONS, PRIVACY_SECTIONS, REFUND_SECTIONS, TERMS_SECTIONS } from "@/data/legal";
import { CART_STORAGE_KEY } from "@/lib/cart-storage";
import { createOrderReference } from "@/lib/order";
import { readFileSync } from "node:fs";
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
    const presentation = parsed["@graph"].find((node) => node["@id"] === "https://pageandslide.vercel.app/#service-presentations");
    expect(presentation).toBeTruthy();
    expect((presentation?.offers as Array<Record<string, unknown>>).every((offer) => offer.priceCurrency === "INR")).toBe(true);
    expect(serialized).not.toMatch(/MCC|Madras Christian College|fake|rating|aggregateRating/i);
  });

  it("keeps every customer-facing policy route represented", () => {
    expect(["/terms", "/privacy", "/refunds", "/delivery-revisions", "/academic-integrity", "/accessibility"]).toEqual(expect.arrayContaining(PUBLIC_ROUTES.map((route) => route.path).filter((path) => path.startsWith("/terms") || path.startsWith("/privacy") || path.startsWith("/refund") || path.startsWith("/delivery") || path.startsWith("/academic") || path.startsWith("/accessibility"))));
    expect([...TERMS_SECTIONS, ...PRIVACY_SECTIONS, ...REFUND_SECTIONS, ...DELIVERY_SECTIONS, ...ACADEMIC_SECTIONS, ...ACCESSIBILITY_SECTIONS].join(" ")).not.toMatch(/MCC|Madras Christian College|GSTIN|PAN|founder|fake address/i);
  });

  it("does not retain SoftBazzar operational identity in Page & Slide runtime configuration", () => {
    expect(TELEGRAM_USERNAME.toLowerCase()).not.toBe("softbazzar");
    expect(CART_STORAGE_KEY).toBe("pageandslide_cart_v1");
    expect(createOrderReference(new Date("2026-08-29T00:00:00Z"), () => 0)).toMatch(/^PS-20260829-/);
    const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as { name?: string };
    expect(packageJson.name).toBe("pageandslide");
  });

  it("does not turn unknown paths into indexable homepage soft-404s", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8")) as { rewrites?: Array<{ source: string; destination: string }> };
    expect(config.rewrites ?? []).not.toContainEqual({ source: "/(.*)", destination: "/index.html" });
    const notFoundHtml = readFileSync("client/public/404.html", "utf8");
    expect(notFoundHtml).toMatch(/Page not found/i);
    expect(notFoundHtml).toMatch(/noindex/i);
  });

  it("ships baseline browser security headers", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8")) as { headers?: Array<{ source: string; headers: Array<{ key: string; value: string }> }> };
    const headers = new Map((config.headers?.find((entry) => entry.source === "/(.*)")?.headers ?? []).map((entry) => [entry.key.toLowerCase(), entry.value]));
    expect(headers.get("x-content-type-options")).toBe("nosniff");
    expect(headers.get("referrer-policy")).toBeTruthy();
    expect(headers.get("content-security-policy")).toContain("default-src 'self'");
  });
});
