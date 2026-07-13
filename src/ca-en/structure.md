# ExpenseFlow CA-EN Site Structure & Content Blocks

## Site-Wide Navigation
- Brand/Logo link
- Nav links: Features | Found-money calculator | Pricing | For accountants
- CTA buttons: Sign in | Start free

---

## Page: index.html (Homepage)

### 1. Hero Section
- **Eyebrow**: Canada-first · 2026 CRA rates
- **H1**: Stop leaving money on the asphalt.
- **Lede**: Every mile auto-logged by GPS. Every receipt captured by camera...
- **Stat Strip** (4 stats):
  - ✓ CRA Compliant vehicle use reporting format
  - ±1 m GPS-verified waypoints, not estimates
  - 2 halves Trip + receipt in one compliant record
  - 5 trips Test drive free before you sign up
- **Browser mockup**: Dashboard screenshot
- **CTAs**: Start free — no account needed | See what the CRA owes you

### 2. Verticals Bar
- **Label**: Built for the teams that live on the road
- **List** (6 verticals): Outside Sales, Field Service & Trades, Real Estate, Delivery & Logistics, Insurance & Adjusting, Mobile Healthcare

### 3. Problem Section
- **Eyebrow**: The problem
- **H2**: Field expense reporting is broken.
- **3 Problem Cards**:
  - Employees lose money (forgotten trips, rounded mileage, rejected claims)
  - Finance loses hours (20+ hrs/mo chasing receipts)
  - Company carries the risk (liability without GPS proof)
- **Paragraph**: Tools force a choice — mileage apps OR expense apps

### 4. How It Works Section
- **Eyebrow**: How it works
- **H2**: A day of driving, done by the time you park.
- **3 Steps**:
  - STEP 01: Drive. Phone stays in your pocket. (Activity recognition)
  - STEP 02: Snap it before you lose it. (Receipt capture)
  - STEP 03: One report Finance accepts. (CRA-compliant record)

### 5. Feature Grid (6 core features)
- **Eyebrow**: Both halves of the job
- **H2**: Everything a field driver needs — and nothing they don't.
- **6 Feature Cards**:
  - Automatic GPS trip tracking (burst-sampled GPS, background tracking)
  - In-the-moment receipt capture (AI OCR, auto-paired)
  - Audit-ready in one record (CRA/IRS-compliant)
  - High-fidelity accuracy (waypoint logging ±1 metre vs cell-tower snapping)
  - Desk-to-Dash workflow (capture mobile, organize desktop)
  - Real-time compliance dashboard (watch every kilometre, tax-savings ticker)

### 6. Split: Accuracy Feature
- **Eyebrow**: Accuracy is a feature
- **H3**: Don't let your app cut corners on your tax return.
- **Details**: Cell-tower snapping loses 3–5% of distance
- **Checklist** (3 items):
  - MARUTI burst-sampling (motion, turns, heartbeat)
  - Server-side pipeline (GPS logs → breadcrumbs → waypoints → trips)
  - Encrypted, time-stamped breadcrumb data

### 7. Split: Capture & Organize Workflow
- **Eyebrow**: Capture on mobile, organize on desktop
- **H3**: The web app does the busywork you'd rather skip.
- **Checklist** (3 items):
  - AI smart-context hints
  - One-click PDF / CSV export (year & jurisdiction structured)
  - Multi-jurisdiction tax support (CA, US, DE, AT, BE)

### 8. Comparison Table
- **Eyebrow**: Why ExpenseFlow
- **H2**: Mileage-only apps do half the job.
- **3-column table** (Mileage-only | Expense-only | ExpenseFlow) — 5 capability rows

### 9. Calculator Teaser
- **Eyebrow**: Found-money calculator
- **H2**: See what the CRA owes you.
- **Interactive slider**: Business km/week
- **Result display**: Annual CRA-deductible mileage value
- **CTA**: Calculate my deduction

### 10. Social Proof Section
- **Eyebrow**: From the field
- **H2**: Drivers and accountants, on the same page.
- **3 testimonials** (driver, accountant, contractor)
- **Logos row**: Re/Max, Royal LePage, Independent CPAs, Trades crews, Gig drivers

