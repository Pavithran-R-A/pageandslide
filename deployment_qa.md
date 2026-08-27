# SoftBazzar — Authoritative Preview QA and Search-Readiness Record

> **Authoritative status:** This document supersedes earlier deployment summaries. The final release pass remains a protected Preview only: it has not been promoted to production, merged into `main`, attached to a custom domain, or submitted for search indexing.

## Current release candidate

| Item | Verified current value |
|---|---|
| Repository | `Pavithran-R-A/softbazzar` |
| Branch | `vercel-preview/softbazzar-qa-20260827` |
| Starting HEAD | `39b90cb04c26f25f083bac14926d388daa9838d8` |
| Final HEAD | `fd115a8036f7467d10d8abc5a4b1e30090c4611a` |
| Existing Vercel project | `softbazzar` — `prj_q3cMbX3jlTvZv92oXOCaH3HdtjqI` |
| Current Vercel deployment | `dpl_HkKSAVpb45vtZti8U2cdp7cWvzEs` — `READY` |
| Preview URL | `https://softbazzar-icfyoasqj-pavithrans-projects-cae184b1.vercel.app` |
| Deployment mode | Protected Git-backed Preview; `target: null`. No duplicate project was created and `main` was not modified. |

## Final product and trust pass

SoftBazzar now presents a broad college-student storefront for presentations, assignment support, project reports, notes and resumes. The homepage leads with a clear “Your college work, professionally presented.” proposition, visible pricing anchors, a restrained editorial palette, service-specific routes, a clear brief-to-order process, answer-engine-friendly FAQs, and a final direct-order CTA.

A shared storefront layout keeps the previously verified cart, checkout, WhatsApp and Telegram actions available on homepage, service and legal routes. Direct order actions remain secure anchors with `target="_blank"` and `rel="noopener noreferrer"`; the footer uses the configured destinations `https://wa.me/919025857269` and `https://t.me/softbazzar`. The cart identifier `softbazzar_cart_v1`, validation, quantities, delivery surcharges, deadline checks and local-only checkout fields remain preserved.

Additional slide and Additional page remain informational **non-addable** rates at `₹15 each` and `₹8 each` above package. Detail routes use the central catalogue as their pricing source. Legal pages cover Terms, Privacy, Refunds, Delivery and revisions, Academic Integrity, Accessibility, and Contact/grievance guidance without inventing an email address, legal entity, address, registration number, reviews, ratings or institutional affiliation. The missing legal email is recorded as an explicit production blocker in `release_configuration.md`.

## Search, answer-engine, and generative-search readiness

The production canonical baseline is centralized at `https://softbazzar.vercel.app/` and is used for canonical links, Open Graph and Twitter metadata, the source-controlled `1200×630` social card, generated `robots.txt`, generated `sitemap.xml`, and JSON-LD. The build now prerenders meaningful initial HTML and route-specific metadata for the homepage, five service routes and seven customer-facing legal/contact routes. Preview builds generate closed crawl files and route metadata with `noindex, nofollow`; Vercel protection remains enabled.

The route-aware JSON-LD passes `JSON.parse` validation and publishes a truthful Organization, WebSite, WebPage and catalogue-derived Service/Offer graph. Offers use INR and exclude non-purchasable add-on rates. No MCC, Madras Christian College, local-business, address, review, rating, registration, hours or affiliation claim remains in customer-facing content. `search_launch.md` retains the post-production Google Search Console, Bing Webmaster Tools, optional IndexNow and OAI-SearchBot verification steps. Search indexing has not been requested for the protected Preview.

## Final verification results

| Verification | Exact result |
|---|---|
| Branch safety | Final local and remote HEAD are `fd115a8036f7467d10d8abc5a4b1e30090c4611a` on `vercel-preview/softbazzar-qa-20260827`; working tree is clean after push. |
| TypeScript | `pnpm check` passed. |
| Unit tests | `pnpm test`: **13 test files, 34 tests passed**. Coverage includes contacts, metadata/crawl generation, route metadata, JSON-LD syntax and offer validity, legal-route representation, non-addable add-ons, pricing, deadline validation, checkout fields and cart persistence. |
| Production build | `pnpm build` passed, including SEO file generation, Vite build, route prerendering and server bundling. |
| Local browser tests | `pnpm test:e2e`: **6 passed, 2 skipped**. The two skips are the protected-host entries requiring `HOSTED_URL`. |
| Final hosted browser test | `HOSTED_URL=… pnpm exec playwright test -c playwright.hosted.config.ts`: **1 passed** in **22.8 seconds** against the final Preview. It covers route-specific canonical metadata, Open Graph/Twitter markup, JSON-LD parsing, protected-preview robots/sitemap responses, widths 320–1440, no horizontal overflow, route residue checks, detail-page add-to-cart, cart/localStorage behaviour, deadline rejection, checkout math, configured deep links, keyboard focus, and SPA fallback. |
| Visual QA | Fresh local captures were inspected for desktop/mobile homepage, presentation detail, Terms, cart and checkout states. The editorial hierarchy, palette, responsive composition, pricing card, legal typography and mobile sticky cart bar were accepted with no obvious visual defects. |
| Lighthouse context | The earlier approved Preview recorded **Performance 99, Accessibility 95, Best Practices 100, SEO 66**. A fresh unauthenticated Lighthouse CLI attempt on the protected current Preview reached Vercel login rather than the application, so no new unauthenticated application score is claimed. |

## Explicit production blockers

The Preview is ready for review, not final production promotion. Before production, configure and verify `VITE_LEGAL_CONTACT_EMAIL`, confirm any required operator/business disclosures, deliberately select the one canonical public origin, retest WhatsApp and Telegram destinations, then follow `search_launch.md`. No domain purchase, production promotion, main-branch change or indexing request was performed.

## Retained cleanup and verified work

Previously verified cart, checkout, WhatsApp/Telegram, accessibility and deployment work was preserved. Only unreferenced template/debug artifacts are excluded from the active product; the active persistence and composition modules remain in use. The release pass adds original source-controlled SoftBazzar identity assets, a deterministic social-card generator, route-aware metadata/schema, pre-rendered public routes, centralized legal copy, and explicit release configuration documentation.
