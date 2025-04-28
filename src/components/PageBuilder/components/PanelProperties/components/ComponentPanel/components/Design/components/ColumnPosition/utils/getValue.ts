export const getValue = (
  disabledAll: boolean,
  hasAlignment: boolean,
  isMultiple: boolean,
  value: string,
): string => {
  if (disabledAll) {
    return 'Locked';
  }

  if (hasAlignment) {
    return isMultiple ? 'Mixed' : 'auto';
  }

  return value;
};
