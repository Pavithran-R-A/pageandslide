import { createRobotsTxt, createSitemapXml, getRouteMetadata, ORGANIZATION_DETAILS, PUBLIC_ROUTES, RELEASE_CONFIGURATION, SITE_METADATA, SITE_ORIGIN, SITE_URL } from "@/config/site";
import { describe, expect, it } from "vitest";

describe("production search configuration", () => {
  it("centralizes the canonical, broad-audience metadata, and public contact baseline", () => {
    expect(SITE_ORIGIN).toBe("https://pageandslide.vercel.app");
    expect(SITE_URL).toBe("https://pageandslide.vercel.app/");
    expect(SITE_METADATA.canonicalUrl).toBe(SITE_URL);
    expect(SITE_METADATA.title).toBe("Page & Slide | PPTs, Reports, Notes & Resumes for Students");
    expect(SITE_METADATA.description).toContain("students");
    expect(SITE_METADATA.title).not.toMatch(/MCC|Madras Christian College/i);
    expect(SITE_METADATA.socialImageUrl).toBe("https://pageandslide.vercel.app/page-and-slide-social.png");
    expect(ORGANIZATION_DETAILS.telephone).toBe("+91 9025857269");
    expect(ORGANIZATION_DETAILS.whatsappUrl).toBe("https://wa.me/919025857269");
    expect(ORGANIZATION_DETAILS.telegramUrl).toBeNull();
  });

  it("generates production crawl files on the same canonical origin and explicitly permits OAI-SearchBot", () => {
    const robots = createRobotsTxt();
    const sitemap = createSitemapXml();
    expect(robots).toContain("User-agent: OAI-SearchBot\nAllow: /");
    expect(robots).toContain("Sitemap: https://pageandslide.vercel.app/sitemap.xml");
    expect(sitemap).toContain("<loc>https://pageandslide.vercel.app/</loc>");
    for (const route of PUBLIC_ROUTES) expect(sitemap).toContain(`<loc>https://pageandslide.vercel.app${route.path === "/" ? "/" : route.path}</loc>`);
    expect(`${robots}\n${sitemap}`).not.toMatch(/softbazzar\.example|MCC|Madras Christian College/i);
  });

  it("keeps preview crawl instructions closed while optional contact configuration stays truthful", () => {
    expect(createRobotsTxt({ preview: true })).toContain("User-agent: *\nDisallow: /");
    expect(createRobotsTxt({ preview: true })).toContain("User-agent: OAI-SearchBot\nDisallow: /");
    expect(getRouteMetadata("/resumes").title).toContain("Resume");
    expect(RELEASE_CONFIGURATION.whatsappConfigured).toBe(true);
    expect(RELEASE_CONFIGURATION.telegramConfigured).toBe(false);
    expect(RELEASE_CONFIGURATION.legalContactEmailConfigured).toBe(false);
    expect(RELEASE_CONFIGURATION.blockers).toEqual([]);
  });
});
