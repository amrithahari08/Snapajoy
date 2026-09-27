# Snapajoy UX System

Version 1.3
Last updated: 30 July 2026
Implementation source: `styles.css`, `script.js`, and the shared website HTML

This document is the implementation source of truth for Snapajoy website pages and components. It records the values already used by the site so future work extends one coherent system.

## Governance

### Purpose and authority

Use this system to keep Snapajoy warm, calm, trustworthy, and recognisable as the website grows. When sources differ, use this order:

1. The official Snapajoy brand guide for identity, wordmark, logo, brand colours, and brand typefaces.
2. This UX system for website use and component behaviour.
3. `styles.css` and `script.js` for shipped implementation details.
4. Page briefs and copy documents for approved content.

Do not alter official wordmark colours, stretch the logo, or substitute fonts inside the wordmark.

### Versioning and extension

- Record a version and date when a token, shared component, or rule changes.
- Treat a token change as a system change, not a local page fix.
- Use existing tokens, components, and motion Pattern IDs before adding anything.
- Add a pattern only when an existing pattern cannot express the required behaviour.
- Update this document and the motion workbook with the implementation.
- Preserve approved copy, SEO structure, and product facts unless content changes are in scope.
- A new token needs a semantic role, evidence that no current token serves it, contrast checks, and documentation here.

One-off hex values, radii, shadows, spacing scales, or animation timings are not accepted.

## Experience Principles

1. **Warm:** Use real family stories, plain language, and small coral details.
2. **Calm:** Give each section one job. Keep actions predictable and movement brief.
3. **Trustworthy:** Put measurable promises and approval, payment, privacy, and delivery details near the relevant decision.
4. **Premium-light:** Let print quality, typography, spacing, and photography signal quality.
5. **India-aware:** Use Indian pricing, familiar occasions, direct delivery language, and culturally representative photography without stereotypes.
6. **WhatsApp-friendly:** Make WhatsApp the easiest starting point while keeping the web editor available for advanced changes.

## Colour System

### Tokens and roles

| Token | Exact value | Semantic role |
| --- | --- | --- |
| `--violet` | `#7B6CF6` | Primary identity, actions, links, focus |
| `--violet-dk` | `#5A4ED5` | Accessible primary-action surfaces, hover emphasis, strong violet text |
| `--violet-lt` | `#EEF0FF` | Soft identity and selected surfaces |
| `--coral` | `#EF6060` | Emotional punctuation and small motion accents |
| `--coral-lt` | `#FDEAEA` | Soft coral surface |
| `--ink` | `#1C1A2E` | Primary text and dark surfaces |
| `--ink-muted` | `#6B7280` | Supporting text and metadata |
| `--canvas` | `#F7F8FC` | Page background |
| `--border` | `#E4E6F0` | Dividers, outlines, neutral controls |
| `--white` | `#FFFFFF` | Cards, controls, text on dark |
| `--amber` | `#F59E0B` | Attention and time-sensitive information |
| `--success` | `#22C55E` | Functional confirmation only |

### Approved combinations

- Ink on white or canvas for reading.
- Ink muted on white or canvas for supporting copy.
- White on violet dark for primary buttons. This combination is 6.03:1.
- Violet dark on violet light for selected or identity surfaces.
- White on ink for hero and dark CTA surfaces.
- Coral on white or coral light only for short accents.
- Success with a text or icon label, never as the only state indicator.

Normal text must meet WCAG AA 4.5:1. Large text and essential graphical objects must meet 3:1. Focus rings use a 2px violet outline with 3px offset. Recheck contrast over photography.

### Prohibited uses

- No coral body text, primary buttons, or colour-only states.
- No success green as a decorative brand colour.
- No substitute versions of official violet, coral, ink, or canvas.
- No page dominated by shades of one hue.
- Never recolour the official wordmark.

## Typography

| Role | Family | Loaded weights | Fallback |
| --- | --- | --- | --- |
| Display | Plus Jakarta Sans | Variable 300-800 | `sans-serif` |
| Body and interface | Inter | Variable 300-800 | `sans-serif` |
| Metadata | JetBrains Mono | 400, 500 | `monospace` |

