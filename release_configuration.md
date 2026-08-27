# Page & Slide — Release Configuration Checklist

This checklist is intentionally explicit about values that must be verified before final production. Missing business information is not replaced with invented data.

| Requirement | Current state | Production action |
|---|---|---|
| WhatsApp customer contact | Configured as `919025857269` | Re-test the direct destination and encoded order links before promotion. |
| Telegram public username | Configured as `softbazzar` | Preserve this approved destination and re-test the direct order links before promotion. |
| Canonical production origin | `https://pageandslide.vercel.app` through `VITE_PUBLIC_SITE_URL` | Keep this as the single production baseline unless the user deliberately supplies a different final origin. |
| Legal/support email | Not supplied in this release | Set `VITE_LEGAL_CONTACT_EMAIL` to a verified address and confirm the displayed policy/contact copy. This is the only explicit user-input blocker. |
| Production search launch | Not performed | Follow `search_launch.md` only after the public production URL is live. |

The current Preview remains protected and must not be used for indexing requests. No domain purchase, connection, production promotion or automated message sending is performed by this release pass.
