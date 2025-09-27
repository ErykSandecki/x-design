export const isJestRunning = (): boolean => process.env.JEST_WORKER_ID !== undefined;
