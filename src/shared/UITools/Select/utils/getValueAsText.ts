export const getValueAsText = (isMixed: boolean, t: TT, translationNameSpace: string, value: string): string => {
  if (translationNameSpace && value && !isMixed) {
    return t(`${translationNameSpace}.${value}`);
  }

  return value;
};
