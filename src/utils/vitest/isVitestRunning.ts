export const isVitestRunning = (): boolean =>
  typeof process !== 'undefined' && process.env?.VITEST !== undefined;
