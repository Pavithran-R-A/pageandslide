# Vercel Preview Deployment and Hosted QA Record

## Deployment context

The Vercel team selected was `Pavithran's projects` (`team_FFtBNFMsQMOc92Oqv2wnrC6Y`). An existing project named `softbazzar` was identified (`prj_q3cMbX3jlTvZv92oXOCaH3HdtjqI`), which is distinct from the other listed projects and was used only for preview-target deployments. No custom domain was attached and no Vercel production deployment was requested or created.

## Pre-deployment audit

The source checkpoint at the start of the task was `f7fc45f7`; the only untracked file was the task QA checklist. TypeScript passed. Vitest passed with 5 test files and 15 tests. The Vite production build passed. Playwright passed with 6 desktop/mobile smoke tests. The central catalogue is `client/src/data/services.ts`; derived totals are implemented in `client/src/lib/pricing.ts`; and intentionally safe placeholder contact settings are in `client/src/config/contact.ts`.

## Deployment findings to date

The first preview deployment, `dpl_4tc7JtGSzeHQ2ksSxHPyAL11VovW`, failed during `pnpm install --frozen-lockfile` because `patches/wouter@3.7.1.patch` was omitted from the manually supplied file set. The second deployment, `dpl_2dtDHqr8SYU1oZA54JtkDorrzUkR`, completed installation but failed because `client/src/components/ui/button.tsx` was omitted, and it exposed unresolved `%VITE_ANALYTICS_*%` placeholders in HTML. The third deployment, `dpl_fGL92oUuC36HofJpqxqfyxh5u3CN`, failed because `client/src/components/ui/card.tsx`, imported by the fallback page, was also omitted.

The manifest generator has therefore been corrected to recursively include all `client/src` and `client/public` source files as well as root build configuration and lockfile patches. The unresolved optional analytics placeholder was removed because analytics is not configured for this Vercel preview. No visual design or product-flow changes were made.

## Git-backed fallback deployment

The one final complete-manifest preview attempt, `dpl_PAUGc9Cr79AMdypk7Hgi6PGVQ8px`, failed with `Could not resolve entry module "client/index.html"`. Per the approved stop condition, no further manual source-manifest variations were attempted. The Vercel-linked GitHub repository `Pavithran-R-A/softbazzar` was confirmed to exist with `main` as its default branch. The verified current source was committed as `374f38f06e5c6b1c2da1e33eba903e8e929c74a4` on the new branch `vercel-preview/softbazzar-qa-20260827` and pushed without changing or merging `main`.

Vercel automatically created Git-backed preview deployment `dpl_HshjQ7HeZL7Fv7HtGyj2MvUckxwq` from that branch. It reached `READY` status at `https://softbazzar-owlgd2qkk-pavithrans-projects-cae184b1.vercel.app`; the branch alias is `https://softbazzar-git-vercel-previ-4b8711-pavithrans-projects-cae184b1.vercel.app`. The deployment target is a preview (`target: null` in Vercel’s Git deployment record), and no custom domain was added.

## Hosted routing correction

Although the first Git-backed preview reported `READY`, its hosted root served the compiled `server/index.ts` source rather than the storefront. This was a genuine deployment configuration defect, not a visual design issue. A minimal root-level `vercel.json` was added to specify Vite, `pnpm exec vite build`, `dist/public` as the output directory, and an SPA fallback to `/index.html`. The correction was committed as `705a46400c919df4882dc0d31369bc9d7a2811db` on the same preview branch.

Vercel then created Git-backed deployment `dpl_8rcVeVAyLiw6F1oRbYBTo4zMG4yk` at `https://softbazzar-dgqa7hcq4-pavithrans-projects-cae184b1.vercel.app`, which reached `READY`. The hosted root was opened through its temporary Vercel share link and verified to render the approved SoftBazzar page with the correct title, header, hero, service catalogue, FAQ, footer, and 44 discovered interactive controls.

## Current hosted preview QA

