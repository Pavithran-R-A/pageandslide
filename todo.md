# Vercel Preview Deployment and Hosted QA Checklist

- [x] Read and validate all remaining requirements in `pasted_content_2.txt`.
- [x] Record the current project state and complete the pre-deployment audit.
- [x] Confirm no secrets are tracked and contact placeholders are safe.
- [x] Inspect the connected Vercel capabilities and select a non-conflicting project configuration.
- [x] Validate the complete source-tree Vercel manifest, including root configuration and static assets.
- [x] Submit exactly one final manual source-manifest preview deployment.
- [x] Stop manual manifest retries and use the Git-backed Vercel workflow only if that final attempt fails.
- [x] Create or link the SoftBazzar Vercel project and deploy a preview URL without a custom domain.
- [x] Verify host-level build settings, SPA fallback, public assets, metadata, fonts, favicon, robots file, sitemap, and social image.
- [x] Test cart behaviour, persistence, checkout validation, pricing, order ID, and safe contact fallback on the deployed URL.
- [x] Test desktop and mobile layouts at 320, 360, 390, 430, 768, 1024, 1280, and 1440 pixels on the deployed URL.
- [x] Test hosted accessibility, keyboard dialogs, focus handling, console, network requests, and reduced motion.
- [x] Resolve genuine hosted defects only, re-run validation, and deliver the preview URL with an audit summary.

## Verified production-gap remediation

- [x] Audit the channel-opening, footer contact, add-on tier, deadline, input, and copy paths before edits.
- [x] Verify unused scaffold files and debug artifacts through import/dependency checks before removal.
- [x] Correct valid channel opening and footer direct-contact behavior without weakening safe placeholders.
- [x] Make additional slide/page rows informational and non-addable.
- [x] Add past-deadline validation, datetime minimum, and requested input length limits.
- [x] Change only the hero eyebrow to `FOR MCC STUDENTS`, preserving the disclaimer and approved design.
- [x] Remove only demonstrably unused template/debug artifacts and stale design comments.
- [x] Add valid-contact, placeholder-contact, non-addable tier, deadline, and field-limit tests.
- [x] Run TypeScript, Vitest, production build, local Playwright, and hosted preview regression QA.
- [x] Commit and push the existing preview branch, verify a new Vercel preview, and record final Lighthouse scores.

## Final release preparation

- [x] Consolidate `deployment_qa.md` into one authoritative record for commit `a409fdbd773be61fe54857a661c4b8b3671c22a3` and its successor preview.
- [x] Replace add-on wording with the approved subtle rate annotations while keeping both tiers non-addable.
- [x] Tighten Telegram username validation to reject numeric first characters without changing the permitted length or remaining character set.
- [x] Add focused Telegram-validation and add-on-copy test assertions.
- [x] Run TypeScript, all Vitest tests, production build, local Playwright, and hosted Vercel Playwright QA.
- [x] Commit and push only the preview branch, deploy one final preview, and record its actual Lighthouse scores.
