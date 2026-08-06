---
name: x-design-architecture
description: Orientation map for the x-design repo — a Figma-clone design tool rendered with real HTML/CSS (not canvas/WebGL). Load this first whenever working anywhere under src/components/PageBuilder, src/store/pageBuilder, src/pages/PageBuilderPage, or src/shared/ZoomBox, or when the user asks "how does this app work" / "how is the canvas built". Points to the other x-design-* skills for deep dives.
---

# x-design Architecture Orientation

x-design is a **Figma-style design tool** (frames, auto-layout, fills, resize/rotate handles,
undo/redo) where the canvas is **real DOM/CSS**, not `<canvas>`/WebGL. Every design element is
an actual `<div>` with `id={element.id}`, positioned with `left/top` or flexbox/grid, rotated
with `transform: rotate()`. This single fact explains most of the codebase's unusual patterns —
see [[x-design-coordinates-rendering]] for why.

## The stack

React 19 + Redux + redux-saga (state), Sass (styling, `config/sass/*`), Storybook (shared UI kit
only, not canvas), Jest + Testing Library (unit), Cypress (e2e, currently thin).

## Where things live

```
src/components/PageBuilder/
  ViewBox/           the actual canvas: Elements (per-element render), Corners (selection
                      outline), MultipleElementsArea, OverlayContainer, SelectableArea
  Toolbar/            mouse-mode switcher (move/comment/insert/default)
  PanelProperties/    right-hand inspector: MainPanel (nothing selected) / ComponentPanel
                      (per-element property editors, one Column* folder per property group)
src/store/pageBuilder/
  types.ts            TPage, TElements, TEvents, all action payload types
  reducer.ts           dispatch table → one handle*.ts util per action
  saga.ts / watch.ts   tiny — only undo-history snapshotting + one debounce guard
  utils/                nearly all real mutation logic lives here, one file per concern
src/types/components/  TElement, TLayout, TBackground, TValue* generic shapes
src/shared/ZoomBox/    pan/zoom viewport wrapper (single outer CSS transform)
src/pages/PageBuilderPage/core/RefsProvider.tsx   id → live HTMLElement ref registry
```

## The "two Figmas" gotcha

"Figma" means two unrelated things in this repo — don't conflate them:

1. **The product being cloned** — canvas, panels, tools. This is everything under
   `src/components/PageBuilder` and `src/store/pageBuilder`. See the other x-design-\* skills.
2. **A disconnected manual asset-scraping workflow** — `figma/figma.min.js` (a locally-saved
   copy of Figma's own web-app JS bundle) + `scripts/extract-svgs.js`
   (`npm run generate:figma-svg`) regexes inline `<svg>` strings out of that bundle into
   `figma-icons.html`, purely as a **reference sheet for a human to hand-copy icon designs**
   into `src/assets/svg/*.svg`. Similarly `config/sass/variables/colors.js` is a **static**,
   manually-exported W3C Design Tokens file (presumably pasted from a real Figma file once);
   `npm run generate:theme-colors` just transforms it into `src/constant/themeColors.ts`.
   **Nothing in this repo calls the live Figma API.** If asked to "sync with Figma," this is
   the (manual, offline) mechanism — there is no automated sync to build.

## Deep-dive skills

- [[x-design-element-model]] — TElement shape, the flat id→element store, undo/redo, sagas
- [[x-design-coordinates-rendering]] — how a TElement becomes pixels; DOM-read-back coordinate math
- [[x-design-interactions-layout]] — mouse modes, resize/rotate/reparent, auto-layout (flex/grid) engine
- [[x-design-dev-workflow]] — cheat-sheet workflows (add a property/tool) + testing conventions
