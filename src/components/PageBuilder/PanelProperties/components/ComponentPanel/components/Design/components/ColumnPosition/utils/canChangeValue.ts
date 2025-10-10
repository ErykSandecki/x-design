export const canChangeValue = (isMixed: boolean, isMultiple: boolean, isScrubbableInput: boolean): boolean => {
  if (isMixed || isMultiple) {
    return !isScrubbableInput;
  }

  return true;
};
