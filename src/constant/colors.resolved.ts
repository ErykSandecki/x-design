// Static hex snapshot for values baked into user content (e.g. a new element's default fill)
// rather than app UI chrome. Never replace an entry here with `colors.*` (a live `var(--xd-color-*)`
// reference) — a design element's own color must not repaint when someone toggles the app's theme.
// See src/store/pageBuilder/constants.ts, the one consumer of this file.
export const colorsResolved = {
  neutral4: {
    dark: '#1e262f',
    light: '#f1f2f6',
  },
} as const;