```css
--font-display: "Plus Jakarta Sans", sans-serif;
--font-body: "Inter", sans-serif;
--font-mono: "JetBrains Mono", monospace;
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Scale and use

- Hero and page H1: Plus Jakarta Sans Extra Bold 800, `clamp(2.5rem, 6vw, 4.75rem)`, line-height 1.05.
- Homepage hero H1: capped at 5rem; 2.2rem below 480px.
- Section H2: Plus Jakarta Sans Bold 700, `clamp(2rem, 4vw, 3rem)`, line-height 1.05.
- Component and process headings: Plus Jakarta Sans Semibold 600. Footer group heading: 18px.
- Body and FAQ answers: Inter Regular 400 at 16px/1.55.
- Lead and section copy: Inter Light 300 at a minimum 18px/1.6, maximum 58ch, only on calm light surfaces.
- Navigation and links: Inter Medium 500 at 15px. Buttons and important interface labels: Inter Semibold 600.
- Metadata and eyebrow: 11px to 12px in JetBrains Mono.

Use at least Inter Regular 400 for text over photography, violet, ink, or another dark surface. Thin 100 and Extra Light 200 are prohibited for functional website text. Extra Bold 800 is reserved for major display hierarchy, not paragraphs or whole interface regions.

Use Plus Jakarta Sans for headings and important proof, Inter for reading and controls, and JetBrains Mono sparingly for metadata and sequence numbers. Keep letter spacing at 0. Use sentence case except short uppercase metadata. Keep body measures near 45 to 70 characters and approximately three visibly distinct type levels within a section. Do not add viewport-scaled type outside the documented `clamp()` values.

## Spacing and Layout

- Shell maximum: 1200px.
- Shell padding: 20px default, 28px from 768px.
- Header: 76px. Mobile sticky allowance: 88px plus the safe-area inset.
- Section block padding: 48px on mobile and tablet; 64px from 1024px.
- Section heading gap: 14px. Heading-to-content space: 36px.
- Standard grid gap: 16px. Button group gap: 12px.
- Use borders between adjacent full-width sections, not floating section cards.

Breakpoints are below 480px for narrow-phone adjustments, 768px for tablet and removal of the sticky action, 1024px for expanded grids, and 1100px for desktop navigation.

Use the 1200px shell for main layout, keep page introductions at or below 760px, and keep prose at or below 58ch. Define grid tracks and image ratios so content changes do not shift adjacent content.

## Shape and Depth

- Radius extra small: 4px.
- Standard small, medium, and large radius: 8px.
- Pill radius: 999px, only for tags, status chips, and truly pill-shaped controls.
- Standard border: 1px solid `--border`.
- Secondary button border: 1.5px solid `--border`.
- Image outline: 1px dark neutral at 10% opacity, inset 1px.

```css
--shadow-sm: 0 1px 3px rgba(28, 26, 46, 0.08),
             0 1px 2px rgba(28, 26, 46, 0.06);
--shadow-md: 0 4px 16px rgba(28, 26, 46, 0.12),
             0 2px 4px rgba(28, 26, 46, 0.06);
