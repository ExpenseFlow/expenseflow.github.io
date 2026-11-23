/**
 * Single source of truth for mileage rates used by the calculators, the
 * rates pages and the homepage teaser. Update here each January.
 * SEO text (titles, meta, FAQ, headline figures) is static HTML and must be
 * updated by hand: search the site for "72.5" / "76¢" / "73¢" / "0.73".
 */
window.EF_RATES = {
  year: 2026,
  US: { h1: 0.725, h2: 0.76 },
  CA: {
    tierKm: 5000,
    provinces: [0.73, 0.67],
    territories: [0.77, 0.71]
  },
  taxRates: [0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45]
};
