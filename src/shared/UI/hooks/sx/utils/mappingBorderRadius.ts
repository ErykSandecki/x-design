import { isString } from 'lodash';

// types
import { TSXBorders } from '../types/borders';

export const mappingBorderRadius = (borders: TSXBorders): string => {
  const { borderRadius } = borders;

  if (borderRadius) {
    return `border-radius: ${isString(borderRadius) ? borderRadius : `${borderRadius}px`};`;
  }

  return '';
};
