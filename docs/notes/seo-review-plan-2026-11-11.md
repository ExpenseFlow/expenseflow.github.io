# SEO review: findings, solutions, and plan (2026-11-11)

Branch: `main` (uncommitted working tree)

## Context
Audit found the site technically clean (titles, descriptions, canonicals, OG, alt text)
but with (a) a canonical-host mismatch, (b) a JS-only root page, (c) no search-intent
content, and (d) generic titles. Constraints carried over from
`feat-search-engine-optimization-2026-10-04.md`:
- No Twitter Card tags (explicit prior decision).
- Image compression deferred (explicit prior decision).
- Terms/privacy "Last updated" is NOT bumped: no legal meaning changes (AGENTS.md rule 3).
- Do not publish fabricated data (no aggregateRating without real ratings).

Corrections to the review: CA JSON-LD already uses CAD; US pages linking to the `/ca/`
App Store URL is harmless (Apple redirects to the viewer's storefront), so no action.

## Domain facts (checked via DNS/curl)
- DNS is on Cloudflare (proxied). `www.expenseflow.app` serves from GitHub Pages (200).
- Apex 301s to www via a Cloudflare rule; http://apex takes two hops.
- Repo canonical/hreflang/og:url/sitemap/JSON-LD all used the apex -> mismatch.

## Items, solutions, and status

| # | Item | Solution | Where |
|---|------|----------|-------|
| 1 | Canonical host mismatch | Make `https://www.expenseflow.app` canonical everywhere (canonical, hreflang, og:url, JSON-LD, sitemap, robots.txt) | Repo (done) + Cloudflare (manual) |
| 2 | Root `/` is a JS-only gate with a bare title | Keep the gate behaviour (product decision) but give `/` a descriptive title/description, crawlable text and plain links to all three regions. Recommend a server-side country redirect at the edge later | Repo (done) + Cloudflare (manual) |
| 3 | `/index.html` in canonical URLs | Use clean directory URLs (`/us-en/`, `/docs/`) in canonical, hreflang, og:url, sitemap | Repo (done) |
| 4 | Sitemap gaps | Regenerate with `lastmod`, clean URLs, new guide pages, www host | Repo (done) |
| 5 | Weak titles | Rewrite titles for all 18 regional marketing pages: keyword first, brand last, region-specific | Repo (done) |
| 6 | Weak meta descriptions | Rewrite with concrete claim + CTA + keyword (matches og:description) | Repo (done) |
| 7 | No keyword language / category H1 | Change hero eyebrow to a plain category phrase ("Mileage tracker and receipt scanner") and add category words to the lede; keep brand H1 slogan | Repo (done) |
| 8 | No search-intent content | New `/us-en/guides/` and `/ca-en/guides/` hubs with 2 guides each (IRS mileage log, CRA logbook, self-employed tracking). Linked from footer, added to sitemap | Repo (done) |
| 9 | Structured data thin | Add FAQPage (homepages), `sameAs` store links in Organization, BreadcrumbList + Article on guides. No aggregateRating until real ratings exist | Repo (done) |
| 10 | No og:image | Add `og:image` (+ alt, dimensions) to every page. No Twitter cards (prior decision) | Repo (done) |
| 11 | en/us-en/ca-en near-duplicates | No code change. Guides are region-specific (IRS vs CRA); continue differentiating copy. Recommendation only | Content (future) |
| 12 | Thin docs pages | No code change now; expand with step-by-step content + screenshots later | Content (future) |
| 13 | Image weight | Deferred by prior decision | n/a |
| 14 | Legal alias stubs (`/privacy/` etc.) | Canonicals now www; convert to real 301s at Cloudflare | Cloudflare (manual) |
| 15 | Backlinks / listings | Directories (Capterra, G2, Product Hunt), accountant partner pages, app-store rating collection | Off-site (manual) |

## Manual follow-ups (cannot be done from the repo)
1. Cloudflare: single-hop 301 from `http/https apex` and `http www` to `https://www...`.
2. Confirm GitHub Pages custom domain is `www.expenseflow.app`.
3. Search Console: add a Domain property (DNS TXT), submit `https://www.expenseflow.app/sitemap.xml`,
   then use URL Inspection on `/`, `/us-en/`, `/ca-en/`, `/en/`.
4. Reconcile live robots.txt (Cloudflare adds Content-Signal and bot blocks) with repo copy.
5. Cloudflare redirect rules for `/privacy`, `/terms`, `/refund`, `/security`, `/notices` -> 301 to `/en/*.html`.
6. Verify the IRS mileage rate stated on the calculator ($0.76/mi) against the official IRS notice.
7. Check the ExpenseFlow api-server HTTP client follows redirects (legal-page polling).

## Verification
- Grep: no `https://expenseflow.app` remains in `public/`; no `/index.html` in canonicals.
- Every page has one canonical, description, og:image; JSON-LD parses as valid JSON.
- Sitemap `<loc>` URLs all map to real files.
- Serve `public/` on :8888 and spot-check new pages.

## Implementation status (2026-11-11)
Items 1-10 and 14 (canonicals) implemented on `main`, uncommitted.
Verified: 0 apex URLs left, 0 `index.html` canonicals, all JSON-LD parses, all 42 sitemap URLs map to files,
new pages return 200 locally. Terms/privacy "Last updated" untouched. New guide pages were not visually reviewed in a browser.

## Addendum: mobile app routing and banner
- Per-click routing already existed (`assets/js/store-links.js`): `[data-platform-cta]` goes to the web app on desktop, App Store on iOS, Google Play on Android, with campaign tags. No change needed.
- No redirect on page load (bad for SEO and UX; crawlers would be affected); routing happens on click only.
- Added Apple Smart App Banner meta (`apple-itunes-app`) to the 40 pages that load the script (native iOS Safari banner, shows "Open" if installed).
- Added a dismissible in-flow "Get the app" bar for Android and non-Safari iOS browsers; hidden on desktop and on iOS Safari; dismissal remembered 14 days.
- Left unrouted on purpose: "Sign in", "Book a demo", "Become a partner" (not sign-ups).
