# SoftBazzar — Production Search Launch Checklist

> **Scope:** Complete these steps only after the final public production URL is live. This repository currently uses `https://softbazzar.vercel.app/` as its canonical baseline, while Preview deployments remain protected and non-indexable. No successful indexing is claimed here.

## Preconditions

Confirm that the final production URL responds publicly over HTTPS, that `robots.txt` and `sitemap.xml` return `200`, and that the canonical URL in the rendered page is `https://softbazzar.vercel.app/`. The sitemap contains only canonical, absolute URLs, as Google recommends.[1]

| Check | Expected production value |
|---|---|
| Canonical | `https://softbazzar.vercel.app/` |
| Sitemap | `https://softbazzar.vercel.app/sitemap.xml` |
| Robots | `https://softbazzar.vercel.app/robots.txt` |
| Search crawl directive | `OAI-SearchBot` is explicitly allowed |
| Preview policy | Vercel Preview protection remains unchanged; do not use a Preview URL for search-property verification or indexing requests. |

## Google Search Console

Create a URL-prefix property for `https://softbazzar.vercel.app/`, then follow one of Google’s offered ownership-verification methods. For this static site, use the exact verification meta tag that Search Console supplies in `client/index.html`, or place Google’s supplied verification file at the site root; do not alter or remove that token after verification.[2] After the production deployment is public, submit `https://softbazzar.vercel.app/sitemap.xml` in the **Sitemaps** report and monitor its fetch status and any parsing errors.[3]

Use **URL Inspection** to request indexing of the homepage only after the site is public and ownership is verified. Submission is a crawl hint, not a guarantee of indexing.[1]

## Bing Webmaster Tools

Add `https://softbazzar.vercel.app/` in Bing Webmaster Tools after production is public. If the Google Search Console property has already been verified, Bing can import the verified site and associated sitemap; otherwise use one of Bing’s offered verification methods, such as a supplied XML file, meta tag, or DNS record.[4] Confirm that Bing lists the production sitemap and wait for its post-verification reporting window before interpreting search-performance data.

## Optional IndexNow

IndexNow is optional for this small static site. If it is adopted later, generate a private 8–128 character key, publish the required `{key}.txt` file at the production root, and submit only production URLs when a page is added, updated, or deleted. A `200` response means the endpoint received the notification; it does **not** prove that a URL was indexed.[5] No IndexNow key or submission automation is included in this release.

## OAI-SearchBot verification

The production robots file explicitly allows `OAI-SearchBot`. After the public deployment, confirm directly that `https://softbazzar.vercel.app/robots.txt` is reachable without authentication and contains that directive. If edge security is later added, allow requests from OpenAI’s published SearchBot IP ranges and inspect edge or hosting logs for the documented `OAI-SearchBot` user agent. OpenAI notes that robots changes can take about 24 hours to take effect, and allowing OAI-SearchBot is the relevant signal for potential appearance in ChatGPT search results.[6]

## Launch evidence to retain

Record the production deployment URL and timestamp, HTTP status for the homepage, robots file, sitemap, and social image, Search Console ownership status, submitted-sitemap status, Bing ownership status, and any subsequent URL Inspection or crawler-log observations. Keep these as launch evidence rather than inferring indexing from a successful deployment.

## References

[1]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap "Google Search Central — Build and submit a sitemap"
[2]: https://support.google.com/webmasters/answer/9008080?hl=en "Google Search Console Help — Verify your site ownership"
[3]: https://support.google.com/webmasters/answer/7451001?hl=en "Google Search Console Help — Sitemaps report"
[4]: https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b "Bing Webmaster Tools — Adding and verifying a site"
[5]: https://www.indexnow.org/documentation "IndexNow — Documentation"
[6]: https://developers.openai.com/api/docs/bots "OpenAI — Overview of crawlers"
