# SoftBazzar — Authoritative Release Status

> **Status:** This document is the single authoritative deployment and QA record. Earlier deployment summaries and the obsolete `a2c9e9…` final summary are superseded. Historical manual-manifest attempts are intentionally omitted here because they no longer describe the release candidate.

## Current source and deployment baseline

| Item | Current verified baseline |
|---|---|
| Branch | `vercel-preview/softbazzar-qa-20260827` |
| Source commit | `a409fdbd773be61fe54857a661c4b8b3671c22a3` |
| Vercel deployment | `dpl_2NsyAxw6SBkegLZNrZ2SqHPowzE6` — `READY` |
| Preview URL | `https://softbazzar-dre9x31pa-pavithrans-projects-cae184b1.vercel.app` |
| Release mode | Git-backed protected Vercel Preview; no custom domain, no production promotion, no `main` merge |

## Production gaps repaired in the current baseline

The corrected source uses secure anchor links with `target="_blank"` and `rel="noopener noreferrer"` for valid WhatsApp and Telegram destinations. This removes the false popup-blocked path caused by interpreting `window.open` with `noopener` as a failure. Valid-contact component tests assert both generated destinations and the absence of the erroneous popup-blocked feedback.

Footer contact controls now become genuine direct links when configured, while placeholder values keep their existing safe state and provide visible, non-destructive unavailable feedback. The Additional slide ₹15 and Additional page ₹8 rows are modelled as visible, non-addable rates and are rejected by both UI and cart validation. The checkout rejects past deadlines, supplies a local `datetime-local` minimum, limits Name to 80 characters, Topic / Requirement to 200, and Notes to 500. The hero eyebrow reads `FOR MCC STUDENTS`; the independent-service footer disclaimer remains intact.

## Verified quality baseline

| Verification area | Result |
|---|---|
| TypeScript and production build | Passed. |
| Vitest | 23 of 23 tests passed across 9 test files. |
| Local Playwright | 6 applicable checks passed; 2 protected-host entries were skipped when no hosted URL was supplied. |
| Hosted Vercel Playwright | Passed against the current Preview. It verified widths from 320 to 1440 pixels, cart persistence, quantity changes, safe placeholder contacts, form validation, delivery math, focus restoration, direct routing, console state, and response failures. |
| Hosted pricing checks | Presentation 11–15 slides ₹249; mixed cart ₹448; priority total ₹560; same-day total ₹672. |
| Hosted Lighthouse | Performance 99, Accessibility 95, Best Practices 100, SEO 66. Preview protection correctly sends `X-Robots-Tag: noindex`, which is the sole reason the protected staging URL is not crawlable. |

## Audited cleanup

Removed only unreferenced template/debug artifacts: `client/public/.gitkeep`, `client/public/__manus__/debug-collector.js`, `client/src/components/ManusDialog.tsx`, `client/src/components/Map.tsx`, `client/src/const.ts`, and `shared/const.ts`. The public debug artifact and Vite debug/storage proxy were removed together. `client/src/hooks/usePersistFn.ts` was retained because the active composition hook imports it.

## Pending final release-preparation update

The approved add-on wording and tightened Telegram validation are being applied after this baseline. Once their focused tests, full local release gate, hosted QA, and a fresh Preview deployment complete, this document will be updated in place with that successor commit, deployment URL, exact test counts, and actual Lighthouse results.
