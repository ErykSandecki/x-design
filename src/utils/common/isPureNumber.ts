export const isPureNumber = (value: number | string): boolean => /^-?\d+(\.\d+)?$/.test(value.toString().trim());
