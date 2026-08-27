# SoftBazzar — Authoritative Preview QA and Search-Readiness Record

> **Authoritative status:** This document supersedes all earlier deployment summaries, including the obsolete `a2c9e9…` checkpoint. **This release candidate has not been promoted to production, merged into main, or attached to a final custom domain.** Historical production deployments from `main` are preserved and outside this release-candidate record.

## Current release candidate

| Item | Verified current value |
|---|---|
| Branch | `vercel-preview/softbazzar-qa-20260827` |
| Core production-gap repair | `a409fdbd773be61fe54857a661c4b8b3671c22a3` |
| Prior release-preparation commits | `197dd2a57b97b6f605a39367f74de85a0a43c435`, `2602e2f71892eea537fcf414e4728531b6e4eb7f` |
| Search-readiness commits | `e4a424118bed72b93d6b31325971f6f166a43dc6`, `009f758f002e13494b7c2df75ba69a1c459ddfb9`, `c84d5d232c0bd8bf399ae048edb92c8f95e73051` |
| Current Vercel deployment | `dpl_Hk8oZRox1wyFz2TK4jmnv7LG7ELZ` — `READY` |
| Preview URL | `https://softbazzar-reuw4d5gx-pavithrans-projects-cae184b1.vercel.app` |
| Deployment mode | Protected Git-backed Preview; `target: null`. This release candidate has not been promoted to production, merged into `main`, or attached to a final custom domain. |

## Repaired production gaps

Valid WhatsApp and Telegram order actions are secure anchors with `target="_blank"` and `rel="noopener noreferrer"`; they no longer treat a `window.open()` return value as evidence of popup blocking. The footer turns the current centralized public contacts into direct links: `https://wa.me/919025857269` and `https://t.me/softbazzar`. Focused tests verify those destinations, full encoded checkout messages, and the safe invalid-contact fallback.

Additional slide and Additional page remain visible, informational **non-addable** rates. They now read `₹15 each` / `₹8 each` above package, with a subtle `Add-on rate` annotation, and the cart validation layer rejects either as a standalone line. Checkout rejects past deadlines, provides a local datetime minimum, limits Name to 80 characters, Topic / Requirement to 200, and preserves Notes at 500. Telegram validation accepts only 5–32 character public-style names beginning with a letter and using letters, digits, or underscores; numeric/underscore prefixes are rejected. The only visible brand-copy change remains `FOR MCC STUDENTS`; the independent-service disclaimer remains unchanged.

## Search, answer-engine, and generative-search readiness

The production canonical baseline is centralized at `https://softbazzar.vercel.app/` and used by the built canonical link, Open Graph URL, social image URL, Twitter card metadata, generated `robots.txt`, generated `sitemap.xml`, and JSON-LD. The bundled 1200×630 PNG social card is served from that canonical domain. The production crawl file allows ordinary crawlers and `OAI-SearchBot`; protected Preview deployments retain Vercel's `X-Robots-Tag: noindex` response.

The rendered JSON-LD passes `JSON.parse` validation and publishes only a truthful Organization, WebSite, and catalogue-derived Service/Offer graph. It uses the central service catalogue as the price source, INR as currency, the supplied telephone and Telegram presence, and excludes the non-purchasable add-on rates. It makes no local-business, address, review, rating, registration, hours, or MCC-affiliation claim. `search_launch.md` contains the remaining post-production Google Search Console, Bing Webmaster Tools, optional IndexNow, and OAI-SearchBot verification steps. No MCC survey findings were available in the repository, so no evidence section was added.

## Final verification results

| Verification | Exact result |
|---|---|
| TypeScript | `pnpm check` passed. |
| Unit tests | `pnpm test`: **12 test files, 29 tests passed**. Focused coverage includes the configured public contacts, centralized metadata/crawl generation, JSON-LD syntax and offer validity, Telegram constraints, non-addable add-ons and copy, pricing, deadline validation, and field lengths. |
| Production build | `pnpm build` passed. |
| Local browser tests | `pnpm test:e2e`: **6 passed, 2 skipped**. The two skips are the protected-host test entries, which require `HOSTED_URL`. |
| Final hosted browser test | `HOSTED_URL=… pnpm exec playwright test -c playwright.hosted.config.ts`: **1 passed** in **48.2 seconds** against the current Preview. It covers canonical/Open Graph/Twitter markup, JSON-LD parsing, robots and sitemap responses, widths 320–1440, no horizontal overflow, add-on non-addability/copy, cart and localStorage behaviour, deadline rejection, checkout math, configured deep links, keyboard focus, and SPA fallback. |
| Lighthouse context | The prior approved Preview recorded **Performance 99, Accessibility 95, Best Practices 100, SEO 66**. A fresh unauthenticated Lighthouse CLI attempt on the protected current Preview reached Vercel login rather than the app, so it is intentionally not recorded as an application score. The Preview continues to send `X-Robots-Tag: noindex`. |

## Audited cleanup retained from the core repair

Removed only unreferenced template/debug artifacts: `client/public/.gitkeep`, `client/public/__manus__/debug-collector.js`, `client/src/components/ManusDialog.tsx`, `client/src/components/Map.tsx`, `client/src/const.ts`, and `shared/const.ts`. `client/src/hooks/usePersistFn.ts` remains because the active composition hook imports it. The approved hero, catalogue, typography, colours, spacing, and layout were not redesigned or restructured.
