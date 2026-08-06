---
name: x-design-scss-import-order
description: Ordering convention for @use/@forward statements at the top of a .scss file in x-design. Load before writing or reviewing the import block of any .scss file — covers the sass:-builtins/@forward/@use/other grouping and the path-level+alphabetical sort within each group.
---

# x-design SCSS Import Order

x-design migrated off `@import` to Sass's module system (`@use`/`@forward`). Every former
`@import 'path';` becomes a pair — `@forward 'path';` plus `@use 'path' as *;` — so that files
which are only reached transitively (via another file's `@forward`) still get the members they
reference, matching `@import`'s old flat-scope behavior (see [[x-design-architecture]] for why).
This skill governs how those statements are **ordered**, not which ones to write.

## The four groups, top to bottom

1. **`sass:` built-ins** — `@use 'sass:map';`, `@use 'sass:math';`, etc.
2. blank line
3. **`@forward` block** — every `@forward '<local path>';`, sorted (see below). No blank line
   before the next group.
4. **`@use` block (local paths)** — every `@use '<local path>' as *;` whose path has a matching
   `@forward` line above, sorted the same way.
5. blank line
6. **Everything else** — bare-specifier `@use` statements with no relative path and no matching
   `@forward` (currently just `@use 'xd-variables' as *;`, the generated global-variables
   partial — see [[x-design-architecture]]). Sorted alphabetically if there's ever more than one.

Groups 3 and 4 are two separate blocks (all forwards, then all uses) — not interleaved
forward/use pairs.

## Sorting within the `@forward` block and the local `@use` block

Sort key: **(level, then alphabetically by the full path string)**.

`level` = the number of leading `../` segments in the path. `./foo` is level 0, `../foo` is level
1, `../../../../foo` is level 4. Lower level (closer file) sorts first. Within the same level,
sort alphabetically by the literal path string (including the `./`/`../` prefix).

## Worked example

From `button.scss` (imports `./button-sizes`, `./button-variants`, level 0, and
`../../../../styles/mixins/button/button`, level 4):

```scss
@use 'sass:map';

@forward './button-sizes';
@forward './button-variants';
@forward '../../../../styles/mixins/button/button';

@use './button-sizes' as *;
@use './button-variants' as *;
@use '../../../../styles/mixins/button/button' as *;

@use 'xd-variables' as *;

.Button {
  ...
}
```

`./button-sizes` and `./button-variants` are both level 0, so they're ordered alphabetically
relative to each other; both sort before the level-4 `mixins/button/button` path.

## Applying this after editing imports

Whenever you add, remove, or change a `@forward`/`@use` line in a `.scss` file, re-sort the whole
block per this rule rather than just appending — don't leave a new import tacked onto the end.
