# Project Guidelines

## Jurisdiction-Specific Content

### US Website (us-en/)
- **Do NOT include "Made in Canada" messaging** in footers or branding copy for us-en pages
- This is intentional — US-targeted content should not highlight Canadian origin
- CA and other jurisdiction pages should include "Made in Canada" language

## Launch/Serve

When requested to launch, serve or run the application:
- Serve files from the `public/` directory using a Python webserver on port 8888
- Command: `python -m http.server 8888 --directory public/`
- Application will be accessible at `http://localhost:8888`



## Terms of Use & Privacy Policy — Versioning Contract

ExpenseFlow's api-server polls this site's `/en/terms.html` and `/en/privacy.html`
periodically and parses a "Last updated" date from each page to detect when users
must re-accept an updated policy. Breaking this contract silently breaks that flow
for all ExpenseFlow users — treat it as a public API.

**Rules for any edit to terms.html or privacy.html:**
1. Every substantive content change MUST bump the "Last updated" date to the date
   of the edit — this is the ONLY signal the consuming system has that the document
   changed. Do not edit content without bumping the date; do not bump the date
   without a real content change.
2. The date must appear in exactly this format, unchanged, on both pages:
   `Last updated: YYYY-MM-DD` (e.g. `Last updated: 2026-07-04`).
   Do not reformat it (no month names, no slashes, no relocating it into a
   different element) without coordinating with the ExpenseFlow api-server team —
   the parser is a plain regex keyed to this exact phrase and format.
3. Trivial fixes (typos, formatting, dead link updates) that don't change the legal
   meaning of the document should NOT bump the date — bumping the date forces every
   user to re-accept, which should be reserved for actual policy changes.
4. If you need to change the date format, the element it lives in, or the URL path
   of either page, flag it explicitly to the user before making the change — it
   requires a corresponding change in ExpenseFlow's api-server parser.

