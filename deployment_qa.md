# SoftBazzar — Authoritative Final Preview QA Record

> **Authoritative status:** This document supersedes all earlier deployment summaries, including the obsolete `a2c9e9…` checkpoint. The current release candidate is the final Git-backed Vercel Preview described below; no production deployment, custom domain, or `main` merge has occurred.

## Current release candidate

| Item | Verified current value |
|---|---|
| Branch | `vercel-preview/softbazzar-qa-20260827` |
| Core production-gap repair | `a409fdbd773be61fe54857a661c4b8b3671c22a3` |
| Final release-preparation commits | `197dd2a57b97b6f605a39367f74de85a0a43c435`, `2602e2f71892eea537fcf414e4728531b6e4eb7f` |
| Current Vercel deployment | `dpl_HeoDbFgJbfdfEQ8JC9AgZ9u4pGXC` — `READY` |
| Preview URL | `https://softbazzar-gmjv9pvhl-pavithrans-projects-cae184b1.vercel.app` |
| Deployment mode | Protected Git-backed Preview; `target: null`; no custom domain; no production promotion; no `main` merge |

## Repaired production gaps

Valid WhatsApp and Telegram order actions are secure anchors with `target="_blank"` and `rel="noopener noreferrer"`; they no longer treat a `window.open()` return value as evidence of popup blocking. The footer turns configured contacts into direct links and gives visible, non-destructive unavailable feedback when placeholders remain. Focused valid-contact tests verify the WhatsApp and Telegram destinations and confirm that no false popup-blocked message appears.

Additional slide and Additional page remain visible, informational **non-addable** rates. They now read `₹15 each` / `₹8 each` above package, with a subtle `Add-on rate` annotation, and the cart validation layer rejects either as a standalone line. Checkout rejects past deadlines, provides a local datetime minimum, limits Name to 80 characters, Topic / Requirement to 200, and preserves Notes at 500. Telegram validation accepts only 5–32 character public-style names beginning with a letter and using letters, digits, or underscores; numeric/underscore prefixes are rejected. The only visible brand-copy change remains `FOR MCC STUDENTS`; the independent-service disclaimer remains unchanged.

## Final verification results

| Verification | Exact result |
|---|---|
| TypeScript | `pnpm check` passed. |
| Unit tests | `pnpm test`: **10 test files, 25 tests passed**. Focused coverage includes configured and placeholder contact actions, Telegram constraints, non-addable add-ons and copy, pricing, deadline validation, and field lengths. |
| Production build | `pnpm build` passed. |
| Local browser tests | `pnpm test:e2e`: **6 passed, 2 skipped**. The two skips are the protected-host test entries, which require `HOSTED_URL`. |
| Final hosted browser test | `HOSTED_URL=… pnpm exec playwright test -c playwright.hosted.config.ts`: **1 passed** in **54.6 seconds** against the current Preview. It covers widths 320–1440, no horizontal overflow, add-on non-addability/copy, cart and localStorage behaviour, deadline rejection, checkout math, safe placeholder channels, keyboard focus, and SPA fallback. |
| Final hosted Lighthouse | **Performance 99, Accessibility 95, Best Practices 100, SEO 66**. The Preview’s protection sets `X-Robots-Tag: noindex`, which correctly reduces only staging SEO crawlability. |

## Audited cleanup retained from the core repair

Removed only unreferenced template/debug artifacts: `client/public/.gitkeep`, `client/public/__manus__/debug-collector.js`, `client/src/components/ManusDialog.tsx`, `client/src/components/Map.tsx`, `client/src/const.ts`, and `shared/const.ts`. `client/src/hooks/usePersistFn.ts` remains because the active composition hook imports it. The approved hero, catalogue, typography, colours, spacing, and layout were not redesigned or restructured.
