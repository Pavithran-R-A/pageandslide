# Page & Slide — Authoritative Preview QA and Search-Readiness Record

> **Status:** This rebrand release candidate remains a protected Preview only. It has not been promoted to production, merged into `main`, attached to a custom domain or submitted for search indexing.

## Current release candidate

| Item | Verified value |
|---|---|
| Repository | `Pavithran-R-A/softbazzar` |
| Branch | `vercel-preview/softbazzar-qa-20260827` |
| Starting HEAD | `9fde075238894d37a7e185b5597659060f2ef176` |
| Final rebrand HEAD | `bd2e5ac0302074637d4e8d2155e6601a61c6ddeb` |
| Existing Vercel project | `softbazzar` — `prj_q3cMbX3jlTvZv92oXOCaH3HdtjqI` |
| Final Preview deployment | `dpl_w83D8SpqCuf8BtTcEQ2mRFRco21C` — `READY` |
| Final Preview URL | `https://softbazzar-1uniefjjm-pavithrans-projects-cae184b1.vercel.app` |
| Deployment mode | Protected Git-backed Preview; `target: null`. No duplicate project was created and `main` was not modified. |

## Page & Slide product and brand pass

Page & Slide now presents the approved broad college-student storefront with the brand display `PAGE & SLIDE`, descriptor `PPTs · Reports · Notes · Resumes`, and preserved hero `Your college work, professionally presented.` The luxury warm-ivory, charcoal, burgundy and champagne-gold system, service routes, legal routes and editorial layout remain intact.

The old SB geometry has been replaced by an original geometric P&S / PS monogram in the square mark, scalable wordmark, favicon, social avatar and 1200×630 Open Graph artwork. The shared header and footer use the Page & Slide display, and the order message now opens with `Hi Page & Slide,`.

The shared storefront layout preserves the verified cart, checkout, WhatsApp and Telegram actions. Configured destinations remain `https://wa.me/919025857269` and `https://t.me/softbazzar`; the Telegram username is intentionally preserved as a compatibility destination. The cart key `softbazzar_cart_v1` is intentionally preserved so existing saved carts continue to resume. No pricing, delivery surcharge, deadline, quantity or accessibility behavior was changed.

## Search, answer-engine and generative-search readiness

The canonical production baseline is centralized through `VITE_PUBLIC_SITE_URL` with the default `https://pageandslide.vercel.app`. It drives canonical links, Open Graph and Twitter metadata, the Page & Slide social image URL, generated `robots.txt`, generated `sitemap.xml`, prerendered route HTML and JSON-LD. Preview builds remain closed to crawlers with `noindex, nofollow` behavior.

The route-aware JSON-LD publishes a truthful Page & Slide Organization, WebSite, WebPage and catalogue-derived Service/Offer graph. Offers use INR and exclude non-purchasable add-ons. The active customer-facing product contains no MCC, Madras Christian College, local-business, address, review, rating, registration, hours or affiliation claim. `search_launch.md` documents the post-production Search Console, Bing, optional IndexNow and OAI-SearchBot steps.

## Rebrand residue audit

| Audit | Result |
|---|---|
| Active visible brand | Page & Slide display and copy confirmed; no split `SOFT` / `BAZZAR` header/footer residue remains. |
| Active prohibited content | No active `SoftBazzar`, old domain, MCC, Madras Christian College, College Press or stale schema residue in deployable customer content. |
| Intentional compatibility identifiers | Repository/project name, `/home/ubuntu/softbazzar` working path, `softbazzar_cart_v1`, `softbazzar` Telegram username and lowercase manifest/package project identifiers remain only where changing them would break continuity or the approved destination. Test fixtures retain placeholder strings solely to verify rejection. |
| Assets | `logo-mark.svg`, `logo-wordmark.svg`, `favicon.svg`, `page-and-slide-social.svg`, `page-and-slide-social.png` and `page-and-slide-social-avatar.png` use the Page & Slide P&S / PS mark and approved palette. |

## Verification results before final push

| Verification | Result |
|---|---|
| TypeScript | `pnpm check` passed. |
| Unit tests | `pnpm test`: **13 test files, 34 tests passed**. |
| Production build | `pnpm build` passed, including SEO generation, Vite build, prerendering and server bundling. |
| Local browser tests | `pnpm test:e2e`: **6 passed, 2 skipped**. Skips are protected-host entries requiring `HOSTED_URL`. |
| Visual QA | Fresh desktop/mobile homepage, service-detail, Terms, Open Graph card and avatar inspections passed with no obvious visual defect. |
| Hosted Preview QA | `HOSTED_URL=… pnpm exec playwright test -c playwright.hosted.config.ts`: **1 passed** in **21.8 seconds** against the final protected Preview. |

## Sole production blocker

`VITE_LEGAL_CONTACT_EMAIL` is still not supplied. It is the **only explicit user-input blocker**. The Preview is ready for review, but production promotion must wait until that verified support/legal email is configured and the contact/policy copy is rechecked. No production promotion, `main` merge, domain connection or indexing request was performed.

## References

See `release_configuration.md` for the environment gate and `search_launch.md` for the post-production search checklist.
