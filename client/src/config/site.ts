import { TELEGRAM_USERNAME, WHATSAPP_NUMBER, createTelegramContactUrl, createWhatsAppContactUrl } from "./contact";

export const SITE_ORIGIN = "https://softbazzar.vercel.app";
export const SITE_URL = `${SITE_ORIGIN}/`;

export function toSiteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export const SITE_METADATA = {
  title: "SoftBazzar | PPT & Report Services for MCC Students",
  description: "Independent presentation, project-report formatting, notes and resume support for MCC students in Chennai. Clear pricing, editable files and direct WhatsApp or Telegram ordering.",
  canonicalUrl: SITE_URL,
  socialImageUrl: toSiteUrl("/softbazzar-social.png"),
  socialImageWidth: 1200,
  socialImageHeight: 630,
} as const;

export const ORGANIZATION_DETAILS = {
  id: `${SITE_URL}#organization`,
  name: "SoftBazzar",
  description: SITE_METADATA.description,
  url: SITE_URL,
  logo: toSiteUrl("/favicon.svg"),
  telephone: "+91 9025857269",
  whatsappUrl: createWhatsAppContactUrl(WHATSAPP_NUMBER),
  telegramUrl: createTelegramContactUrl(TELEGRAM_USERNAME),
} as const;

export function createRobotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: ${toSiteUrl("/sitemap.xml")}\n`;
}

export function createSitemapXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE_URL}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;
}
