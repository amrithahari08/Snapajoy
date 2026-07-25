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

The homepage should also make the edit path clear: start on WhatsApp for the guided flow, then use the web editor when someone wants advanced edits.

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
   - Tertiary link: Make advanced edits on the web.

2. Trust Strip
   - Quality printing.
   - On-time delivery.
   - Preview before print.
   - First design in 10 minutes.
   - Unique designs.

3. Quality Proof
   - Real image slots for paper, cover, and binding.
   - Copy should explain what visitors can judge from the images.

4. WhatsApp Process
   - Send photos.
   - Get the first design.
   - Request edits.
   - Approve before print.
   - Use the web editor for advanced edits.
   - Keep this section visual and short.

5. Memory Rituals And Occasions
   - Family yearbooks.
   - Baby milestones.
   - Travel memories.
   - Weddings.
   - Festivals and anniversaries.
   - Present these as repeat memory use cases, with gift relevance where useful.

6. Formats And Materials
   - Explain album sizes: 8x6, 8x8, and 10x10.
   - Explain binding options: layflat and absolute layflat.
   - Add a short paper-quality section with replacement-ready copy until final GSM, finish, and print specs are confirmed.
   - Place deeper details on `photo-books` and `pricing`, then summarize only the most useful parts on the homepage.

7. Examples Gallery
   - Use open-book placeholders with clear replacement notes.
   - Each image slot should say what real photo should replace it.

8. FAQ And Final CTA
   - Focus on quality, delivery timing, privacy, edits, payment, and WhatsApp flow.
   - Close with WhatsApp CTA and preview-before-print reassurance.

## Image Replacement Map

- Hero: best open photo book spread, warm and premium, with hands or table context if available.
- Quality section: close-up of paper, cover, binding, print texture.
- Process section: phone or WhatsApp conversation next to printed book or preview draft.
- Examples section: open books grouped by use case, such as family yearbook, wedding, baby, travel, and festival.

Each placeholder should be labelled in the markup or visible admin note so the user can replace it later.

## Content Coverage

Keep the local standalone page set, but align overlapping URLs with the live Snapajoy link structure where possible:

- `/`
- `/#how` or `/how-it-works`, depending on whether the implementation keeps a separate page.
- `/#plans` or `/pricing`, depending on whether the implementation keeps a separate page.
- `/#examples` or `/examples`, depending on whether the implementation keeps a separate page.
- `/#reviews` or `/reviews`, depending on whether the implementation keeps a separate page.
- `/editor`
- `/help`
- `/shipping`
- `/refunds`
- `/privacy`
- `/contact`
- `/about`
- `/offers`
- `/terms`
- `/cookies`
- `/photo-books`
- gift pages under `gifts/`

For SEO and AI discovery, use one canonical URL per page. Prefer the live `www.snapajoy.com` clean URL structure for overlapping pages. Keep `.html` files only as implementation files or redirect sources, not canonical URLs. For local-only SEO pages, use clean slugs such as `/photo-books`, `/gifts/gifts-for-mom`, `/gifts/wedding-gifts`, `/gifts/baby-milestone-gifts`, `/gifts/anniversary-gifts`, and `/gifts/diwali-gifts`.

The local site currently lacks `/editor`. Add or preserve an editor destination because the live Snapajoy navigation includes it. Position it as an advanced-edit option, not the default path.

Live `/shipping` and `/refunds` should map to the local shipping and refunds content. If the static implementation keeps `shipping-delivery.html` and `refunds-replacements.html`, add canonical clean-route equivalents or redirects.

## SEO And AI Discoverability

- Use canonical URLs that match the production domain and clean live link structure.
- Keep `sitemap.xml` in sync with the canonical route set.
- Keep `robots.txt` crawlable and include the sitemap URL.
- Name AI retrieval bots explicitly. If Snapajoy wants AI search visibility, allow `OAI-SearchBot`, `Claude-SearchBot`, and `PerplexityBot`.
- Blocking training bots such as `GPTBot`, `ClaudeBot`, and `Google-Extended` can remain a separate policy choice.
- Keep `llms.txt`, but treat it as a supporting file. Do not rely on it instead of crawlable HTML, schema, sitemap, and clear page structure.
- Add structured data where it matches page content: `Organization`, `WebSite`, `Product`, `FAQPage`, `BreadcrumbList`, and page-specific `ItemList` where useful.
- Write pages with clear headings, short answer blocks, and concrete product details so AI systems can extract facts without guessing.
- Add format and material information to `photo-books`, `pricing`, and the homepage summary: 8x6, 8x8, 10x10, layflat, absolute layflat, and paper-quality notes.

## Scope And Boundaries

- Redesign the local homepage first.
- Preserve the local palette and font stack.
- Do not touch any micro structure project or files outside `D:\work\snapajoy\website`.
- Do not invent testimonials, delivery guarantees, material specs, or review counts. When needed, add placement text that will be replaced later.
- Mark image replacement slots clearly for real printed-book assets.
- Do not invent exact paper GSM, finish, turnaround, or shipping timelines until Snapajoy confirms them. Use replacement-ready placement text for those details.

## States And Responsiveness

The homepage must work on desktop and mobile. Mobile should keep the sticky WhatsApp CTA. Text must fit without overlap. The page should use fewer, stronger sections so scrolling feels calmer than the current local homepage. Make sure to check for all the screen resolutions.

## Open Decisions Before Implementation

- Confirm whether "first design in under 10 minutes" is true enough to use as a prominent promise.
- Confirm the production domain for canonical URLs: `www.snapajoy.com` versus `www.snapajoy.in`.
- Decide whether `/editor` exists as a real route or external app link.
- Decide whether deployment supports redirect aliases from `.html` pages to clean URLs.
- Confirm paper GSM, finish, cover options, and delivery timelines before publishing exact material claims.
