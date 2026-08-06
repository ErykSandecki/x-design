---
name: x-design-element-model
description: How design elements are modeled and stored in x-design — TElement shape, the flat id-keyed store (not a nested tree), TPage, undo/redo history, and what the saga does. Load when reading/editing src/store/pageBuilder/types.ts, reducer.ts, saga.ts, watch.ts, constants.ts, or any src/store/pageBuilder/utils/handle*.ts file, or when touching TValue/TValueExtended/TValueScore ("score") shapes.
---

# x-design Element Model & State

## TElement — the core shape

Defined in `src/types/components/types.ts:43`. Default/zero-value lives in
`src/store/pageBuilder/constants.ts:39` (`BASE_ELEMENTS`) — read that file to see every field's
real shape at a glance.

Key fields:

- `id`, `parentId` (`'-1'` = no parent / page root), `type: ElementType` (`base | frame | grid | none | rect`)
- `children: Array<TChildren>` — **only `{id, type}` pointers**, not nested elements (see "flat store" below)
- `coordinates: T2DCoordinates` — position relative to immediate parent
- `height` / `width`: `TValueExtended`
- `angle`, `flip: {x, y}`, `aspectRatio: boolean`
- `layout: TLayout` — auto-layout config (`src/types/components/layout/types.ts:15`)
- `background: Array<TBackground>` — multiple fills/gradients, each with `visible`
- `alignment: TAlignment` — **not** the same thing as `layout.alignment`, see [[x-design-interactions-layout]]
- `position: CSSProperties['position']` — `'absolute'` (free-form) vs `'relative'` (in an auto-layout flow)

### TValueExtended — reused everywhere ("score" gotcha)

`src/types/components/generic.ts:20`. One shape backs `height`, `width`, `opacity`, and every
inset (`padding.t`, `margin.l`, `borderRadius.b`, `layout.gap.row`, ...):

```
{ value: number, mode: 'auto'|'fixed'|'max'|'min'|'unit'|'variable', max?: {...}, min?: {...}, unit?: '%' }
```

`mode` on the value itself = "how is this number expressed" (`fixed`=px, `unit`=%, `auto`=hug-to-content).
`TValueScore = {max?, min?}` — **"score" just means min/max constraint, not a ranking.**
`SET_ELEMENTS_SCORE_TO_CURRENT_SIZE` is literally Figma's "set min/max to current size": it reads
live `getComputedStyle` and writes it into `height.min`/`height.max` etc.
`mode` inside `min`/`max` is a separate axis from the parent value's `mode` — don't assume they match.

## The store is a flat map, NOT a nested tree

`TPage.elements: TElements = TObject<TElement>` (`src/store/pageBuilder/types.ts:62,98`) is a flat
dictionary keyed by id. The "tree" is really a doubly-linked flat map: every element has
`parentId` pointing up and `children[]` pointing down, and **every handler that adds/removes/
reparents an element must keep both in sync manually** — see `store/pageBuilder/utils/changeParent/*`
for the bulk of that bookkeeping (`getMappedElementsToMove`, `getMappedParentsChildren`,
`getMappedNestedChildren`). There is no recursive nested object anywhere in state.

`'-1'` is a sentinel used both as the top-level `parentId` and as the "nothing" value for
`TEvents.hoverOnElement`/`possibleParent`. `BASE_ELEMENTS` with `id: '-1'` is also a real entry
inside `elements` representing the page/canvas itself.

`TPage.prevState: TPage` (self-referential) is a **separate** one-shot "snapshot before this drag
gesture started" (`UPDATE_PREV_STATE`/`CLEAR_PREV_STATE`, `reducer.ts:315,189`) — do not confuse
it with `reducerHistory` below.

## Undo/redo

`TPage.reducerHistory: Array<TReducerHistory>` (`types.ts:85`, snapshot of
`areaCoordinates`/`elements`/`selectedElements`) — **index 0 is newest**.
`reducerHistoryIndex` = how many steps back from HEAD you've undone (0 = "now").

- `handleReducerHistorySave` (`utils/reducerHistory/handleReducerHistorySave.ts:13`): deep-clones
  current state, skips the save if identical to the top entry (`isRepeatedStateInHistory`), and if
  you'd undone some steps and then edited again, slices off the now-invalid redo branch first.
  Caps at `MAX_LENGTH_HISTORY = 50`.
- Undo **increments** `reducerHistoryIndex`, redo **decrements** it — counter-intuitive; think
  "how many steps back from HEAD," not "array position."

## The reducer does the work; the saga only decides _when_ to snapshot

`reducer.ts` is a big switch (line ~351) delegating to one `handle*.ts` pure function per action
under `store/pageBuilder/utils/` — that's where real mutation logic lives, not inline in the reducer.

`watch.ts:10` wires exactly three `takeEvery`s (`saga.ts`):

1. `CHANGE_PARENT` → 100ms `canMoveElements` freeze, a debounce guard after a reparent-drop.
2. `REDUCER_HISTORY_SAVE_ACTIONS` (`constants.ts:115` — discrete actions like `ADD_ELEMENT`,
   `SELECT_ELEMENT`, `CHANGE_PARENT`) → snapshot history **immediately**.
3. `REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS` (`constants.ts:131` — continuous drag actions like
   `RESIZE_ELEMENT`, `SET_ELEMENTS_COORDINATES`, `ROTATE_ELEMENTS`, `CHANGE_BACKGROUND`) →
   **debounced 500ms** snapshot (fork gets cancelled/restarted on repeat), so a 2-second resize
   drag produces one undo step, not hundreds.

**When adding a new action that mutates elements: add it to one of those two lists in
`constants.ts`, don't call history-save yourself.** There is no data-fetching/API saga work in
this slice at all — sagas here exist purely for history timing + that one debounce guard.
