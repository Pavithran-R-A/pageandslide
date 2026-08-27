import { TELEGRAM_USERNAME, WHATSAPP_NUMBER, createTelegramContactUrl, createWhatsAppContactUrl } from "./contact";

/**
 * The only production-origin constant used by public metadata and absolute links.
 * Set VITE_PUBLIC_SITE_URL when a custom domain is deliberately connected.
 */
const viteEnv = (import.meta as ImportMeta & { env?: Readonly<Record<string, string | undefined>> }).env ?? {};
const runtimeEnv = (globalThis as typeof globalThis & { process?: { env?: Readonly<Record<string, string | undefined>> } }).process?.env ?? {};
export const PUBLIC_SITE_URL = (viteEnv.VITE_PUBLIC_SITE_URL || runtimeEnv.VITE_PUBLIC_SITE_URL || "https://softbazzar.vercel.app").replace(/\/+$/, "");
export const SITE_ORIGIN = PUBLIC_SITE_URL;
export const SITE_URL = `${SITE_ORIGIN}/`;
export const LEGAL_CONTACT_EMAIL = (viteEnv.VITE_LEGAL_CONTACT_EMAIL || runtimeEnv.VITE_LEGAL_CONTACT_EMAIL || "").trim();

export function toSiteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export const SITE_METADATA = {
  title: "SoftBazzar | College work, professionally presented",
  description: "Presentation design, assignment support, project reports, notes and resumes for college students. Clear INR pricing, editable files and direct WhatsApp or Telegram ordering.",
  canonicalUrl: SITE_URL,
  socialImageUrl: toSiteUrl("/softbazzar-social.png"),
  socialImageWidth: 1200,
  socialImageHeight: 630,
} as const;

export type PublicRoute = Readonly<{
  path: string;
  title: string;
  description: string;
  h1: string;
  summary: string;
  indexable: boolean;
}>;

const ROUTE_DEFINITIONS: readonly PublicRoute[] = [
  { path: "/", title: SITE_METADATA.title, description: SITE_METADATA.description, h1: "Your college work, professionally presented.", summary: "Choose a presentation, report, notes, resume or assignment-support service, review the price upfront, and send your brief through WhatsApp or Telegram.", indexable: true },
  { path: "/presentations", title: "Presentation Design for College Students | SoftBazzar", description: "Editable presentation design for college students, with clear INR pricing, considered slide layouts and direct WhatsApp or Telegram ordering.", h1: "Presentations that make the point clearly.", summary: "Choose an editable presentation package by slide count, from up to 5 slides at ₹99.", indexable: true },
  { path: "/assignment-support", title: "Assignment Support and Formatting | SoftBazzar", description: "Assignment formatting, editing, organisation and presentation support for college students, with transparent INR pricing and editable output.", h1: "Assignment support, with structure.", summary: "Get help with formatting, editing, organisation and presentation polish, with packages from ₹79.", indexable: true },
  { path: "/project-reports", title: "Project Report Formatting for College Students | SoftBazzar", description: "Project report formatting and presentation polish for college students, with editable files, transparent INR pricing and direct ordering.", h1: "Project reports with a considered finish.", summary: "Choose an editable project-report package by page count, from up to 20 pages at ₹199.", indexable: true },
  { path: "/notes", title: "Study Notes Formatting and Organisation | SoftBazzar", description: "Clear, organised and consistently formatted study notes for college students, with upfront INR pricing and editable delivery.", h1: "Notes made easier to return to.", summary: "Choose a notes package by page count, from up to 10 pages at ₹79.", indexable: true },
  { path: "/resumes", title: "Student Resume Design and ATS Support | SoftBazzar", description: "Focused student resume design and ATS-friendly resume support, with editable output and clear INR pricing.", h1: "A resume that reads like you mean it.", summary: "Choose a Student Resume from ₹199 or an ATS-friendly Resume from ₹299.", indexable: true },
  { path: "/terms", title: "Terms of Service | SoftBazzar", description: "Plain-English terms for SoftBazzar digital student-support services, ordering, payment, delivery, revisions and customer responsibilities.", h1: "Terms of Service", summary: "The terms that explain service scope, ordering, delivery, revisions, cancellations and responsible use.", indexable: true },
  { path: "/privacy", title: "Privacy Policy | SoftBazzar", description: "How SoftBazzar handles cart data, order details, WhatsApp and Telegram sharing, third-party services and customer privacy requests.", h1: "Privacy Policy", summary: "A clear explanation of what stays in your browser, what is shared only when you choose a channel, and how to make a privacy request.", indexable: true },
  { path: "/refunds", title: "Refunds and Cancellations | SoftBazzar", description: "SoftBazzar's fair refund and cancellation policy for digital student-support services, including work already started and missed priority deadlines.", h1: "Refunds & cancellations", summary: "A fair route for cancellations before work begins, corrections when delivery materially fails, and scope changes.", indexable: true },
  { path: "/delivery-revisions", title: "Delivery and Revisions Policy | SoftBazzar", description: "SoftBazzar delivery speeds, 24-hour priority, same-day service, revision scope and editable-file policy.", h1: "Delivery & revisions", summary: "Standard timing is confirmed after review; priority is +25%, same-day is +50%, and two minor revisions are included.", indexable: true },
  { path: "/academic-integrity", title: "Academic Integrity and Acceptable Use | SoftBazzar", description: "SoftBazzar's academic-integrity and acceptable-use policy for presentation, formatting, editing, notes, resume and research-organisation support.", h1: "Academic integrity & acceptable use", summary: "SoftBazzar supports legitimate presentation and document work, while students remain responsible for following their institution's rules.", indexable: true },
  { path: "/contact", title: "Contact SoftBazzar | WhatsApp and Telegram Ordering", description: "Contact SoftBazzar through the configured WhatsApp or Telegram channels, with a clear support and grievance process.", h1: "Contact SoftBazzar", summary: "Send an order brief through WhatsApp or Telegram, or use the support process when you need help with an existing order.", indexable: true },
  { path: "/accessibility", title: "Accessibility Statement | SoftBazzar", description: "SoftBazzar's accessibility statement and ongoing WCAG 2.2 AA-oriented approach to keyboard, screen-reader and responsive access.", h1: "Accessibility statement", summary: "SoftBazzar aims to keep its storefront usable with keyboards, assistive technology, zoom, reduced motion and varied screen sizes.", indexable: true },
];