--shadow-header: 0 8px 24px rgba(28, 26, 46, 0.07);
--shadow-sticky: 0 -8px 24px rgba(28, 26, 46, 0.08);
--surface-blur: 12px;
```

Use the small shadow for restrained elevation and the medium shadow for interactive lift or an important floating control. Cards are for repeated products, stories, FAQs, policies, and framed tools. Never put cards inside cards or turn a whole section into a decorative card.

## Components

### Header and navigation

Use a sticky canvas header with a bottom border. After 8px of page scroll, add `.is-scrolled` to move the header to a white translucent surface with the documented header shadow. Desktop navigation appears from 1100px. The mobile menu uses a 44px control, accurate `aria-expanded`, and a drawer. Mark the current page with `aria-current="page"`. Keep “Start on WhatsApp” as the primary header action. Supports M08 and M09.

Visible header and footer lockups use the lowercase textual wordmark only: `snap` in Violet, the final `a` in Violet Dark, and `joy` in Ink. The visual spans are hidden from assistive technology and paired with one screen-reader-only `snapajoy`. Do not show the former square S tile. Ordinary prose and copyright mentions remain uncoloured `Snapajoy`.

### Buttons and links

Controls are at least 44px wide; standard buttons are at least 48px high. Primary buttons use violet dark/white, secondary buttons use white/ink/border, and ghost buttons are low emphasis. Labels describe the result or destination. Hover lifts 2px over 260ms; active scales to 0.98 over 120ms; keyboard focus remains visible. Secondary buttons use violet light and a violet border on hover. Supports M08.

### Proof bands

Use for a short set of measurable promises. Give each promise one strong label and one supporting line, and do not repeat them nearby. Keep the stable two-column mobile and four-column desktop grid. Supports M03.

### Product cards

Show size, starting price, relevant format, and one clear destination. Keep book geometry stable and centre it above left-aligned product information. Use the layered `.book-shape`, `.book-pages`, and `.book-cover` structure at 164px for landscape, 154px for standard square, and 174px for large square.

Each card inherits `--book-cover-image: none`, which preserves the styled fallback. Set that custom property on an individual card to a flat front-cover artwork URL without changing its markup. Use 4:3 artwork for 8 x 6 and square artwork for 8 x 8 and 10 x 10. Keep important cover text away from the outer 12% safe area.

On a fine pointer, the card lifts 3px and the cover opens 22 degrees over 760ms. JavaScript adds `.is-opened` on first pointer entry or focus and retains it until page reload. A card without a native focusable descendant receives `tabindex="0"` as a progressive enhancement and uses the shared violet focus ring. On touch, it opens once after approximately 35% enters the viewport. A recommended state needs text, not colour alone. Supports M03 and M05.

### Image and media cards

Use real printed books or relevant occasions with a defined 4:3 `.gift-media` frame, 8px radius, and the inset image outline. Mark photographs that visibly show a photo book with `data-motion="album-open"`. Do not mark hero backgrounds, diagrams, or ordinary lifestyle photography.

The album image begins at a 7% horizontal inset and opens to the full frame over 760ms on first pointer entry or focus, then remains open until reload. An actionable card uses its existing link as the focus target; a standalone album image receives `tabindex="0"` and the shared violet focus ring. Touch layouts open it once after approximately 35% enters the viewport. Fine-pointer hover may also lift an actionable card 2px and zoom its image to no more than 1.025. Supports M04 and M06.

### Process lists

Use numbered sequential steps with short headings. Explain the editor relationship once: “Start on WhatsApp. Edit on the web.” The order must work without animation.

Below 1024px, observe and reveal each stacked process step independently as it enters the reading area. At 1024px and above, reveal the five-column group once with a 180ms ordered delay and a 560ms item transition. Process motion runs once and never delays other grouped cards. Supports M03.

### Pricing tables

Include size, starting price, page assumptions, and clear qualifiers. Align numeric columns. Do not hide essential qualifications in tooltips. Supports M02 or M03.

### FAQs

Use native `details` and `summary`. Questions must resolve objections instead of repeating the page. The plus indicator rotates and changes to coral when open. Supports M07.

### CTA bands

Use one primary action and at most one specific secondary action. Dark ink surfaces may use a white primary button. Do not repeat the same CTA in every section. Supports M02 and M08.

### Footer

Group task-based navigation and related support/legal links. Do not repeat promotional slogans. Motion is not required.

### Mobile sticky action

Show the WhatsApp action below 768px only after the hero WhatsApp action marked with `data-sticky-cta-anchor` leaves the viewport. Hide it again while an input, select, textarea, or editable region has focus. Hidden states set `inert` and `aria-hidden` so the off-screen control cannot receive keyboard focus. Respect safe-area insets and body padding. Supports M10.

## Interaction States

| State | Treatment |
| --- | --- |
| Default | Full contrast, stable geometry, no implied activity |
| Hover | 2-3px lift, restrained shadow, underline, or small image scale on fine pointers |
| Focus-visible | 2px violet outline with 3px offset |
| Active | Button scale 0.98 without shifting layout |
| Open | Content visible, semantics accurate, coral only as a small accent |
| Current | Visible style plus `aria-current="page"` |
| Disabled | Reduced emphasis, no hover, native or `aria-disabled` semantics |
| Loading | Stable dimensions, labelled progress, no indefinite decorative loop |
| Error | Plain-language message near the problem, not colour alone |

Every state remains understandable with motion disabled.

## Imagery

- Use real printed books, open spreads, cover details, and representative Indian family occasions.
- Primary product images show the actual product clearly, not only atmosphere.
- Use meaningful dimensions and ratios to prevent layout shift.
- Apply the inset outline so pale books remain visible on white.
- Do not blur, darken, or crop away details needed to judge the product.
- Replacement notes identify section, subject, orientation, and safe crop.
- Alt text describes useful visual evidence. Decorative images use empty alt text.
- Omit phrases such as “image of” from alt text.

## Content System

### Terms

- Product: **photo book**.
- SEO synonyms: **photo album**, **album**, and **photobook** only in natural contexts.
- Preview: **free video preview**.
- Editing: **Start on WhatsApp. Edit on the web.**
- Purchase state: **before you order**.
- Production state: **after you approve the design**.

### Actions and trust

Use “Start on WhatsApp,” “View sizes and pricing,” “Open the web editor,” “See delivery details,” and “Send feedback on WhatsApp.” Front-load heading topics. Give each core promise one primary location. Use measurable, supportable claims and place preview, delivery, payment, and privacy statements near the decision they support. Use plain Indian English without hype, jargon, or artificial urgency.

## Responsive Design and Accessibility

- All functions work with keyboard, touch, and pointer.
- Touch targets are at least 44 by 44px.
- Focus is visible and source/focus order is logical.
- Use semantic landmarks, headings, buttons, links, lists, tables, labels, and `details`.
- Do not communicate through colour or motion alone.
- Support 200% text zoom and longer labels without clipping.
- Prevent horizontal overflow at 390px and above.
- Keep sticky controls clear of safe-area insets and form controls.
- With JavaScript unavailable, content stays visible and links remain usable.
- With `prefers-reduced-motion: reduce`, remove animation, transition, transform, filter, and clip reveals while preserving final state.
- Motion never loops continuously or blocks reading or action.
- One-time album states persist only for the current page load and never use cookies or local storage.

## Extension Recipes

### Add a component

1. Select the closest documented component and reuse its semantics/classes.
2. Use only documented colour, type, spacing, radius, border, and shadow tokens.
3. Implement every relevant state.
4. Select a supported M01-M10 pattern, or use no motion.
5. Verify keyboard, touch, focus, text expansion, contrast, and reduced motion.
6. Add the instance to the motion workbook.

### Add a section

1. Give it one decision, story, or task.
2. Use a full-width `.section` band with a `.shell`.
3. Use `.section-head`, an informative H2, and a maximum 58ch supporting measure.
4. Reuse an existing grid/layout.
5. Add `data-motion="section-intro"` to the introduction or `data-motion-group="stagger"` to a repeated group.
6. Add `data-motion-item` only to content that should sequence.
7. Confirm the section remains complete and visible without JavaScript.

```html
<section class="section section-white">
  <div class="shell">
    <header class="section-head" data-motion="section-intro">
      <p class="eyebrow">Short metadata</p>
      <h2 class="section-title">Front-loaded section heading</h2>
      <p class="section-copy">One useful supporting statement.</p>
    </header>
    <div class="cards-grid" data-motion-group="stagger">
      <article class="card" data-motion-item>...</article>
    </div>
  </div>
