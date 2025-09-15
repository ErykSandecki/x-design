import { isString } from 'lodash';

// types
import { TSX } from '../types/types';
import { TSXBorders } from '../types/borders';

export const mappingBordersRadius = (sx: TSX): string => {
  const { borderRadius } = sx as TSXBorders;

  if (borderRadius) {
    return `border-radius: ${isString(borderRadius) ? borderRadius : `${borderRadius}px`};`;
  }

  return '';
};
