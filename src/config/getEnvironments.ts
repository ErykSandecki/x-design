export const getEnvVars = (): NodeJS.ProcessEnv => process.env || {};

export const getEnvVar = (prop: string): string => getEnvVars()[prop] || '';