The focus-return correction was deployed through Git as `dpl_B11KLWzDzPeWeRqHBumxGuBjyNEb` at `https://softbazzar-ewkdovpku-pavithrans-projects-cae184b1.vercel.app` from commit `1136ca6df856544fb8db628e5eb10e17f8f46ad0`. Its hosted root was opened through the generated Vercel share link and renders the same approved editorial storefront with a valid `SoftBazzar | Student Presentation & Document Services` title and the complete expected content hierarchy.

The first hosted automation run correctly exposed that focus did not return to the cart trigger after an Escape close. This was corrected in `CartDialog.tsx` and deployed. A second run reached the cart quantity, pricing, form validation, persistence, and contact-fallback checks but stopped because the QA selector ambiguously matched two quantities labelled `Quantity 1`; the selector has been scoped to the Presentation line. A subsequent run reached the direct route check but the generic `networkidle` wait expired on `/404`; the route will be checked directly with a more appropriate document-load condition. These are QA-harness refinements, not new application defects.

The completed hosted test suite then passed in 58.9 seconds against the current preview. It covered the requested 320, 360, 390, 430, 768, 1024, 1280, and 1440 pixel widths with no horizontal overflow and verified the full cart, persistence, checkout, pricing, contact safety, keyboard FAQ, controlled dialog, and SPA-fallback paths. The directly loaded hosted `/404` path returned SoftBazzar’s internal not-found view rather than a Vercel 404.

The final 1280-pixel full-page root screenshot was visually reviewed and matches the approved warm ivory editorial layout, serif display typography, burgundy accent, restrained gold detail, sparse rule-based catalogue, dark final CTA, and compact footer. The desktop cart screenshot was also reviewed: the drawer has usable contrast, aligned price/quantity controls, a clear close target, and a visible review action. No visual or responsive defect was found in these desktop states.

The hosted desktop order-review screenshot was reviewed. It shows a stable `SB-20260827-MIWW` style reference, Presentation ₹249 plus Project reports ₹199, the expected ₹448 subtotal, ₹112 priority surcharge, and ₹560 integer total. The review layout keeps the values, customer details, close button, edit affordance, and both channel actions clear. The mobile 390-pixel screenshot was also reviewed: the header, intentionally generous headline wrap, readable supporting copy, burger-free mobile header, and burgundy fixed cart bar remain legible and unclipped. The bar visibly reports 2 items and ₹448 while leaving space below the document content. No mobile visual defect was found.

The 390-pixel hosted full-page screenshot was reviewed across all major sections. The mobile catalogue keeps the service names, tier labels, price column, and Add targets scannable without horizontal overflow; the Combination Pricing module remains distinct without visual clutter. The route, FAQ, final CTA, and footer all retain their intended hierarchy and spacing. The taller hero is deliberate rather than excessive at this width: it keeps the serif headline readable and supports the approved editorial identity.

The browser console was inspected on the current hosted root after the flow checks and produced no console output or errors. Hosted Lighthouse measured Performance 99, Accessibility 95, Best Practices 100, and SEO 66. The sole failing SEO audit is `is-crawlable` (`Page is blocked from indexing`); it will be traced to its deployed response header before any configuration change is considered.

The Vercel preview response sets `X-Robots-Tag: noindex` and requires the temporary share link before it can load, so the hosted SEO score of 66 is a preview-protection effect rather than an application regression. This is appropriate for the requested non-production staging preview and should not be removed. The rendered hosted metadata was verified: title, description, viewport, favicon path, canonical placeholder `https://softbazzar.example/`, Open Graph title, Open Graph description, and neutral Open Graph image placeholder are present. The temporary preview intentionally retains the neutral canonical/OG domain rather than incorrectly claiming the Vercel URL as final. The live `/robots.txt`, `/sitemap.xml`, `/favicon.svg`, and `/softbazzar-social.svg` responses all returned 200 with the expected content types.

The expanded hosted suite confirmed the expected same-day math through the live UI: ₹448 subtotal, ₹224 surcharge, and ₹672 total. Its only subsequent halt was a QA-harness assertion that incorrectly expected the same reference after an explicit Edit details action followed by a new review submission. The UI intentionally generates a fresh reference at that new review step; the revised check verifies reference shape and its stability through WhatsApp and Telegram channel actions within each review state. This is not an application defect.
