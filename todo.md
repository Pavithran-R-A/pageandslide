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
