import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "D:/work/snapajoy/website";
const outputDir = path.join(
  root,
  "outputs/019f9485-adc5-7320-8324-f579a0795318"
);
const previewDir = path.join(outputDir, "previews");
const outputPath = path.join(outputDir, "Snapajoy_Animation_Markup.xlsx");

const C = {
  violet: "#7B6CF6",
  violetDark: "#5A4ED5",
  violetLight: "#EEF0FF",
  coral: "#EF6060",
  coralLight: "#FDEAEA",
  ink: "#1C1A2E",
  muted: "#6B7280",
  canvas: "#F7F8FC",
  border: "#E4E6F0",
  white: "#FFFFFF",
  amber: "#F59E0B",
  success: "#22C55E",
};

const wb = Workbook.create();

const titleStyle = {
  fill: C.ink,
  font: { bold: true, color: C.white, size: 22, name: "Plus Jakarta Sans" },
  verticalAlignment: "center",
};
const subtitleStyle = {
  fill: C.violetLight,
  font: { color: C.ink, size: 11, name: "Inter" },
  verticalAlignment: "center",
  wrapText: true,
};
const headerStyle = {
  fill: C.violet,
  font: { bold: true, color: C.white, size: 10, name: "Inter" },
  verticalAlignment: "center",
  wrapText: true,
  borders: { bottom: { style: "medium", color: C.violetDark } },
};
const bodyStyle = {
  font: { color: C.ink, size: 10, name: "Inter" },
  verticalAlignment: "top",
  wrapText: true,
  borders: {
    bottom: { style: "thin", color: C.border },
  },
};
const monoStyle = {
  font: { color: C.violetDark, size: 9, name: "JetBrains Mono" },
  verticalAlignment: "top",
  wrapText: true,
};

