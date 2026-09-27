# Snapajoy Hover Polish Design

Status: Approved
Direction: A, Quiet Craft
Approved: 30 July 2026

## Intent

Make Snapajoy feel tactile, calm, and carefully made. Product interaction should recall opening a printed photo book without turning the interface into a demonstration. Routine controls remain faster than authored product motion.

## Interaction Hierarchy

- Photo-book cover opening: 760ms, 22-degree opening, ease-out.
- Product and media-card lift: 320ms, maximum 3px.
- Button and link feedback: 240-260ms.
- Active press: 120ms with a restrained 0.98 scale.
- Entrance motion remains governed by M01-M04 and is unchanged.

## Product Cards

Replace the flat book rectangle with stable cover, page, and spread layers. On fine-pointer hover, the full book lifts 3px and the front cover opens 22 degrees from the spine. The card border and shadow strengthen quietly. The same final visual state may appear with `:focus-within` when a product card contains an interactive element.

The geometry remains static on touch devices and when reduced motion is requested.

## Media Cards

Keep the image crop stable inside an overflow-hidden media frame. On hover or focus-within, lift the card 2px, scale the image to 1.025, and grow the coral link underline. Motion must not alter text layout or obscure the crop.

## Buttons and Links

Primary actions use a 2px lift and violet shadow. Secondary actions gain a violet-light surface and violet border. Active press uses 0.98 scale. Focus-visible retains the documented violet outline and must never rely on hover styling.

## Constraints

- Preserve current copy, SEO, and image assets.
- Reuse shared tokens and M05, M06, and M08 contracts.
- No looping motion, cursor-following effects, or touch-only hover simulation.
- No production changes outside `D:\work\snapajoy\website`.
- The micro structure project is out of scope and must remain untouched.

## Verification

Check 1440 x 900, 768 x 1024, and 390 x 844; keyboard focus; fine-pointer hover; rapid hover entry and exit; reduced motion; JavaScript failure; overflow; layout shift; broken images; and console errors. Update the UX system and motion workbook with the shipped values.
