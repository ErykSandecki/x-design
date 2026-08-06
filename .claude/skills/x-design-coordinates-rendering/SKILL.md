---
name: x-design-coordinates-rendering
description: How a TElement becomes actual pixels in x-design, and how the app computes absolute/rotated positions by reading back live DOM geometry (getBoundingClientRect + computed transform) rather than pure math. Load when touching src/components/PageBuilder/ViewBox/Elements/Element/*, src/shared/ZoomBox, src/utils/dom/getOriginElementBounding.ts, calculateCoordinatesAbsoluteToParent.ts, getOffsetXY.ts, getParentsAngles.ts, computeCounterRotation.ts, or any rotation/resize/position bug.
---

# x-design Coordinates & Rendering

## Core idea: coordinate math reads the live DOM, it doesn't compute pure matrices

Nested rotated parents compose visually for free in CSS (each element just does
`transform: rotate(${angle}deg)` around its own origin, nested inside its parent's div — see
"Rendering" below). Rather than re-deriving the composed rotation in JS from stored
`angle`/`coordinates` up the parent chain, most position code **asks the browser** via
`getBoundingClientRect()` + `getComputedStyle().transform` and decodes the resulting matrix:

`getOriginElementBounding(element, z)` (`src/utils/dom/getOriginElementBounding.ts:2`):

1. Reads the real bounding rect + computed `transform` matrix.
2. Extracts rotation (`atan2`) and scale from the `DOMMatrix`.
3. Un-rotates around `transformOrigin` to recover the **axis-aligned** (unrotated) box — resize
   math needs this, not the rotated bounding box.
4. Divides by current zoom `z` to convert screen px → canvas-space px.

`getOffsetXY(childId, parentId, z)` (`getOffsetXY.ts:7`) diffs `getOriginElementBounding` for a
child and parent, looked up via `document.getElementById(id)` — **every `TElement.id` is
literally the DOM node's `id` attribute** (`Element.tsx:91`), which is what makes this work.
`calculateCoordinatesAbsoluteToParent` (`calculateCoordinatesAbsoluteToParent.ts:8`) wraps that
for re-deriving `coordinates` whenever an element changes parent or layout mode.

**Consequence: this math only works after the DOM has painted.** Several handlers explicitly
depend on render-then-read-back timing (see `// @html delay` comments, e.g.
`useElementSizes.tsx:40`) — that's why layout-mode switches and "score to current size" are
dispatched from mouseup/blur rather than computed synchronously from stored data alone.

## Pure-math rotation composition — cursor angle only, not element placement

`getParentsAngles(angles, elements, parentId)` (`getParentsAngles.ts:5`) recursively walks
`parentId` up to `'-1'` collecting stored `angle` values. `computeCounterRotation(angles)`
(`computeCounterRotation.ts:1`) sums them mod 360 → `{sumAngle, counterAngle}`, exposed via
`counterAngleSelectorCreator` (`selectors.ts:153`). This is used **only** to counter-rotate the
mouse cursor so resize/rotate handle math (which assumes an axis-aligned frame) stays correct
inside rotated ancestors — it is not how element positions themselves are derived.

`getAbsolutePosition` (`ViewBox/utils/getAbsolutePosition.ts:17`) is the screen-space variant used
for selection outlines/corners/drop-anchors: pulls the ref from `itemsRefs`, calls
`getOriginElementBounding`, subtracts the zoom-content container's rect → feeds `Corners.tsx`.

## Type gotchas

- `T3DCoordinates.z` is **zoom scale**, not depth. `T3DCoordinates = T2DCoordinates & {z}` backs
  both the pan/zoom viewport (`areaCoordinates`) and gets misread as "3D."
- `TRectCoordinates` (`x1,y1,x2,y2`, corner form) vs `T2DCoordinates`/`T3DCoordinates` (`x,y[,z]`,
  point form) — check which one a function signature actually wants.

## Rendering pipeline — how a TElement becomes CSS

`Element.tsx` (`src/components/PageBuilder/ViewBox/Elements/Element/Element.tsx:40-141`) composes
everything via `useElementEvents` into one `style` object on a `<Box>` div:

- `getPosition(alignment, angle, x, y)` (`Element/utils/getPosition.ts:80`) — if `alignment.*`
  ("constraints" pinning) is set, uses `left/right: 0/50%/auto`; otherwise raw `left/top: ${x}px`.
  **Rotation is always** `transform: rotate(${angle}deg) translate(...)` with a computed
  `transformOrigin` — no matrices, no wrapper divs; each element rotates around its own origin
  while nested inside its (possibly rotated) parent, and the browser composes it for free. This
  is exactly why the DOM-read-back approach above works.
- `getLayout(layout)` (`Element/utils/getLayout.ts:10`) — `freeForm`→`{}` (children
  `position:absolute`), `vertical`/`horizontal`→`display:flex` + direction/alignment/gap,
  `grid`→`display:grid` + `gridTemplateColumns/Rows: repeat(n,1fr)`.
- `useElementSizes` (`Element/hooks/useElementSizes.tsx:27`) — `mode:'auto'`→CSS `auto`
  (hug-to-content), else `${value}${unit ?? ''}` (fixed px or `%` fill-of-parent). Also reads back
  live computed size for consumers like the properties panel (another DOM-read-back point).
- Every element's DOM `id` = its store `id` (`Element.tsx:91`) — the load-bearing fact for
  `document.getElementById` lookups everywhere above.
- `itemsRefs` (`src/pages/PageBuilderPage/core/RefsProvider.tsx`) is a parallel React-ref registry
  (`TObject<HTMLElement|null>`) for code that already has an `id` and wants to skip a DOM query.

## ZoomBox — pan/zoom is one outer transform, not per-element

`src/shared/ZoomBox/ZoomBox.tsx:47-136` wraps all elements in a single container with
`transform: translate(x,y) scale(z)` (line 129). Elements render in canvas-space pixels and never
need to know about pan/zoom — `TPage.areaCoordinates: {x,y,z}` is the only place it lives.
`handleZoom.ts:16` implements ctrl+wheel zoom-to-cursor (solves for new x/y to keep the point
under the cursor stationary); `handleMoveArea.ts:10` implements space-drag/right-click panning.
