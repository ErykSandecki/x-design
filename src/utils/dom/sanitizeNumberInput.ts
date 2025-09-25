export const sanitizeNumberInput = (value: string): string =>
  value.replace(/[^0-9]/g, '');