### 11. For Finance & Owners Section
- **Eyebrow**: For finance & owners
- **H2**: Approve claims on the first try.
- **Checklist** (4 items): GPS-verified, Receipts attached, Routine claims auto-clear, Clean exports
- **ROI Card**:
  - For 50-person team: 15 hrs/mo → Under 2 hrs
  - "One prevented overspend pays for subscription"

### 12. Pricing Teaser
- **Eyebrow**: Pricing
- **H2**: CRA-compliant reporting for less than your daily coffee.
- **3 pricing cards** (Free | Pro $7/mo | Business $10/user/mo)
- **Link**: Compare every feature

### 13. FAQ Section
- **Eyebrow**: Questions finance teams ask
- **H2**: Before you roll it out.
- **6 details/summary pairs**:
  - Why switch from spreadsheets?
  - What about employee privacy?
  - Will it drain batteries?
  - How fast can we roll out?
  - Does it fit our accounting workflow?
  - Can we start with one team and expand?

### 14. Final CTA Section
- **Eyebrow**: Drive first, account later
- **H2**: Your next 5 trips are on us.
- **Lede**: No credit card, no sign-up form...
- **Dual CTAs**: Start free | Calculate my deduction

---

## Page: features.html (Features Detail)

### 1. Page Hero
- **Eyebrow**: Features
- **H1**: Both halves of the job.
- **Lede**: Mileage and receipts, auto-tracked and joined into one audit-ready record...

### 2. Core Splits (3 main workflows)
- **01 — Tracking**: Automatic GPS trip tracking (MARUTI burst-sampling, persistent notification, real-time tax ticker)
- **02 — Capture**: In-the-moment receipt capture (Gemini OCR, auto-paired, CRA-compliant)
- **03 — Organize**: Desk-to-Dash workflow (bulk categorization, AI hints, year/jurisdiction structured export)

### 3. Accuracy Callout (The Competitive Moat)
- **H2**: Accuracy you can defend in an audit.
- **Pipeline breakdown** (5 stages):
  1. GPS logs
  2. Breadcrumbs
  3. Segments
  4. Waypoints (PostGIS)
  5. Audit-ready trips, ±1 m

### 4. Enterprise Feature Grid (6 features)
- **Eyebrow**: More of what's built in
- **H2**: Enterprise-grade, already shipped.
- **6 Feature Cards**:
  - Audit-Defense Vault (encrypted, time-stamped waypoint export)
  - Approvals & workflows (Draft → Submitted → Approved)
  - Multi-jurisdiction tax (CA, US, DE, AT, BE)
  - Security by default (AES-256-GCM, passwordless auth, reCAPTCHA Enterprise)
  - RBAC & audit logs (7 roles, admin audit log, OTP-gated impersonation)
  - AI budget alerts (real-time expense visibility, cost control)

### 5. CTA Section
- **H2**: Every mile, every receipt, one record.
- **Lede**: Track your first 5 trips free...
- **CTAs**: Start free | See pricing

---

## Page: accountants.html (For Accountants)

### 1. Page Hero
- **Eyebrow**: For accountants & CPA partners
- **H1**: Less March. Clean exports. Your whole client base in one portal.
- **Lede**: One firm holds 50+ driving clients...

### 2. Main Section (Audit-Defense Vault Feature)
- **Icon + Card**: The Audit-Defense Vault (secure link, encrypted waypoints, audit needs)
- **Text Block**: 
  - **H2**: Audit-ready by design.
  - **Checklist** (3 items):
    - Encrypted, time-stamped GPS breadcrumb data
    - One-click audit-defense secure export
    - Complies with CRA guidance on supportable records

