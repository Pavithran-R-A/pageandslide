# SoftBazzar Design Exploration

## Three Possible Directions

### 1. The College Press

**Very Brief Intro:** A scholarly editorial storefront inspired by a restrained university journal: hairline rules, generous margins, and dignified typography make ordering feel clear and considered.

**Probability:** 0.07

### 2. Stationer’s Counter

**Very Brief Intro:** Warm paper, precise ledger-like structures, and tactile ordering cues borrow from a premium independent stationer rather than an online marketplace.

**Probability:** 0.04

### 3. Quiet Atelier

**Very Brief Intro:** A spare, fashion-house-inspired service catalogue uses deep charcoal typography and controlled wine accents to make practical student support feel polished and personal.

**Probability:** 0.09

## Chosen Direction: The College Press

### Design Movement

Contemporary editorial design informed by independent literary journals and carefully typeset university publications. The interface should read as an ordered service catalogue rather than a storefront made from cards.

### Core Principles

1. **Measured hierarchy:** Information earns attention through type scale, spacing, and rules rather than decorative UI.
2. **Structured calm:** A narrow editorial measure for copy meets broad, table-like pricing columns for scanning.
3. **Material restraint:** Ivory and paper tones create a tactile reading surface, with minimal shadow and no gradients.
4. **Purposeful interaction:** Controls remain visibly functional but quiet; burgundy signals only important moments and actions.

### Color Philosophy

Warm ivory makes the experience feel closer to paper than a screen, while charcoal provides dependable reading contrast. Champagne gold is a fine-rule and keyline material, not a visual effect. Burgundy is held in reserve for the primary action and confirmed order states so it retains meaning.

### Layout Paradigm

The page is composed as a vertical publishing folio. A full-width header and opening masthead establish the service; subsequent catalogue entries become two-column editorial spreads, with an indexed service description on the left and a labelled price list on the right. The composition collapses to an orderly single reading column on small screens.

### Signature Elements

1. Hairline horizontal rules used as section architecture and list separators.
2. Small uppercase editorial eyebrows and category indices, such as `01 / PRESENTATIONS`.
3. A typographic wordmark with an interlocked `SB` monogram rendered as a simple geometric mark, used sparingly in the header and favicon.

### Interaction Philosophy

Every interaction is direct and immediately explained: a tier becomes `Added` briefly, the cart count changes without interrupting reading, and drawers preserve focus and context. Hover treatments use underlines, line-color shifts, and very small background changes rather than buoyant cards or visual spectacle.

### Animation

Use a 180ms custom ease-out for button, link, and cart-count feedback. Drawer and order sheet transitions may use opacity plus a short horizontal or vertical translation at 220ms. Disable these nonessential movements under `prefers-reduced-motion`. No parallax, looping motion, or entrance choreography is permitted.

### Typography System

Cormorant Garamond is reserved for display headings and large numbered process markers, with a precise, slightly compact editorial rhythm. Inter is the functional sans-serif for all body copy, prices, controls, forms, labels, and navigation. Browsers fall back to Georgia for the serif and the system UI stack for the sans.

### Brand Essence

**SoftBazzar is a carefully priced, directly ordered presentation and document-support service for students who want their work to be clear, polished, and editable.**

Personality: **considered, approachable, exacting.**

### Brand Voice

Headlines are concise and assured; CTAs are factual actions; microcopy clarifies practical expectations without sales pressure.

Examples:

> “Present your work with confidence.”

> “Review the price, then send the brief.”

### Wordmark & Logo

The wordmark is a tightly tracked uppercase `SOFTBAZZAR` treatment with a short champagne-gold rule separating `SOFT` and `BAZZAR`. The companion mark is an `SB` monogram inside an outlined square, drawn in CSS/SVG-like geometry rather than from a stock icon or AI-generated asset.

### Signature Brand Color

**SoftBazzar Burgundy — `#6B2B38`**

## Style Decisions

- No AI-generated, stock, or photographic imagery will be used; visual presence comes from typography and precise line work.
- The supplied palette and required typography are treated as a strict brand system.
- Cards are avoided in the catalogue; surfaces appear only where interaction needs a clear boundary, including the cart and order sheet.
