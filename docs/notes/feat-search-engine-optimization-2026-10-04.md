# SEO foundations — 2026-10-04

Branch: `feat/search-engine-optimization` (commit `df20383`)

## Goal
Improve ranking for "expenseflow" searches by fixing technical SEO gaps and the
en/us-en/ca-en duplicate-content risk, plus incidental content/link bugs found
during the audit.

## Completed
- Added `public/robots.txt` and `public/sitemap.xml` (36 pages, hreflang alternates included).
- Added canonical tags to all 28 pages that were missing them; fixed the relative
  canonical on `public/accountants.html`.
- Added reciprocal hreflang (`en` / `en-us` / `en-ca` / `x-default`) across the 18
  `en/us-en/ca-en` marketing pages.
- Added Open Graph tags to all 30 pages missing them (no Twitter Card tags — explicitly
  excluded per decision).
- Added Organization/WebSite/SoftwareApplication JSON-LD to the 3 jurisdiction homepages.
- Swapped all 33 `logo.svg` references to `logo.png` (`logo.svg` was a base64-PNG
  disguised as SVG, not a real vector).
- Made `public/contact/index.html` nav/footer links geo-aware (reuses the
  `expenseflow_country` detection already used by the root country-selector gate);
  previously these 4 links were hardcoded and 404'd.
- Fixed duplicate `<h1>` on all 10 `docs/*.html` pages (mechanical h1→h2, no visual change)
  and replaced their boilerplate meta descriptions with real per-page copy.
- Gave `public/index.html` (country gate) and `public/accountants.html` (redirect stub)
  real meta descriptions, favicons, and (for index.html) a `<noscript>` fallback with
  crawlable content.

## Explicitly deferred (separate task)
- Image compression/WebP conversion for `dashboard.png` (~701KB), `trips.png`,
  `city-waypoints.jpeg`, `expenses.png`. User decided to leave page weight as-is for now —
  this affects page speed/bounce rate, not indexing/ranking, so it was kept out of scope.

## Not touched (by design)
- `en/privacy.html` / `terms.html` / `security.html` / `third-party-notices.html` content —
  only the logo.svg→logo.png asset swap touched these files; no legal-meaning change, so no
  "Last updated" date bump per the terms/privacy versioning contract.
- en/us-en/ca-en content differences (IRS/CRA, miles/km, "Made in Canada" exclusion) — these
  are intentional jurisdiction localization, resolved via hreflang, not content merging.