### 3. Benefits Grid (6 CPA-specific features)
- **Eyebrow**: Built for your workflow
- **H2**: What CPAs actually need.
- **6 Feature Cards**:
  - View-only CPA portal (drill into any client's log)
  - Standardized exports (same format every client)
  - Referral credits (3 months free per referred client)
  - Priority support (direct line)
  - Multi-jurisdiction accuracy (CRA, IRS, European rates)
  - Audit trail on every entry (know when trip was logged, categorized, receipt attached)

### 4. CTA Section
- **H2**: Build a competitive advantage.
- **Lede**: Become a referral partner and earn 3 months free...
- **CTAs**: Become a partner | Back to home

---

## Page: calculator.html (Found-Money Calculator)

### 1. Hero + Calculator Tool
- **Eyebrow**: Found-money calculator
- **H1**: See what the CRA owes you.
- **Lede**: Most drivers underestimate by 20%...
- **Interactive Controls**:
  - Business km / week (slider, 20–1200, default 300)
  - Weeks driven / year (slider, 20–52, default 48)
  - What do you drive for? (buttons: Real estate | Trades | Gig/delivery | Other)
  - How you track today? (buttons: Nothing/guess | Spreadsheet | Cell-tower app)
- **Result Display**:
  - Annual CRA-claimable mileage worth: $XXX
  - Annual business distance: XXX km
  - At 2026 CRA rate: $0.73/km
  - Lost/Recovered vs. current method: $XXX
- **CTA**: Track my next 5 trips free
- **Disclaimer**: Estimate only...

### 2. Why You're Leaving Money Section
- **Eyebrow**: Why the number is bigger than you think
- **H2**: Three ways drivers lose the deduction.
- **3 Loss Reason Cards**:
  - Forgotten trips (manual logs miss 20–30%)
  - Cell-tower rounding (lose 3–5% on winding roads)
  - Rejected logs (no odometer, missing purpose, rounded numbers)

### 3. CTA Section
- **H2**: Don't lose it to a messy logbook.
- **Lede**: Download ExpenseFlow...
- **CTAs**: Start free | See pricing

---

## Page: pricing.html (Pricing & Plans)

### 1. Page Hero
- **Eyebrow**: Pricing
- **H1**: Simple pricing.
- **Lede**: Start free with no credit card...
- **Billing toggle**: Monthly / Annual (Save ~17%)

### 2. Pricing Cards (3 tiers)
- **Free**: $0, 5 trips + 5 receipts/mo, 1 user (Auto tracking, Receipt capture, No export)
- **Pro**: $7/mo per user, unlimited trips & receipts (Everything Free + Export + AI categorization + Email support)
- **Business**: $10/user/mo (Everything Pro + Team dashboard + Approvals + AI budget alerts + Accountant portal + SSO/API + Data residency + Fraud detection + Priority support)
- **Enterprise note**: 50+ seats or custom (dedicated support, custom integrations, SLAs, data-residency terms)

### 3. Value Anchor Section
- **Eyebrow**: The math
- **H2**: Pro pays for itself in one trip.
- **Breakdown**:
  - Pro: $7.00/month
  - Deduction from ~10 km/day, 20 days: $146.00
  - Net found money / month: +$139

### 4. Feature Matrix Table
- **H2**: Every feature, side by side.
- **Rows organized by group**:
  - Tracking & Capture (4 rows)
  - Reporting & Export (3 rows)
  - Teams & Finance (4 rows)
  - Security & Admin (5 rows)
- **Columns**: Feature | Free | Pro | Business

### 5. FAQ Section
- **Eyebrow**: Questions
- **H2**: Before you decide.
- **6 details/summary pairs** (typical pricing FAQs)

### 6. Final CTA Section
- **H2**: Start free. Upgrade when you're ready.
- **CTAs**: Start free | Upgrade now

---

# Duplication Analysis

## ⚠️ Significant Duplications Found

### 1. **"5 Trips Free" CTA** — HIGH DUPLICATION
- **Locations**: 
  - index.html: Hero stat strip + Final CTA
  - calculator.html: Result display CTA + Section CTA
- **Issue**: Same offer repeated 3-4 times across pages
- **Recommendation**: Consolidate messaging or vary copy slightly per context

### 2. **GPS Accuracy / ±1m Waypoints** — HIGH DUPLICATION
- **index.html**: Feature grid card + Split section + Comparison table + Stat strip
- **features.html**: Tracking split + Accuracy callout (entire section dedicated)
- **calculator.html**: Implied in lost deduction section ("Cell-tower rounding")
- **accountants.html**: Audit trail card mentions "time-stamped waypoint data"
- **Issue**: Same core value prop explained 4+ times in different ways
- **Recommendation**: Decide primary channel (probably features.html) and link from other pages; simplify homepage version

### 3. **Receipt Capture & AI OCR** — MEDIUM DUPLICATION
- **index.html**: Feature grid card
- **features.html**: Capture split (expanded)
- **Issue**: Homepage has teaser, features page has full explanation
- **Status**: Acceptable pattern (teaser → detail)

### 4. **Desk-to-Dash Workflow** — MEDIUM DUPLICATION
- **index.html**: Feature grid card + Split section (expanded)
- **features.html**: Organize split
- **Issue**: Same workflow explained twice in similar ways
- **Recommendation**: Consolidate on features.html; homepage can use shorter version

### 5. **Multi-Jurisdiction Tax Support (CA, US, DE, AT, BE)** — MEDIUM DUPLICATION
- **index.html**: "Multi-jurisdiction tax support" in Desk-to-Dash split checklist
- **features.html**: Feature grid card "Multi-jurisdiction tax"
- **accountants.html**: Feature grid card "Multi-jurisdiction accuracy"
- **pricing.html**: Feature matrix rows (isolated to Business tier + above)
- **Issue**: Repeated across 4 pages, sometimes with slightly different framing
- **Recommendation**: Feature should be mentioned once prominently; other pages can link or reference

### 6. **Audit-Defense Vault** — MEDIUM DUPLICATION
- **index.html**: REMOVED from homepage (was in accountants section), but vault concept is implicit in "Audit-ready in one record"
- **features.html**: Feature grid card "Audit-Defense Vault"
- **accountants.html**: Entire "Main Section" dedicated to Audit-Defense Vault
- **Issue**: Core value prop for accountants, explained in two places
- **Status**: Acceptable (features overview vs. accountants deep dive)

### 7. **FAQ Sections** — MEDIUM DUPLICATION
- **index.html**: 6 FAQs aimed at finance teams ("Before you roll it out")
- **pricing.html**: 6 FAQs aimed at general buyers ("Before you decide")
- **Issue**: Similar question patterns (privacy, rollout, workflow fit) asked in both
- **Recommendation**: Consider consolidating to one FAQ page or make questions more distinct per audience

### 8. **CRA-Compliant Export** — LOW DUPLICATION (expected mentions)
- **Appears in**: index (feature grid, split), features (all pages imply it), accountants (Vault feature), pricing (Free tier lacks it, Pro+ have it)
- **Status**: Acceptable; it's a core differentiator and should be visible everywhere

### 9. **Pricing Teaser vs. Full Pricing Page** — LOW DUPLICATION (expected pattern)
- **index.html**: 3 cards (Free | Pro | Business)
- **pricing.html**: Same 3 cards + Billing toggle + Value math + Feature matrix + FAQ
- **Status**: Acceptable; homepage teaser is appropriate

### 10. **"Start Free" CTA** — LOW DUPLICATION (branding)
- **Everywhere**: Every page has this CTA
- **Status**: Expected; consistent call-to-action

---

## Summary of Recommendations

| Idea | Severity | Action |
|------|----------|--------|
| 5 trips free offer | 🔴 High | Consolidate or vary messaging |
| GPS accuracy ±1m | 🔴 High | Centralize on features page; link from homepage |
| Desk-to-Dash workflow | 🟡 Medium | Move detail to features; simplify homepage |
| Multi-jurisdiction tax | 🟡 Medium | Mention once per page max; link for details |
| FAQ sections | 🟡 Medium | Consider single FAQ page or audience-distinct questions |
| Receipt capture | 🟢 Low | Acceptable (teaser → detail pattern) |
| Audit-Defense Vault | 🟢 Low | Acceptable (overview → deep dive pattern) |
| Pricing teaser | 🟢 Low | Acceptable (homepage → detail pattern) |
