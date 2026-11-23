# Issue: Fix Google Search Console indexing issues (apex vs www mismatch)
**ID:** 6
**Branch:** ftr-6-fix-google-search-console-indexing-issue
**Type:** Feature
**URL:** https://github.com/ExpenseFlow/expenseflow.github.io/issues/6

## Description

## Problem

Google Search Console (property `expenseflow.app`, report dated 2026-11-15) shows 30 pages indexed and 39 not indexed. The main cause is a host mismatch: the site is served on `www.expenseflow.app`, while the sitemap, canonical tags and robots.txt use `expenseflow.app`.

## Evidence

- `https://expenseflow.app/en/index.html` and `https://expenseflow.app/sitemap.xml` return 301 to the `www` host. The `www` URLs return 200.
- `public/sitemap.xml`: all 35 `<loc>` entries use `https://expenseflow.app/...`; none use `www`.
- `public/robots.txt`: `Sitemap: https://expenseflow.app/sitemap.xml`.
- Canonical and hreflang tags (e.g. `public/en/index.html`) point to `https://expenseflow.app/...`.
- Search Console message of 2026-11-15: "New reasons prevent pages in a sitemap from being indexed" (reason: Page with redirect).

## Search Console reasons (39 not indexed)

| Reason | Pages | Assessment |
|---|---|---|
| Page with redirect | 11 | Caused by apex sitemap/canonical URLs redirecting to www. Fix. |
| Alternate page with proper canonical tag | 4 | www pages whose canonical is an apex URL that redirects back. Fix with same change. |
| Discovered - currently not indexed | 16 | Not yet crawled (`/ca-en/*.html`, `/en/*.html`, `/contact/`). Expected to improve after fix and sitemap resubmit. |
| Not found (404) | 5 | Old URLs (`/ca-en/privacy.html`, `/terms`, `/contact.html?...`, `registry.` root). Only fix if linked from somewhere. |
| Excluded by noindex | 2 | `/privacy` and `/privacy/` redirect stubs. Intentional. |
| Crawled - currently not indexed | 1 | `/en/security.html`. Likely thin content. |
| Indexed without content (warning) | 4 | Root pages of the API hosts (`api`, `api-test`, `api-ca`, `api-stage`) are indexed and empty. Needs a change on the API hosts, outside this repo. |

## Proposed work

1. Use `https://www.expenseflow.app/...` consistently in `public/sitemap.xml` (`<loc>` and hreflang), canonical tags on all pages, and the `Sitemap:` line in `public/robots.txt`.
2. Keep the privacy redirect stubs as noindex.
3. Stop the API hosts' root pages being indexed (noindex header or robots), tracked separately on the API side.
4. After deploy: resubmit the sitemap in Search Console, request indexing for the home, pricing and features pages, and validate fixes for the redirect and canonical items.
5. Optional: add content to `security.html`.

## Acceptance

- Sitemap URLs return 200 with no redirects.
- Canonical URLs return 200 and match the www host.
- Search Console "Page with redirect" and "Alternate page with proper canonical tag" counts fall to the intentional ones after recrawl.
