# ExpenseFlow Website Redesign Plan

## Overview
Update the ExpenseFlow static website (expenseflow.github.io) with a minimalist landing page, comprehensive privacy policy addressing Apple App Store requirements, and updated terms of use with data access consent clause.

## Context
- **Repository**: `/home/user/PROJECTS/ExpenseFlow/expenseflow.github.io`
- **Website URL**: Deployed via GitHub Pages from `public/` directory
- **Deployment**: Automatic via `.github/workflows/static.yml` on push to main
- **Technology**: Static HTML/CSS only, no frameworks (per requirements)
- **Theme**: Material Design 3-inspired gold theme matching the app

## App Theme to Apply
- **Primary**: #725C0C (deep gold)
- **Accent**: #BFA100 (bright gold)
- **Background**: #FFF8F0 (warm off-white)
- **Text**: #1F1B13 (dark brown)
- **Typography**: Roboto, Noto Sans, system-ui fallbacks
- **Style**: Minimalist, warm, professional

## Files to Create/Modify

### 1. Create: `public/styles.css` (NEW)
Self-contained CSS with:
- CSS custom properties for gold theme
- Typography system (Roboto/Noto Sans)
- Reusable components (buttons, cards, containers)
- Responsive grid system (mobile-first)
- Accessibility features (high contrast, focus states)
- Header, footer, hero, feature cards, pricing cards

### 2. Rewrite: `public/index.html`
**Current**: Single line text file with typo
**New Structure**:
- **Hero Section**: Full-width background (city-waypoints.jpeg), gold gradient overlay
  - H1: "Easy Business Expense Management and Compliance"
  - CTA: "Get Started - Free Trial" → https://get.expenseflow.app
  - Secondary: "Learn More" (scroll to features)
- **Features Section**: 4-column grid (responsive)
  - Automatic trip tracking
  - Mileage calculation
  - Expense management
  - Tax compliance
- **Pricing Section**: 2-column grid
  - Individual: $2/month, 1-week free trial, no credit card
  - Enterprise: Custom pricing, "Contact Sales" → https://aryabhatta.ca/contact
- **Footer**: Privacy, Terms, Contact links, © Aryabhatta Labs 2025

### 3. Rewrite: `public/privacy.html`
**Current**: Hugo/Ananke template, missing critical sections
**Changes**:
- Remove Hugo/Ananke dependencies and CSS references
- Use self-contained `styles.css`
- Update last modified date
- Keep existing 12 sections structure

**Add 4 NEW Sections** (insert after introduction):

**A. Location Data & Trip Tracking**
- What we collect: GPS coordinates, timestamps, activity recognition
- When we collect: Track Drive button, background tracking
- Why we collect: Automatic trip detection, mileage calculation
- How long: 366 days location, 367 days trips (with purpose explanation)
- Who can access: User, org admins, encrypted, no selling

**B. Background Location Tracking**
- Explain continuous tracking when app closed
- Battery optimization
- How to disable (device settings + in-app)

**C. Third-Party Services & Data Sharing**
List all services with purpose and data shared:
- Google Maps API: GPS coordinates for geocoding
- Sentry: Error tracking (anonymized)
- Stripe: Payment processing
- RevenueCat: Subscription management
- Postmark: Transactional emails

