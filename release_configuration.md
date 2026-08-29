# Page & Slide — Release Configuration Checklist

Page & Slide is an independent repository and Vercel project. This checklist records only configuration that belongs to this business; SoftBazzar identifiers must not be used as Page & Slide contact or order identity.

| Requirement | Current state | Production action |
|---|---|---|
| WhatsApp customer contact | Default configured as `919025857269` | Re-test the direct destination and encoded order links after each production deployment. Override only with `VITE_WHATSAPP_NUMBER` when intentionally changing the business contact. |
| Telegram public username | No default recipient | Optional: set `VITE_TELEGRAM_USERNAME` only after a dedicated Page & Slide Telegram username exists. Do not reuse `softbazzar`. |
| Canonical production origin | `https://pageandslide.vercel.app` through `VITE_PUBLIC_SITE_URL` | Keep this as the single production baseline unless a deliberate custom domain is connected. |
| Legal/support email | Optional and currently unpublished | Set `VITE_LEGAL_CONTACT_EMAIL` only when a verified Page & Slide inbox exists. Until then, policies and the contact page use the configured WhatsApp route; no invented email is shown. |
| Order identity | `PS-YYYYMMDD-XXXX` | Keep Page & Slide references distinct from SoftBazzar references. |
| Cart storage | `pageandslide_cart_v1` | Contains only validated service/tier IDs and quantities; checkout details are not persisted. |
| Search launch | Production is crawlable | Keep canonical, sitemap and robots output on the Page & Slide origin and verify them after production changes. |

Unknown URLs must return an actual Vercel 404 rather than a rewritten homepage. Production responses also carry baseline browser security headers from `vercel.json`.
