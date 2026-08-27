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
