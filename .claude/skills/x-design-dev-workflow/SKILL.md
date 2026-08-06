---
name: x-design-dev-workflow
description: Practical cheat sheets for common x-design changes — adding a new editable element property end-to-end, adding a toolbar tool, and this repo's testing conventions (co-located specs, snapshots resolver, 100% coverage gate, saga testing with redux-saga-tester). Load before implementing a new PanelProperties field, a new MouseMode, or writing/running tests under src/store/pageBuilder or src/components/PageBuilder.
---

# x-design Dev Workflow Cheat Sheets

Background on the pieces referenced below: [[x-design-element-model]],
[[x-design-coordinates-rendering]], [[x-design-interactions-layout]].

## Add a new editable `TElement` property, end-to-end

1. Extend `TElement` in `src/types/components/types.ts`.
2. Seed a default value in `BASE_ELEMENTS` (`src/store/pageBuilder/constants.ts:39`).
3. Pick the dispatch path:
   - Simple value (boolean/enum, no unit-switching) → route through `CHANGE_PROPERTIES`
     (`Partial<TElement>` merge-patch, `store/pageBuilder/utils/handleChangeProperties.ts`).
   - Sized/numeric value that needs px/%/auto switching → give it the `TValueExtended` shape
     and wire `APPLY_ELEMENTS_TYPE` / `applyMode` (`store/pageBuilder/utils/applyElementsType/applyMode.ts:7`)
     for mode toggling.
4. Add a `Column*` folder under `src/components/PageBuilder/PanelProperties/ComponentPanel/Design/`
   (pattern: `component.tsx` + `hooks/use*Events.tsx` talking to Redux + local
   `constants`/`enums`). Dispatch on blur / drag-commit, not on every keystroke — see existing
   `ColumnResizing/hooks/useChangeEvent.tsx:18`.
5. Map the new field to CSS in an `Element/utils/get*.ts` helper and wire it into `Element.tsx`'s
   style object.
6. Decide whether the action is discrete or continuous and add its type to
   `REDUCER_HISTORY_SAVE_ACTIONS` or `REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS` in
   `store/pageBuilder/constants.ts` — **do not call history-save directly**, the saga does it.

## Add a new toolbar tool / `MouseMode`

1. Add the value to `MouseMode` (`src/types/enums/mouseMode.ts`).
2. Add an icon mapping in `Toolbar/MouseModes/constants.ts` (`MOUSE_MODE_ICON`).
3. Wire behavior into the mouse handlers that branch on `mouseMode`
   (`ViewBox/hooks/useMouseDownEvent.tsx`, `Element/hooks/useMouseDownEvent.tsx`).
4. Remember: `mouseMode` is local component state; gesture status while using the tool
   (`isResizing`, `isMultipleMoving`, ...) goes through Redux `TEvents` via `UPDATE_EVENTS_STATUS`.

## Testing conventions

- **Co-locate**: `Foo.ts(x)` → `Foo.spec.ts(x)` in the _same folder_ (deeper `store/pageBuilder/utils/*`
  additionally nest a sibling `test/` folder mirroring util filenames 1:1).
- **Snapshots** land in a sibling `snapshots/` folder automatically via a custom Jest resolver
  (`scripts/snapshotResolver.js`) — not co-located `__snapshots__`.
- **100% branch/function/line/statement coverage is enforced** (`jest.config.js`, `npm run
test:check`) for anything not in the `coveragePathIgnorePatterns` allowlist (styles, constants,
  mocks, stories, types, store-wiring). Any new non-trivial file needs a full-coverage spec or CI
  fails — this is a hard gate, not a suggestion.
- **Saga tests use `redux-saga-tester`** (a full mini-store + saga runner — dispatch an action,
  assert on resulting state), e.g. `store/pageBuilder/test/saga/reducerHistorySaveSaga.spec.ts`.
  This repo does **not** use `redux-saga-test-plan`.
- **Mocks**: `src/test/mocks/` has hand-built state fixtures (`pageBuilderStateMock`, etc.);
  `src/test/mockAll.ts` auto-mocks an entire util-barrel module at once via
  `jest.requireActual` + `lodash.mapValues`.
- **Cypress** (`cypress/e2e/*.spec.ts`) is thin (scaffolding only so far); its support layer
  (`cypress/support/UI/*`, `UITools/*`) mirrors `shared/UI`/`shared/UITools` 1:1, and
  `cypress/support/store/getState.ts` reads live Redux off `window.store` for state assertions.
- **Storybook** (`src/stories/*`) documents the generic shared UI kit only — there are no
  PageBuilder/canvas stories.

## Commit workflow

`npm run test` is watch mode; use `npm run test:check` for a single CI-equivalent run with
coverage. Pre-commit runs branch-name lint, stylelint, eslint (ts/tsx), prettier, commit-msg
lint; pre-push runs the unit test suite. Skip only with `git commit -m "<msg>" --no-verify` when
truly necessary.
