# Snapajoy Homepage Redesign Design

Date: 2026-07-25

## Job And Audience

Redesign the Snapajoy homepage for a 60 percent memory keeper and 40 percent urban gift buyer audience. Memory keepers come back to create family yearbooks, baby books, travel books, and milestone books. Gift buyers need confidence that Snapajoy can create a polished photo book without making them learn a design tool.

The homepage should feel accessible premium: refined, warm, trustworthy, and priced for Indian families. It should borrow restraint from MILK Books without feeling distant or luxury-only.

## Outcome And Proof

The homepage should make visitors trust Snapajoy enough to start on WhatsApp. Trust should come from four proof types:

- Real printed open-book imagery.
- Clear product quality cues.
- Preview, edit, and approve before print.
- Easy WhatsApp creation, including the promise that the first design can arrive in under 10 minutes when operationally true.

The primary CTA remains `Start on WhatsApp`. Secondary CTAs should point to examples and pricing, not a heavy editor flow.

## Selected Direction

Use the Keepsake Trust Homepage approach.

The hero should lead with a real open-book image and a short memory-led headline. The page should position Snapajoy as a high-quality photo book service with a human-guided WhatsApp flow. Speed supports the brand promise, but quality and trust lead.

The current local palette and fonts stay:

- Plus Jakarta Sans for display.
- Inter for body.
- JetBrains Mono for small labels.
- Violet, coral, amber, ink, white, and light canvas colors from `styles.css`.

Reduce text density. Replace strategy-like explanatory copy with short proof-led sections.

## Page Structure

1. Hero
   - One large real printed open-book image.
   - Headline focused on memory preservation.
   - Three proof points: high-quality photo books, first design in under 10 minutes, preview and approve before print.
   - Primary CTA: Start on WhatsApp.
   - Secondary CTA: See examples.

2. Trust Strip
   - Quality printing.
   - On-time delivery.
   - Preview before print.
   - Human support on WhatsApp.

3. Quality Proof
   - Real image slots for paper, cover, binding, packaging, and open spreads.
   - Copy should explain what visitors can judge from the images.

4. WhatsApp Process
   - Send photos.
   - Get the first design.
   - Request edits.
   - Approve before print.
   - Keep this section visual and short.

5. Memory Rituals And Occasions
   - Family yearbooks.
   - Baby milestones.
   - Travel memories.
   - Weddings.
   - Festivals and anniversaries.
   - Present these as repeat memory use cases, with gift relevance where useful.

6. Examples Gallery
   - Use open-book placeholders with clear replacement notes.
   - Each image slot should say what real photo should replace it.

7. FAQ And Final CTA
   - Focus on quality, delivery timing, privacy, edits, payment, and WhatsApp flow.
   - Close with WhatsApp CTA and preview-before-print reassurance.

## Image Replacement Map

- Hero: best open photo book spread, warm and premium, with hands or table context if available.
- Quality section: close-up of paper, cover, binding, print texture, or packaging.
- Process section: phone or WhatsApp conversation next to printed book or preview draft.
- Examples section: open books grouped by use case, such as family yearbook, wedding, baby, travel, and festival.

Each placeholder should be labelled in the markup or visible admin note so the user can replace it later.

## Content Coverage

Keep the local standalone page set:

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
- gift pages under `gifts/`

The live site has an `/editor` link that the local site does not have. Do not add an editor link unless Snapajoy wants that route in this static site. Live `/shipping` and `/refunds` map to local `shipping-delivery.html` and `refunds-replacements.html`.

## Scope And Boundaries

- Redesign the local homepage first.
- Preserve the local palette and font stack.
- Preserve existing standalone pages and footer coverage.
- Do not touch any micro structure project or files outside `D:\work\snapajoy\website`.
- Do not invent testimonials, delivery guarantees, material specs, or review counts.
- Mark image replacement slots clearly for real printed-book assets.

## States And Responsiveness

The homepage must work on desktop and mobile. Mobile should keep the sticky WhatsApp CTA. Text must fit without overlap. The page should use fewer, stronger sections so scrolling feels calmer than the current local homepage.

## Open Decisions Before Implementation

- Confirm whether "first design in under 10 minutes" is true enough to use as a prominent promise.
- Decide whether to add local support for the live `/editor` route.
- Decide whether deployment needs redirect aliases for `/shipping` and `/refunds`.