</section>
```

### Add a full page

1. Start from the shared header, main landmark, optional breadcrumbs, and footer.
2. Keep one H1 and a focused introduction.
3. Use existing section, shell, component, and CTA patterns.
4. Preserve metadata, canonical URL, structured data, internal links, and alt text.
5. Select existing motion Pattern IDs, never page-specific timings.
6. Test at 1440 x 900, 768 x 1024, and 390 x 844.
7. Update the approved-copy record and motion-instance inventory.

## Implementation Checklist

- [ ] Official colours match the brand guide and CSS.
- [ ] Font imports include only documented families and weights.
- [ ] One H1 and a scan-friendly heading order are present.
- [ ] Copy uses readable measures and does not duplicate proof.
- [ ] Layout uses shared shells, spacing, grids, and breakpoints.
- [ ] Controls have accurate labels, 44px targets, and visible focus.
- [ ] States have semantics and do not rely on colour alone.
- [ ] Images have stable dimensions, useful crops, outlines, and alt text.
- [ ] Motion uses an existing Pattern ID and documented attributes.
- [ ] Content remains usable when JavaScript fails.
- [ ] Reduced motion yields the final state immediately.
- [ ] No clipping, overlap, horizontal overflow, broken images, or layout shift.
- [ ] Metadata, JSON-LD, canonical links, and internal links remain valid.
- [ ] Desktop, tablet, mobile, keyboard, touch, and rapid interaction are checked.
- [ ] This document, approved copy, and motion workbook are updated when applicable.

## Motion Reference

Detailed pattern recipes and instance markup are in:

`outputs/019f9485-adc5-7320-8324-f579a0795318/Snapajoy_Animation_Markup.xlsx`

The timing rhythm separates feedback from authored entrances:

- 120ms instant and 160ms fast for press, disclosure, and exit feedback.
- 260ms feedback for button, link, navigation, border, and colour states.
- 760ms product timing for the tactile photo-book cover opening.
- 560ms process-step timing.
- 420ms base for section and grouped entrances.
- 600ms medium for the layflat reveal and hero copy.
- 850ms focal for the one hero-photograph settle.
- 90ms stagger between related items, capped at four steps.
- 180ms process-only stagger at 1024px and above.

| ID | Pattern | Selector contract | Components |
| --- | --- | --- | --- |
| M01 | Hero photograph and copy settle | `data-motion="hero-settle"` plus `data-motion-item` | Homepage hero |
| M02 | Section introduction | `data-motion="section-intro"` | Section heads, CTA introductions |
| M03 | Staggered and responsive process group | `data-motion-group="stagger"` or `data-motion-group="process"` plus `data-motion-item` | Proof, cards, process, delivery |
| M04 | One-time album spread reveal | `data-motion="album-open"`; `data-motion="layflat-reveal"` for the initial featured reveal | Album photographs and open-book quality images |
| M05 | Product interaction | `data-motion="product-interaction"` | Product and size cards |
| M06 | Media-card interaction | `data-motion="media-card"` | Occasion and story cards |
| M07 | FAQ disclosure | `data-motion="disclosure"` on the FAQ group | Native FAQ details |
| M08 | Button and link feedback | Shared button/link classes | Buttons, links, coral underlines |
| M09 | Navigation and header state | Shared navigation classes, `.is-scrolled`, and ARIA | Header, menu button, and drawer |
| M10 | Mobile sticky action | `.mobile-sticky-cta`, `[data-sticky-cta-anchor]`, and `.is-hidden` | Mobile WhatsApp action |

M01 settles the hero photograph from 1.025 scale and 88% opacity over 850ms while its copy rises 12px over 600ms in a capped stagger. JavaScript adds `.motion-ready` only after content exists, observes these hooks, applies `.is-visible`, and caps stagger indices at four. The failure state is always static and visible. Coral is permitted only for occasion-link underlines, the open FAQ indicator, and the brief journey-row highlight.

M04 opens album photographs from a restrained horizontal inset on first hover, focus, or touch intersection and retains `.is-opened` for the page view. M05 uses the approved Quiet Craft direction: the product card settles upward by 3px while its cover opens 22 degrees from the spine over 760ms and retains the same state. M06 uses a stable media frame, a 2px card lift, and a 1.025 image scale. Reduced-motion and JavaScript-failure states show complete, static imagery.
