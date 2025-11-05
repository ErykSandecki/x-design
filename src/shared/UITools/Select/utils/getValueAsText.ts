import { camelCase } from 'lodash';

export const getValueAsText = (isMixed: boolean, t: TT, translationNameSpace: string, value: string): string => {
  if (translationNameSpace && value && !isMixed) {
    return t(`${translationNameSpace}.${camelCase(value)}`);
  }

  return value;
};