export const PUBLIC_ROUTES = ROUTE_DEFINITIONS;
export const ROUTE_METADATA: Readonly<Record<string, PublicRoute>> = Object.fromEntries(ROUTE_DEFINITIONS.map((route) => [route.path, route]));

export function getRouteMetadata(pathname: string): PublicRoute {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return ROUTE_METADATA[normalized] ?? { path: "/404", title: "Page Not Found | SoftBazzar", description: "The requested SoftBazzar page could not be found.", h1: "Page Not Found", summary: "The page you requested is not available.", indexable: false };
}

export const ORGANIZATION_DETAILS = {
  id: `${SITE_URL}#organization`,
  name: "SoftBazzar",
  description: SITE_METADATA.description,
  url: SITE_URL,
  logo: toSiteUrl("/logo-mark.svg"),
  telephone: "+91 9025857269",
  whatsappUrl: createWhatsAppContactUrl(WHATSAPP_NUMBER),
  telegramUrl: createTelegramContactUrl(TELEGRAM_USERNAME),
} as const;

export const RELEASE_CONFIGURATION = {
  publicSiteUrl: SITE_ORIGIN,
  whatsappConfigured: Boolean(ORGANIZATION_DETAILS.whatsappUrl),
  telegramConfigured: Boolean(ORGANIZATION_DETAILS.telegramUrl),
  legalContactEmailConfigured: Boolean(LEGAL_CONTACT_EMAIL),
  blockers: [
    ...(!LEGAL_CONTACT_EMAIL ? ["Set VITE_LEGAL_CONTACT_EMAIL before final production"] : []),
    "Confirm any legally required operator or business disclosures before final production",
  ],
} as const;

export function createRobotsTxt(options: Readonly<{ preview?: boolean }> = {}): string {
  if (options.preview) {
    return `User-agent: *\nDisallow: /\n\nUser-agent: OAI-SearchBot\nDisallow: /\n\nSitemap: ${toSiteUrl("/sitemap.xml")}\n`;
  }
  return `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: ${toSiteUrl("/sitemap.xml")}\n`;
}

export function createSitemapXml(): string {
  const urls = PUBLIC_ROUTES.filter((route) => route.indexable).map((route) => `  <url>\n    <loc>${toSiteUrl(route.path)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${route.path === "/" ? "1.0" : route.path.startsWith("/") && !route.path.includes("-") ? "0.8" : "0.6"}</priority>\n  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
