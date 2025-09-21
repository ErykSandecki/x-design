export const getValue = (isMultiple: boolean, value: string): string =>
  isMultiple ? 'mixed' : value;
