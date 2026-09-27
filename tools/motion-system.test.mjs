import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const htmlPages = [
  ...readdirSync(new URL("../", import.meta.url))
    .filter((name) => name.endsWith(".html"))
    .map((name) => name),
  ...readdirSync(new URL("../gifts/", import.meta.url))
    .filter((name) => name.endsWith(".html"))
    .map((name) => `gifts/${name}`),
];

test("uses the exact official Snapajoy colour tokens", () => {
  const css = read("styles.css");

  assert.match(css, /--violet:\s*#7b6cf6;/i);
  assert.match(css, /--violet-dk:\s*#5a4ed5;/i);
  assert.match(css, /--violet-lt:\s*#eef0ff;/i);
  assert.match(css, /--coral:\s*#ef6060;/i);
  assert.match(css, /--coral-lt:\s*#fdeaea;/i);
  assert.match(css, /--ink:\s*#1c1a2e;/i);
});

test("uses a documented variable-weight typography hierarchy", () => {
  const css = read("styles.css");

  for (const [token, value] of [
    ["light", "300"],
    ["regular", "400"],
    ["medium", "500"],
    ["semibold", "600"],
    ["bold", "700"],
    ["extrabold", "800"],
  ]) {
    assert.match(css, new RegExp(`--font-weight-${token}:\\s*${value};`));
  }

  assert.match(css, /\.hero-title[\s\S]*font-weight:\s*var\(--font-weight-extrabold\)/);
  assert.match(css, /\.section-title[\s\S]*font-weight:\s*var\(--font-weight-bold\)/);
  assert.match(css, /\.page-lead[\s\S]*font-weight:\s*var\(--font-weight-light\)/);

  for (const page of htmlPages) {
    const html = read(page);
    if (!html.includes("fonts.googleapis.com")) continue;
    assert.match(html, /Plus\+Jakarta\+Sans:wght@300\.\.800/);
    assert.match(html, /Inter:wght@300\.\.800/);
  }
});

test("uses the lowercase three-part wordmark only in shared brand lockups", () => {
  const css = read("styles.css");
  const pagesWithLockups = htmlPages.filter((page) => read(page).includes("brand-name"));

  assert.ok(pagesWithLockups.length >= 20);
  assert.match(css, /\.brand-snap[\s\S]*color:\s*var\(--violet\)/);
  assert.match(css, /\.brand-a[\s\S]*color:\s*var\(--violet-dk\)/);
  assert.match(css, /\.brand-joy[\s\S]*color:\s*var\(--ink\)/);

  for (const page of pagesWithLockups) {
    const html = read(page);
    assert.doesNotMatch(html, /class="brand-mark"/);
    assert.match(html, /class="sr-only">snapajoy<\/span>/);
    assert.match(html, /class="brand-snap"[^>]*>snap<\/span>/);
    assert.match(html, /class="brand-a"[^>]*>a<\/span>/);
    assert.match(html, /class="brand-joy"[^>]*>joy<\/span>/);
  }
});

test("declares reusable motion tokens and pattern hooks", () => {
  const css = read("styles.css");

  assert.match(css, /--motion-duration-fast:/);
  assert.match(css, /--motion-duration-base:/);
  assert.match(css, /--motion-duration-focal:/);
  assert.match(css, /--motion-ease-out:/);
  assert.match(css, /\[data-motion="hero-settle"\]/);
  assert.match(css, /\[data-motion="layflat-reveal"\]/);
  assert.match(css, /\[data-motion-group="stagger"\]/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("uses a perceptible motion rhythm without slowing routine feedback", () => {
  const css = read("styles.css");

  assert.match(css, /--motion-duration-instant:\s*120ms;/);
  assert.match(css, /--motion-duration-fast:\s*160ms;/);
  assert.match(css, /--motion-duration-feedback:\s*260ms;/);
  assert.match(css, /--motion-duration-product:\s*760ms;/);
  assert.match(css, /--motion-duration-base:\s*420ms;/);
  assert.match(css, /--motion-duration-medium:\s*600ms;/);
  assert.match(css, /--motion-duration-focal:\s*850ms;/);
  assert.match(css, /--motion-stagger:\s*90ms;/);
});

test("uses layered album geometry for the approved Quiet Craft interaction", () => {
  for (const page of ["index.html", "photo-books.html", "pricing.html"]) {
    const html = read(page);
    assert.match(html, /class="book-pages"/);
    assert.match(html, /class="book-cover"/);
  }

  const css = read("styles.css");
  assert.match(css, /\.book-cover/);
  assert.match(css, /rotateY\(-22deg\)/);
  assert.match(css, /var\(--motion-duration-product\)/);
  assert.match(css, /--book-cover-image:\s*none/);

  for (const page of ["index.html", "photo-books.html", "pricing.html"]) {
    const html = read(page);
    assert.equal((html.match(/data-cover-artwork/g) || []).length, 3);
  }
});

test("opens album imagery once and keeps the settled state", () => {
  const css = read("styles.css");
  const js = read("script.js");
  const albumHooks = htmlPages.reduce(
    (count, page) => count + (read(page).match(/data-motion="album-open"/g) || []).length,
    0
  );

  assert.ok(albumHooks >= 12);
  assert.match(js, /album-open/);
  assert.match(js, /is-opened/);
  assert.match(js, /pointerenter/);
  assert.match(js, /focusin/);
  assert.match(js, /trigger\.tabIndex = 0/);
  assert.match(js, /threshold:\s*0\.35/);
  assert.match(css, /\[data-motion="album-open"\]\.is-opened/);
  assert.match(css, /var\(--motion-duration-product\)/);
});

test("reveals process steps individually on stacked layouts and slowly in desktop order", () => {
  const css = read("styles.css");
  const js = read("script.js");
  const html = read("index.html");

  assert.match(css, /--motion-duration-step:\s*560ms;/);
  assert.match(css, /--motion-stagger-process:\s*180ms;/);
  assert.match(html, /data-motion-group="process"/);
  assert.match(js, /min-width:\s*1024px/);
  assert.match(js, /process-step/);
  assert.match(js, /--process-index/);
  assert.match(css, /\.process-step\.is-visible::after/);
});

test("keeps the mobile sticky action out of the hero decision area", () => {
  const html = read("index.html");
  const js = read("script.js");

  assert.match(html, /data-sticky-cta-anchor/);
  assert.match(js, /data-sticky-cta-anchor/);
  assert.match(js, /stickyAnchorVisible/);
  assert.match(js, /mobileStickyCta\.inert/);
});

test("adds scroll-aware header elevation without changing sticky semantics", () => {
  const css = read("styles.css");
  const js = read("script.js");

  assert.match(css, /\.site-header\.is-scrolled/);
  assert.match(js, /classList\.toggle\("is-scrolled"/);
  assert.match(css, /position:\s*sticky/);
  assert.match(css, /overflow-x:\s*clip/);
  assert.doesNotMatch(css, /overflow-x:\s*hidden/);
});

test("marks homepage components with reusable motion patterns", () => {
  const html = read("index.html");

  for (const pattern of [
    "hero-settle",
    "section-intro",
    "layflat-reveal",
    "product-interaction",
    "media-card",
    "disclosure",
  ]) {
    assert.match(html, new RegExp(`data-motion="${pattern}"`));
  }
  assert.match(html, /data-motion-group="stagger"/);
  assert.match(html, /data-motion-item/);
});

test("progressively enhances motion without hiding content when JavaScript fails", () => {
  const js = read("script.js");
  const css = read("styles.css");

  assert.match(js, /motion-ready/);
  assert.match(js, /data-motion/);
  assert.match(js, /data-motion-group/);
  assert.doesNotMatch(css, /^\.reveal-on-scroll\s*\{[^}]*opacity:\s*0;/ms);
  assert.match(css, /\.motion-ready[\s\S]*\.is-visible/);
});

test("documents the complete reusable UX system", () => {
  const docPath = new URL("../docs/design/snapajoy-ux-system.md", import.meta.url);
  assert.equal(existsSync(docPath), true);

  const doc = read("docs/design/snapajoy-ux-system.md");
  for (const heading of [
    "Governance",
    "Experience Principles",
    "Colour System",
    "Typography",
    "Spacing and Layout",
    "Shape and Depth",
    "Components",
    "Interaction States",
    "Imagery",
    "Content System",
    "Responsive Design and Accessibility",
    "Extension Recipes",
    "Implementation Checklist",
    "Motion Reference",
  ]) {
    assert.match(doc, new RegExp(`## ${heading}`));
  }
});

test("exports the reusable animation markup workbook", () => {
  const workbook = new URL(
    "../outputs/019f9485-adc5-7320-8324-f579a0795318/Snapajoy_Animation_Markup.xlsx",
    import.meta.url
  );
  assert.equal(existsSync(workbook), true);
});