function setupSheet(name, endColumn, subtitle) {
  const sheet = wb.worksheets.add(name);
  sheet.showGridLines = false;
  sheet.getRange(`A1:${endColumn}1`).merge();
  sheet.getRange("A1").values = [[name]];
  sheet.getRange(`A1:${endColumn}1`).format = titleStyle;
  sheet.getRange(`A2:${endColumn}3`).merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A2:${endColumn}3`).format = subtitleStyle;
  sheet.getRange("A1").format.rowHeight = 34;
  sheet.getRange("A2").format.rowHeight = 42;
  return sheet;
}

function writeTable(sheet, startRow, headers, rows, endColumn) {
  const headerRange = sheet.getRange(`A${startRow}:${endColumn}${startRow}`);
  headerRange.values = [headers];
  headerRange.format = headerStyle;
  headerRange.format.rowHeight = 30;

  if (rows.length) {
    const bodyRange = sheet.getRange(
      `A${startRow + 1}:${endColumn}${startRow + rows.length}`
    );
    bodyRange.values = rows;
    bodyRange.format = bodyStyle;
    bodyRange.format.rowHeight = 54;
  }
  sheet.freezePanes.freezeRows(startRow);
}

const start = setupSheet(
  "Start Here",
  "F",
  "Use this workbook with docs/design/snapajoy-ux-system.md. Select an existing Pattern ID before adding motion to a component, section, or page."
);
start.getRange("A5:F5").merge();
start.getRange("A5").values = [["How to extend the website"]];
start.getRange("A5:F5").format = {
  fill: C.coralLight,
  font: { bold: true, color: C.ink, size: 14, name: "Plus Jakarta Sans" },
  verticalAlignment: "center",
};
start.getRange("A6:F10").values = [
  ["1", "Choose", "Find the closest component and Pattern ID in Pattern Library.", "", "", ""],
  ["2", "Mark up", "Add the documented data-motion attributes without custom timing.", "", "", ""],
  ["3", "Verify", "Check final-state visibility, reduced motion, keyboard, touch, and JS failure.", "", "", ""],
  ["4", "Record", "Add the shipped location to Current Instances.", "", "", ""],
  ["5", "Review", "Complete Expansion QA and record the reviewer decision.", "", "", ""],
];
start.getRange("A6:F10").format = bodyStyle;
start.getRange("A6:A10").format = {
  fill: C.violetLight,
  font: { bold: true, color: C.violetDark, size: 12, name: "JetBrains Mono" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
start.getRange("B6:B10").format.font = {
  bold: true,
  color: C.ink,
  size: 10,
  name: "Inter",
};
start.getRange("A12:F12").values = [[
  "System rules",
  "Pattern count",
  "Motion source",
  "UX source",
  "Accent rule",
  "Failure rule",
]];
start.getRange("A12:F12").format = headerStyle;
start.getRange("A13:F13").values = [[
  "Reuse before inventing",
  10,
  "styles.css + script.js",
  "docs/design/snapajoy-ux-system.md",
  "Coral only for approved small accents",
  "Content remains static and visible",
]];
start.getRange("A13:F13").format = bodyStyle;
start.getRange("B13").format.numberFormat = "0";
start.getRange("A15:F19").merge();
start.getRange("A15").values = [[
  "Source hierarchy\n1. Official brand guide\n2. Snapajoy UX System Markdown\n3. Shipped CSS and JavaScript\n4. This workbook for detailed motion recipes and reviews",
]];
start.getRange("A15:F19").format = {
  fill: C.canvas,
  font: { color: C.ink, size: 10, name: "Inter" },
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: C.border },
};
start.getRange("A15:F19").format.rowHeight = 22;
start.getRange("A:F").format.columnWidth = 18;
start.getRange("A:A").format.columnWidth = 9;
start.getRange("B:B").format.columnWidth = 16;
start.getRange("C:C").format.columnWidth = 34;

const patternRows = [
  ["M01", "Hero photograph and copy settle", "Establish the page focal point once.", "Primary homepage hero with real photography.", "Inner pages, repeated promos, carousels.", "Page load / first intersection", "Photo settles from 1.025 scale and 88% opacity; copy rises 12px in a capped stagger.", "850 ms photo; 600 ms copy", "90 ms; max 4 steps", "ease-out + standard", "transform, opacity", 'data-motion="hero-settle" + data-motion-item', "Static final state, no transform.", "One per page; no replay.", "Approved"],
  ["M02", "Section introduction", "Clarify a new content band.", "Section heading and short support copy.", "Every small label or nested card.", "First intersection", "Introduction rises 12px and fades in once.", "420 ms", "None", "ease-out + standard", "transform, opacity", 'data-motion="section-intro"', "Static final state.", "Keep the heading readable without JS.", "Approved"],
  ["M03", "Staggered and responsive process group", "Show related items in a readable order.", "Proof, product, process, occasion, or delivery groups.", "Long prose and large tables.", "Group or individual intersection", "Standard groups rise in a capped sequence. Stacked process steps reveal individually; desktop process steps queue in order.", "420 ms standard; 560 ms process", "90 ms standard; 180 ms desktop process", "ease-out + standard", "transform, opacity", 'data-motion-group="stagger" or "process" + data-motion-item', "All items immediately visible.", "Process timing never applies to other groups.", "Approved"],
  ["M04", "One-time album spread reveal", "Echo opening and uncovering a printed spread.", "Product-album photographs in quality, example, story, and gift media.", "Hero backgrounds, diagrams, and ordinary lifestyle photography.", "First hover, focus, or touch intersection", "Horizontal clip opens from 7% inset to the full frame and retains is-opened until reload.", "760 ms clip; 560 ms opacity", "None", "ease-out + standard", "clip-path, opacity", 'data-motion="album-open" + .is-opened; standalone image gets tabindex="0"', "Full image is immediately visible.", "No replay, loop, storage, or layout shift.", "Approved"],
  ["M05", "Product interaction", "Make a product feel tangible.", "Photo-book size/product card with optional flat cover artwork.", "Touch-only interaction or non-product cards.", "First hover, focus, or touch intersection", "Card lifts 3px while the layered cover opens 22 degrees from the spine and retains is-opened until reload.", "760 ms cover; 320 ms card", "None", "ease-out", "transform, translate, shadow, border", 'data-motion="product-interaction" + data-cover-artwork + .is-opened; card gets tabindex="0" when needed', "No transform or translate.", "Keep fallback geometry; use --book-cover-image for artwork.", "Approved"],
  ["M06", "Media-card interaction", "Signal an image card is actionable.", "Occasion or story card with a link.", "Static evidence images or quality close-ups.", "Fine-pointer hover / focus-within", "Card lifts 2px; framed image scales to 1.025; link underline grows in coral.", "600 ms image; 320 ms card; 260 ms link", "None", "ease-out", "transform, translate, background-size", 'data-motion="media-card" + .gift-media', "No transform, translate, or underline animation.", "Crop must remain useful.", "Approved"],
  ["M07", "FAQ disclosure", "Connect question and newly revealed answer.", "Native details/summary FAQ.", "Custom accordion without semantics.", "Open", "Answer moves 4px and fades in; plus rotates and changes to coral.", "160 ms", "None", "ease-out", "transform, opacity, color", 'data-motion="disclosure" on FAQ list', "Answer appears immediately.", "Native details remains source of truth.", "Approved"],
  ["M08", "Button and link feedback", "Confirm hover, focus, and press.", "Buttons and meaningful inline links.", "Disabled controls and decorative text.", "Hover, focus-visible, active", "Button lifts 2px with restrained shadow, then presses to 0.98; link accent grows.", "260 ms hover; 120 ms press", "None", "standard + ease-out", "transform, shadow, background-size", "Shared .btn / .inline-link classes", "State changes remain immediate.", "Focus outline is never removed.", "Approved"],
  ["M09", "Navigation and header state", "Explain navigation state and preserve orientation.", "Sticky header and drawer below desktop breakpoint.", "Decorative floating headers.", "Scroll or menu toggle", "Header gains restrained elevation after 8px; drawer fades and settles 6px; menu bars form a close icon.", "260 ms header; 420 ms enter; 160 ms exit", "None", "ease-out + standard", "transform, opacity, shadow", "Shared .site-header / .is-scrolled / .nav-toggle / .nav-drawer + ARIA", "State changes immediately.", "Close animation keeps drawer in DOM for 180 ms.", "Approved"],
  ["M10", "Mobile sticky action", "Keep the primary action available without duplicating the hero action or blocking forms.", "Mobile WhatsApp action.", "Tablet/desktop or pages with a conflicting fixed control.", "Hero intersection, focus, or viewport state", "Bar stays hidden while the hero action is visible or editable content has focus, then settles into view.", "260 ms", "None", "ease-out", "transform, opacity", ".mobile-sticky-cta + [data-sticky-cta-anchor] + .is-hidden", "Visibility changes immediately.", "Set inert and aria-hidden while off-screen; respect safe-area inset.", "Approved"],
];
const patterns = setupSheet(
  "Pattern Library",
  "O",
  "M01-M10 are reusable contracts. New pages choose a pattern; they do not define new durations or easing."
);
writeTable(
  patterns,
  5,
  ["ID", "Pattern", "Purpose", "Permitted use", "Prohibited use", "Trigger", "Behaviour", "Timing", "Delay / stagger", "Easing", "Properties", "Markup recipe", "Reduced motion", "Guardrail", "Status"],
  patternRows,
  "O"
);
patterns.getRange("A6:A15").format = monoStyle;
patterns.getRange("O6:O15").dataValidation = {
  rule: { type: "list", values: ["Approved", "Needs review", "Retired"] },
};
patterns.getRange("O6:O15").conditionalFormats.add("containsText", {
  text: "Approved",
  format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } },
});
patterns.getRange("A:O").format.columnWidth = 17;
patterns.getRange("A:A").format.columnWidth = 8;
patterns.getRange("B:B").format.columnWidth = 28;
patterns.getRange("G:G").format.columnWidth = 38;
patterns.getRange("L:L").format.columnWidth = 34;
patterns.getRange("M:N").format.columnWidth = 29;

const tokenRows = [
  ["T01", "--motion-duration-instant", "120ms", "Press feedback", "Controls only; never entrances"],
  ["T02", "--motion-duration-fast", "160ms", "FAQ, links, close states", "Small state changes"],
  ["T03", "--motion-duration-feedback", "260ms", "Hover and focus feedback", "Buttons, links, navigation, border and colour states"],
  ["T04", "--motion-duration-product", "760ms", "Album and tactile cover opening", "M04 and M05 only; do not use for routine controls"],
  ["T05", "--motion-duration-step", "560ms", "Responsive process step and album opacity", "M03 process variant and M04 only"],
  ["T06", "--motion-duration-base", "420ms", "Section and grouped entrances", "Do not use for routine press feedback"],
  ["T07", "--motion-duration-medium", "600ms", "Copy settle, image hover, and initial layflat reveal", "One meaningful reveal or bounded media response"],
  ["T08", "--motion-duration-focal", "850ms", "Hero photograph", "One authored focal moment per page"],
  ["T09", "--motion-stagger", "90ms", "Related-item sequence", "Cap index at 4"],
  ["T10", "--motion-stagger-process", "180ms", "Desktop process sequence", "M03 process variant at 1024px and above only"],
  ["T11", "--motion-distance", "12px", "Entrance offset", "Never increase for spectacle"],
  ["T12", "--motion-ease-out", "cubic-bezier(0.16, 1, 0.3, 1)", "Settling movement", "Entrances and spatial motion"],
  ["T13", "--motion-ease-standard", "cubic-bezier(0.2, 0, 0, 1)", "Opacity and state", "Non-spatial feedback"],
  ["T14", "--motion-accent", "var(--coral) / #EF6060", "Approved emotional accents", "FAQ open indicator, occasion underline, journey highlight only"],
];
const tokens = setupSheet(
  "Motion Tokens",
  "E",
  "Values mirror the CSS custom properties. Editing this sheet does not change production CSS."
);
writeTable(tokens, 5, ["ID", "CSS token", "Value", "Role", "Limit"], tokenRows, "E");
tokens.getRange("A6:A19").format = monoStyle;
tokens.getRange("B6:C19").format.font = {
  color: C.violetDark,
  size: 9,
  name: "JetBrains Mono",
};
tokens.getRange("A:E").format.columnWidth = 24;
tokens.getRange("A:A").format.columnWidth = 8;
tokens.getRange("B:B").format.columnWidth = 32;
tokens.getRange("C:C").format.columnWidth = 36;
tokens.getRange("D:E").format.columnWidth = 38;

const instanceRows = [
  ["index.html", "Hero", "M01", 'data-motion="hero-settle"', "Hero image and copy", "Shipped"],
  ["index.html", "Proof band", "M03", 'data-motion-group="stagger"', "Four measurable promises", "Shipped"],
  ["index.html", "Process introduction", "M02", 'data-motion="section-intro"', "Section heading", "Shipped"],
  ["index.html", "Journey list", "M03", 'data-motion-group="process"', "Individual stacked reveals; 180ms desktop queue", "Shipped"],
  ["index.html", "Size grid", "M03 + M05", 'group="stagger"; motion="product-interaction"', "8x6, 8x8, 10x10 cards", "Shipped"],
  ["index.html", "Quality spread", "M04", 'data-motion="layflat-reveal" + "album-open"', "Initial reveal plus persistent album-open state", "Shipped"],
  ["index.html", "Occasion cards", "M03 + M04 + M06", 'group="stagger"; motion="media-card" + "album-open"', "Family, wedding, travel stories", "Shipped"],
  ["index.html", "Delivery proof", "M03", 'data-motion-group="stagger"', "Dispatch, delivery, support", "Shipped"],
  ["index.html", "FAQ list", "M07", 'data-motion="disclosure"', "Native details and summary", "Shipped"],
  ["index.html", "Final CTA", "M02 + M08", 'data-motion="section-intro"', "WhatsApp and pricing actions", "Shipped"],
  ["photo-books.html", "Size grid", "M05", 'motion="product-interaction"', "Quiet Craft cover opening on all three formats", "Shipped"],
  ["pricing.html", "Size grid", "M05", 'motion="product-interaction"', "Quiet Craft cover opening on all three prices", "Shipped"],
  ["offers.html", "Gift guide cards", "M04 + M06", 'motion="media-card" + "album-open"', "One-time album reveal, stable crop, lift, and link accent", "Shipped"],
  ["Shared", "Album photography", "M04", 'data-motion="album-open" + .is-opened', "Examples, quality spreads, story cards, and gift guides", "Shipped"],
  ["Shared", "Sticky header", "M09", ".site-header + .is-scrolled", "Scroll-aware surface and restrained elevation", "Shipped"],
  ["Shared", "Buttons and links", "M08", ".btn and .inline-link", "Pointer, focus, and active feedback", "Shipped"],
  ["Shared", "Mobile navigation", "M09", ".nav-toggle and .nav-drawer", "Open and close states", "Shipped"],
  ["Shared", "Mobile sticky CTA", "M10", ".mobile-sticky-cta", "Hides while hero CTA is visible or editable focus", "Shipped"],
];
const instances = setupSheet(
  "Current Instances",
  "F",
  "Inventory of shipped uses. Add a row whenever an existing pattern is adopted by a new section or page."
);
writeTable(instances, 5, ["Page", "Component", "Pattern ID", "Selector / markup", "Notes", "Status"], instanceRows, "F");
instances.getRange("C6:C23").format = monoStyle;
instances.getRange("F6:F23").dataValidation = {
  rule: { type: "list", values: ["Planned", "In progress", "Shipped", "Retired"] },
};
instances.getRange("F6:F22").conditionalFormats.add("containsText", {
  text: "Shipped",
  format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } },
});
instances.getRange("A:F").format.columnWidth = 24;
instances.getRange("D:D").format.columnWidth = 38;
instances.getRange("E:E").format.columnWidth = 42;

const qaRows = [
  ["Pattern choice", "Existing Pattern ID selected; no one-off timing", "Desktop + mobile", "Pending", "Type review notes here"],
  ["Progressive enhancement", "Content is visible before motion-ready and when JavaScript fails", "Disable JavaScript", "Pending", "Type review notes here"],
  ["Reduced motion", "Final state appears without transform, filter, clip, or transition", "prefers-reduced-motion", "Pending", "Type review notes here"],
  ["Viewport", "No clipping, overlap, overflow, or layout shift", "1440x900; 768x1024; 390x844", "Pending", "Type review notes here"],
  ["Keyboard", "Focus is visible; interaction and state are complete", "Tab, Enter, Space, Escape", "Pending", "Type review notes here"],
  ["Touch", "Targets are at least 44px; no hover-only requirement", "Touch viewport", "Pending", "Type review notes here"],
  ["Persistent album state", "First hover, focus, or touch intersection opens once and remains open until reload", "Pointer, keyboard, touch", "Pending", "Type review notes here"],
  ["Performance", "Only transform, opacity, filter, or approved clip is animated", "Code review + browser", "Pending", "Type review notes here"],
  ["Accent use", "Coral is limited to approved small interaction details", "Visual review", "Pending", "Type review notes here"],
  ["Content", "Motion does not delay or obscure reading and actions", "Read without waiting", "Pending", "Type review notes here"],
  ["Images", "Image remains useful at all crops and dimensions are stable", "Responsive review", "Pending", "Type review notes here"],
  ["Console", "No browser errors or broken assets", "Console + network", "Pending", "Type review notes here"],
];
const qa = setupSheet(
  "Expansion QA",
  "E",
  "Duplicate these checks for each new component, section, or page. The reply column is intentionally editable."
);
writeTable(qa, 5, ["Area", "Acceptance check", "Test method", "Status", "Reviewer reply"], qaRows, "E");
qa.getRange("D6:D17").dataValidation = {
  rule: { type: "list", values: ["Pending", "Pass", "Needs change", "Not applicable"] },
};
qa.getRange("D6:D17").conditionalFormats.add("containsText", {
  text: "Pass",
  format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } },
});
qa.getRange("D6:D17").conditionalFormats.add("containsText", {
  text: "Needs change",
  format: { fill: C.coralLight, font: { color: "#991B1B", bold: true } },
});
qa.getRange("A:E").format.columnWidth = 28;
qa.getRange("B:B").format.columnWidth = 54;
qa.getRange("C:C").format.columnWidth = 34;
qa.getRange("E:E").format.columnWidth = 42;

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

for (const sheetName of [
  "Start Here",
  "Pattern Library",
  "Motion Tokens",
  "Current Instances",
  "Expansion QA",
]) {
  const preview = await wb.render({
    sheetName,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  const fileName = `${sheetName.toLowerCase().replaceAll(" ", "-")}.png`;
  await fs.writeFile(
    path.join(previewDir, fileName),
    new Uint8Array(await preview.arrayBuffer())
  );
}

const keyInspection = await wb.inspect({
  kind: "table",
  range: "Pattern Library!A1:O15",
  include: "values,formulas",
  tableMaxRows: 15,
  tableMaxCols: 15,
  maxChars: 5000,
});
console.log(keyInspection.ndjson);

const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(outputPath);
console.log(`Saved ${outputPath}`);
