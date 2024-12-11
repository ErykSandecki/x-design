export const getEnvVars = () => process.env || {};

export const getEnvVar = (prop: string): string => getEnvVars()[prop] || '';
