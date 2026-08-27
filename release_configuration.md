# SoftBazzar — Release Configuration Checklist

This checklist is intentionally explicit about values that must be verified before final production. Missing business information is not replaced with invented data.

| Requirement | Current state | Production action |
|---|---|---|
| WhatsApp customer contact | Configured as `919025857269` | Re-test the direct destination and encoded order links before promotion. |
| Telegram public username | Configured as `softbazzar` | Re-test the direct destination and encoded order links before promotion. |
| Canonical production origin | `https://softbazzar.vercel.app` | Replace `VITE_PUBLIC_SITE_URL` with the sole custom origin only after the domain is deliberately connected. |
| Legal/support email | Not supplied in this release | Set `VITE_LEGAL_CONTACT_EMAIL` to a verified address and confirm the displayed policy/contact copy. |
| Operator/business disclosures | Not supplied in this release | Confirm and publish any legally required operator, business or consumer disclosures before final production. |
| Production search launch | Not performed | Follow `search_launch.md` only after the public production URL is live. |

The current preview remains protected and must not be used for indexing requests. No domain purchase, connection, production promotion or automated message sending is performed by this release pass.
