# Page & Slide — Production Hardening QA Record

> **Status:** Page & Slide is maintained as its own repository and deployment. This record describes the `hardening/20260829` release candidate before integration into `main`.

## Release candidate

| Item | Verified value |
|---|---|
| Repository | `Pavithran-R-A/pageandslide` |
| Branch | `hardening/20260829` |
| Canonical production origin | `https://pageandslide.vercel.app` |
| Default customer contact | WhatsApp `919025857269` |
| Telegram | Optional; no default Page & Slide username is published |
| Order references | `PS-YYYYMMDD-XXXX` |
| Cart storage | `pageandslide_cart_v1` |

## Separation and customer-flow hardening

Page & Slide no longer borrows SoftBazzar as its customer-facing Telegram identity. The contact page, footer actions, organization metadata and checkout flows derive destinations from Page & Slide contact configuration. WhatsApp remains available by default; Telegram is rendered only when a valid `VITE_TELEGRAM_USERNAME` is deliberately configured.

The cart persists only validated service/tier identifiers and quantities. Order details are collected at review time, and the application uses Page & Slide-specific order references. Unknown routes are not rewritten to the homepage: the Vercel configuration preserves a genuine 404 response and applies baseline browser security headers.

A support/privacy email is optional. If `VITE_LEGAL_CONTACT_EMAIL` is unset, the site does not invent or publish an email address; customers are directed to the configured contact channel instead.

## Search readiness

Public metadata is centralized on `https://pageandslide.vercel.app`. The build generates canonical metadata, `robots.txt`, `sitemap.xml`, route-aware prerendered HTML and truthful JSON-LD. Public service and policy routes are indexable, while missing routes use Page & Slide's non-indexable 404 metadata. `OAI-SearchBot` is explicitly allowed in production crawl output and disallowed in preview crawl output.

## Verification record

GitHub Actions CI run **#14** (`33243463743`) completed successfully on commit `20282018eb0b17a668afd98c1bf6b6153d3e03b3` after the contact-identity separation and release-configuration corrections. The CI workflow runs dependency installation, TypeScript checking, the Vitest suite, the production build and Playwright browser regression tests.

This document is a pre-integration record. Production deployment and live-origin regression checks are performed only after the verified branch is integrated into `main`.