**D. Your Privacy Rights**
- How to access data (Export My Data)
- How to delete data (Delete Account)
- How to stop tracking (Track Drive button)
- GDPR rights (EU residents): access, rectification, erasure, object, portability
- CCPA rights (California): know, delete, opt-out (we don't sell data)

**Update Existing Sections**:

**Section 5 (Limiting Use, Disclosure and Retention)**:
- Expand data retention list with formatted bullets
- Add purpose explanation for each retention period
- Link retention to feature value (e.g., "366 days for annual tax reporting")

**Section 7 (Safeguarding Customer Information)**:
- Add: "We have an offline mechanism to only allow access to user data to specific allowed individuals and that access is logged"

### 4. Update: `public/terms.html`
**Current**: Hugo/Ananke template, generic Aryabhatta Labs terms
**Changes**:
- Remove Hugo/Ananke dependencies
- Use self-contained `styles.css`
- Update last modified date
- Keep existing 12 sections

**Add NEW Section 5.1** (between Section 5 and Section 6):

**"Support Access & Data Consent"**
- By creating support ticket, you grant implicit consent for data access
- Access is: limited to minimum necessary, by authorized individuals only, logged/auditable, auto-revoked after resolution
- You can withdraw consent anytime (closes ticket, limits support ability)
- Access revoked after issue resolved

### 5. Copy Assets
From app directories to `public/assets/`:
- `/home/user/PROJECTS/ExpenseFlow/ExpenseFlow/mobile-apps/assets/logo.jpeg` → `public/assets/logo.jpeg`
- `/home/user/PROJECTS/ExpenseFlow/ExpenseFlow/mobile-apps/assets/logo_source.png` → `public/assets/logo.png`

### 6. Create: `public/assets/favicon.ico` (NEW)
Simple favicon with gold "E" or gold square (#BFA100)

## Implementation Sequence

### Step 1: Asset Preparation
1. Copy logo.jpeg and logo_source.png from mobile-apps to public/assets/
2. Create simple favicon.ico (gold theme)

### Step 2: Create CSS Foundation
1. Create `public/styles.css` with complete theme system
2. Include all components: buttons, cards, header, footer, hero, features, pricing
3. Add responsive breakpoints (mobile-first)
4. Add accessibility features

### Step 3: Build Landing Page
1. Rewrite `public/index.html` with hero, features, pricing, footer
2. Link to styles.css
3. Add proper meta tags (title, description, Open Graph)
4. Use city-waypoints.jpeg for hero background

### Step 4: Update Privacy Policy
1. Rewrite `public/privacy.html` structure
2. Remove Hugo/Ananke references
3. Add 4 new sections (Location Data, Background Tracking, Third-Party Services, Privacy Rights)
4. Update retention section with detailed explanations
5. Add offline access mechanism to safeguarding section
6. Use consistent header/footer with landing page

### Step 5: Update Terms of Use
1. Rewrite `public/terms.html` structure
2. Remove Hugo/Ananke references
3. Add Section 5.1 (Support Access & Data Consent)
4. Use consistent header/footer with landing page

### Step 6: Quality Assurance
1. Validate HTML (W3C validator)
2. Test responsive design (320px mobile, 768px tablet, 1024px+ desktop)
3. Check accessibility (keyboard navigation, screen readers, high contrast)
4. Verify all links work
5. Ensure privacy policy addresses all TICKET.md issues

## Key Requirements Checklist

### Landing Page
- ✓ Minimalist design with gold theme
- ✓ Highlight "Easy Business Expense Management and Compliance"
- ✓ Pricing: $2/mo with 1-week free trial
- ✓ Enterprise: Contact sales link
- ✓ Link to app: https://get.expenseflow.app
- ✓ Copyright: Aryabhatta Labs
- ✓ Contact: https://aryabhatta.ca/contact
- ✓ Links to privacy.html and terms.html

### Privacy Policy (Addresses TICKET.md Issue #505)
- ✓ Explain "Track Drive" feature
- ✓ Explain location data purpose (automatic trip detection)
- ✓ Detail what GPS data includes (coordinates, timestamps, activity)
- ✓ List all third-party services (Google Maps, Sentry, Stripe, RevenueCat, Postmark)
- ✓ Explain background location tracking
- ✓ Explain user control mechanisms
- ✓ Connect retention periods to feature purpose
- ✓ Include GDPR/CCPA compliance statements
- ✓ Add offline access mechanism (logged access by authorized individuals)
- ✓ High-level summaries only (NO implementation details)

### Terms of Use
- ✓ Add support ticket data access consent clause
- ✓ Access is logged and auditable
- ✓ Access revoked after issue resolved
- ✓ User can withdraw consent

### Technical
- ✓ Static HTML/CSS only, no frameworks
- ✓ Self-contained CSS (no external dependencies except Google Fonts)
- ✓ Mobile responsive
- ✓ Accessibility compliant
- ✓ Fast loading
- ✓ Works without JavaScript

## Content Guidelines

### Privacy Policy
- Use plain language (avoid legalese)
- Break into clear sections with headings
- Use bullet points and lists
- Explain WHY data is collected, not just WHAT
- High-level descriptions only (e.g., "encrypted in transit and at rest" not "AES-256-GCM")

### Terms of Use
- Keep professional legal tone
- Be specific about consent mechanism
- Emphasize user control and transparency

### Landing Page
- Focus on benefits, not features
- Use warm, professional tone
- Clear calls-to-action
- Emphasize ease of use and compliance

## Success Criteria

### Functional
- Landing page loads and displays correctly
- All links work (privacy, terms, contact, app)
- Pricing information is clear
- Privacy policy addresses all 8 TICKET.md issues
- Terms include data access consent

### Design
- Consistent gold theme across all pages
- Mobile responsive (works on 320px)
- Professional, minimalist aesthetic
- High contrast for accessibility

### Legal
- Privacy policy compliant with Apple App Store requirements
- GDPR/CCPA rights explained
- Third-party services disclosed
- Support data access consent documented

### Technical
- Valid HTML5
- Self-contained files (except Google Fonts)
- No JavaScript required
- Fast loading (<2 seconds)
- Accessible (keyboard, screen readers)

## Notes
- Remove `<meta name="robots" content="noindex, nofollow">` from privacy/terms pages (allow indexing)
- Update "Last Updated" dates to current date (2025-12-27)
- Change branding from generic "Aryabhatta Labs" to "ExpenseFlow" in page titles
- Ensure consistent header/footer across all pages
- Fix typo in current index.html ("easey" → "easy")

## Critical Files

### To Modify
- `/home/user/PROJECTS/ExpenseFlow/expenseflow.github.io/public/index.html`
- `/home/user/PROJECTS/ExpenseFlow/expenseflow.github.io/public/privacy.html`
- `/home/user/PROJECTS/ExpenseFlow/expenseflow.github.io/public/terms.html`

### To Create
- `/home/user/PROJECTS/ExpenseFlow/expenseflow.github.io/public/styles.css`
- `/home/user/PROJECTS/ExpenseFlow/expenseflow.github.io/public/assets/favicon.ico`

### To Copy
- Source: `/home/user/PROJECTS/ExpenseFlow/ExpenseFlow/mobile-apps/assets/logo.jpeg`
- Destination: `/home/user/PROJECTS/ExpenseFlow/expenseflow.github.io/public/assets/logo.jpeg`

- Source: `/home/user/PROJECTS/ExpenseFlow/ExpenseFlow/mobile-apps/assets/logo_source.png`
- Destination: `/home/user/PROJECTS/ExpenseFlow/expenseflow.github.io/public/assets/logo.png`
