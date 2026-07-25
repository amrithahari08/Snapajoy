# SEO Audit - Snapajoy Website - 2026-07-25

> Partial audit - Lighthouse/GSC data missing. Static checks below were run without OAuth, Search Console, or PageSpeed field data.

## What Was Checked

- Local HTML pages in `D:\work\snapajoy\website`
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- Homepage JSON-LD presence
- Canonical, title, description, viewport, H1, and Open Graph basics
- Live `https://www.snapajoy.com/` URL structure for overlap decisions

## Summary

The local site has good static SEO coverage for a small static site: every HTML page has one H1, viewport meta, a title, a meta description, and a canonical. The homepage has JSON-LD and Open Graph tags. The sitemap covers a broader SEO page set than the live homepage, including `photo-books` and gift-intent pages.

The main problems are canonical/domain mismatch risk, `.html` versus clean live URL structure, thin schema outside the homepage, and AI retrieval bot policy.

## High-Impact Findings

### [P0] Decide the canonical production domain

Current local canonicals and sitemap use `https://www.snapajoy.in/`. The user is comparing against `https://www.snapajoy.com/` and wants the live Snapajoy link structure for overlapping pages.

Fix: pick one production domain. If `www.snapajoy.com` is the production domain, update canonicals, sitemap, `llms.txt`, Open Graph URLs, and robots sitemap URL to `https://www.snapajoy.com/`.

### [P0] Align overlapping URLs with live Snapajoy clean routes

Live uses clean routes such as `/help`, `/shipping`, `/refunds`, `/privacy`, `/contact`, `/about`, `/offers`, `/terms`, and `/cookies`. Local files use `.html` names and longer policy names such as `shipping-delivery.html` and `refunds-replacements.html`.

Fix: use clean URLs as canonical routes. Keep `.html` files as implementation files or redirect sources. Add clean-route equivalents or redirects for overlapping pages.

### [P0] Add explicit AI retrieval bot policy

`robots.txt` names and blocks `GPTBot`, `ClaudeBot`, and `Google-Extended`. Those are training or extended-use policies. For AI search visibility, retrieval bots should be explicit.

Fix if Snapajoy wants AI discoverability:

```txt
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

Keep training bot rules separate if Snapajoy wants to block training use.

### [P1] Add schema beyond the homepage

Only `index.html` currently has JSON-LD. Inner pages can become easier for Google and AI systems to understand with page-specific schema.

Fix:

- `Organization` and `WebSite` on homepage.
- `Product` or `Service` on `photo-books` and pricing pages.
- `FAQPage` on FAQ/help sections.
- `BreadcrumbList` on inner pages.
- `ItemList` for examples, product formats, and gift categories where useful.

### [P1] Add product format and material facts

The site should include concrete product details for AI-readable discovery and buyer confidence:

- Album sizes: 8x6, 8x8, 10x10.
- Binding: layflat and absolute layflat.
- Paper quality: add confirmed GSM, finish, print, cover, and durability details when available.

Place these on `photo-books`, `pricing`, and a short homepage summary.

## Medium-Impact Findings

### [P2] Meta descriptions are present but some are short or over target

All pages have descriptions. Several are below 150 characters, and the homepage is 182 characters.

Fix: tune priority pages to roughly 150-160 characters when rewriting content. Do not over-optimize policy pages.

### [P2] Open Graph coverage is homepage-only

Only the homepage has Open Graph tags in the static audit.

Fix: add Open Graph title, description, URL, and image to priority pages: `photo-books`, `pricing`, `examples`, `reviews`, and gift pages.

### [P2] `llms.txt` needs canonical URL alignment

`llms.txt` points to `snapajoy.in` and `.html` paths. If production moves to `snapajoy.com` clean URLs, update `llms.txt` to match.

## Keep

- One H1 per page.
- Viewport meta on every page.
- Canonical on every page.
- Existing sitemap coverage for SEO landing pages.
- `llms.txt` as a supporting AI-readable index.
- Gift-intent pages for Indian search behaviour.

## Not Measured

- Core Web Vitals.
- Mobile Lighthouse.
- Search Console index coverage.
- Submitted sitemap status.
- Real keyword impressions and click-through rate.

Run the full SEO/GEO skill flow with Search Console and PageSpeed access later to fill those gaps.
