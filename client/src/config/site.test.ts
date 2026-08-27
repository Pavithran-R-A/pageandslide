import { createRobotsTxt, createSitemapXml, ORGANIZATION_DETAILS, SITE_METADATA, SITE_ORIGIN, SITE_URL } from "@/config/site";
import { describe, expect, it } from "vitest";

describe("production search configuration", () => {
  it("centralizes the canonical, metadata, and public contact baseline", () => {
    expect(SITE_ORIGIN).toBe("https://softbazzar.vercel.app");
    expect(SITE_URL).toBe("https://softbazzar.vercel.app/");
    expect(SITE_METADATA.canonicalUrl).toBe(SITE_URL);
    expect(SITE_METADATA.title).toBe("SoftBazzar | PPT & Report Services for MCC Students");
    expect(SITE_METADATA.socialImageUrl).toBe("https://softbazzar.vercel.app/softbazzar-social.png");
    expect(ORGANIZATION_DETAILS.telephone).toBe("+91 9025857269");
    expect(ORGANIZATION_DETAILS.telegramUrl).toBe("https://t.me/softbazzar");
  });

  it("generates crawl files on the same canonical origin and explicitly permits OAI-SearchBot", () => {
    const robots = createRobotsTxt();
    const sitemap = createSitemapXml();
    expect(robots).toContain("User-agent: OAI-SearchBot\nAllow: /");
    expect(robots).toContain("Sitemap: https://softbazzar.vercel.app/sitemap.xml");
    expect(sitemap).toContain("<loc>https://softbazzar.vercel.app/</loc>");
    expect(`${robots}\n${sitemap}`).not.toContain("softbazzar.example");
  });
});
