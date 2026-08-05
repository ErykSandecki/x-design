---
name: x-design-interactions-layout
description: Mouse modes, selection, resize/rotate handles, drag-to-reparent, and the flex/grid auto-layout engine in x-design. Load when touching src/components/PageBuilder/Toolbar, ViewBox/Elements/Element/EventsArea or DropAnchors, src/store/pageBuilder/utils/resizeElement|changeLayout|changeLayoutGrid|changeAligment|changeParent|flipElements, TEvents, MouseMode, AnchorResize/AnchorRotate, or anything about drag/resize/rotate/reparent/auto-layout bugs.
---

# x-design Interactions & Layout Engine

## Mouse modes vs. gesture state — two different homes

`MouseMode` (`src/types/enums/mouseMode.ts`: `default | toolBeltA | move | comment`) is **local
component state** (`Toolbar.tsx` / `MouseModes.tsx`), not Redux — it's just "which tool is
selected." What's actually happening with the mouse right now (dragging, resizing, rotating) is a
**Redux** slice: `TEvents` (`src/store/pageBuilder/types.ts:66`), updated almost exclusively
through the single action `UPDATE_EVENTS_STATUS` (`Partial<TEvents>` merge, `reducer.ts:304`).

Key `TEvents` fields: `canMoveElements` (debounce guard, see [[x-design-element-model]]),
`isResizing`/`isRotating`/`isMultipleMoving`, `selectedAnchorResize: AnchorResize`
(`store/pageBuilder/enums.ts:1` — N/S/E/W + 4 diagonals + `none`), `selectedAnchorRotate:
AnchorRotate` (only the 4 diagonal corners + `none` — matches Figma, no edge-rotate), and the
"where would this drop land" cluster: `possibleAnchorElementId`, `possibleAnchorPosition:
DropAnchorsPosition`, `possibleParent`, `possibleIndexPosition`, `possibleElement`,
`isGridDropArea`, plus `draggableElements` for multi-drag.

## Resize

`EventsArea/TransformArea/hooks/useMouseMoveEvent.tsx:17` → dispatches `RESIZE_ELEMENT`
(`{baseCoordinates, flip, height, width, id, mouseCoordinates}`). Reducer side:
`store/pageBuilder/utils/resizeElement/handleResizeElement.ts:12` — `getCorrectAnchor` normalizes
anchor vs. existing `flip`; `getFlipAxisToChange`/`getFlippedElements` handle dragging a handle
**past the opposite edge** (auto-flips the element instead of going negative-size, matching
Figma); `getSizesCoordinates` computes final size/coordinates from mouse delta + anchor +
`aspectRatio` lock (`store/pageBuilder/utils/setElementSizes/getElementSizes.ts:27` for the
proportional-derive case).

## Rotate

Same hook, `handleRotateElement` branch → dispatches `ROTATE_ELEMENTS` (just the new `angle`).
Math in `TransformArea/utils/getDeltaAngle.ts`/`getElementAngle.ts`, using
`counterAngleSelectorCreator` (see [[x-design-coordinates-rendering]]) so the rotate handle
tracks the cursor correctly even nested inside a rotated ancestor.

## Drag-to-reparent

`DropAnchors/Anchors/utils/getDropAnchorsPosition.ts:7` decides which drop-edges even show: grid
parents show both axes; auto-layout parents show only the anchors perpendicular to flow direction
(vertical stack → top/bottom only). On drop, `CHANGE_PARENT` (**no payload** — reads
`state.events`) → `handleChangeParent` (`store/pageBuilder/utils/changeParent/handleChangeParent.ts:74`):
either splices the dragged element(s) into the new parent's `children[]` at
`possibleIndexPosition` and updates `parentId` (+ removes from old parent's `children[]` —
remember the store is a flat map, see [[x-design-element-model]]), or resets position if the drop
is invalid (`detectIdAnomalies` blocks dropping an element onto its own descendant).

## Auto-layout engine (Figma auto-layout parity)

`handleChangeLayout` (`store/pageBuilder/utils/changeLayout/handleChangeLayout.ts:13`) switches
`freeForm ⇄ horizontal/vertical ⇄ grid`: entering `freeForm` sets children to
`position:absolute` and recalculates `coordinates` from live DOM position (so nothing jumps);
entering flex sets `position:relative`, zeroes `coordinates`, and snapshots `height`/`width` from
`getComputedStyle` so boxes don't collapse; entering `grid` forces `mode:'auto'` on child sizes.
CSS mapping lives in `Element/utils/getLayout.ts` (see [[x-design-coordinates-rendering]]).

`boxSizing: 'included'|'excluded'` (`TLayout.boxSizing`) = this repo's naming for CSS
`border-box`/`content-box` — "included" means padding is included in the stated size.

**"Fill" sizing is approximated, not real `flex-grow`.** There's no `fill`/`hug` field — `mode:
'auto'` = hug-to-content, `mode:'unit'` + `unit:'%'` (typically `value:100`) = fill-parent via
percentage of the flex/grid track. This is a real semantic gap vs. Figma's actual `flex-grow:1`
— flag it if asked to add "true" fill-sizing.

### `alignment` means two different things — do not conflate

1. `TElement.alignment: TAlignment` — Figma **constraints** (pin left/center/right,
   top/center/bottom when parent resizes). Only matters for `position:absolute` children. Action:
   `CHANGE_ALIGNMENT` → `changeAligment/handleChangeAlignment.ts:26`.
2. `TElement.layout.alignment: AlignmentLayout` — the auto-layout **content alignment** (9-value
   grid), only matters on a parent with `layout.type !== freeForm`. Action:
   `CHANGE_LAYOUT_ALIGNMENT`, mapped to `align-items`/`justify-content` by `getAlignmentLayout.ts`.

Same English word, unrelated fields/actions/CSS — check which one a task actually means.

## Grid layout

`changeLayoutGrid/getCorrectGrid.ts` / `getCorrectChildren.ts` / `extendGrid.ts` redistribute
children and insert/remove synthetic `ElementType.grid` "empty cell" placeholders
(`GridDropArea.tsx`) when row/column count changes.

## Flip

`flipElements/handleFlipElements.ts:7` + `getFlippedElements.ts` — the same primitive used both
by the explicit toolbar "Flip horizontal/vertical" (`FLIP_ELEMENTS`) and internally during
past-the-edge resize.
