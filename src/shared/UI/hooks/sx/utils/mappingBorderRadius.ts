// types
import { TSXBorders } from '../types/borders';

// utils
import { isString } from 'lodash';

export const mappingBorderRadius = (borders: TSXBorders): string => {
  const { borderRadius } = borders;

  if (borderRadius) {
    return `border-radius: ${isString(borderRadius) ? borderRadius : `${borderRadius}px`};`;
  }

  return '';
};
