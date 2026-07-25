# Snapajoy Live Content Comparison

Date: 2026-07-25

## Compared Sources

- Local target: `http://127.0.0.1:8791/index.html`
- Live target: `https://www.snapajoy.com/`
- Local files and sitemap in `D:\work\snapajoy\website`

## Live Homepage Content

The live homepage works as a mostly single-page site. Its top navigation and footer link to:

- Home
- How it works anchor
- Pricing anchor
- Examples anchor
- Reviews anchor
- Editor: `/editor`
- Help: `/help`
- FAQ anchor
- Shipping: `/shipping`
- Refunds: `/refunds`
- Privacy: `/privacy`
- Contact: `/contact`
- About: `/about`
- Offers: `/offers`
- Terms: `/terms`
- Cookies: `/cookies`

Homepage sections on live:

- Hero: WhatsApp-first photo album creation.
- Why everyone loves Snapajoy.
- Four-step process.
- Memory occasions.
- Bundles and pricing.
- Real books from families.
- Reviews.
- FAQ.
- Reassurance strip.
- Final WhatsApp CTA.

## Local Content Coverage

The local site has standalone pages for:

- `index.html`
- `how-it-works.html`
- `pricing.html`
- `examples.html`
- `reviews.html`
- `photo-books.html`
- `offers.html`
- `about.html`
- `help.html`
- `contact.html`
- `privacy.html`
- `shipping-delivery.html`
- `refunds-replacements.html`
- `terms.html`
- `cookies.html`
- `gifts/gifts-for-mom.html`
- `gifts/anniversary-gifts.html`
- `gifts/diwali-gifts.html`
- `gifts/baby-milestone-gifts.html`
- `gifts/wedding-gifts.html`

## Gaps And Naming Differences

- Live has `/editor`; local has no editor page.
- Live uses `/shipping`; local uses `shipping-delivery.html`.
- Live uses `/refunds`; local uses `refunds-replacements.html`.
- Live homepage anchors for pricing, examples, reviews, and process should map to local standalone pages plus homepage preview sections.
- Local has stronger SEO coverage than live through `photo-books.html` and the gift pages.

## Redesign Implication

Keep the local standalone page set. The homepage redesign should preserve links to pricing, examples, help, reviews, offers, and policy pages. Add an editor link only if Snapajoy wants to support that route in this static site. For deployment parity with the live domain, decide whether to add redirects or duplicate filenames for `/shipping`, `/refunds`, and `/help`.
