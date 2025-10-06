// types
import { TElement } from 'types';

export const getWidthByAspectRatio = (
  aspectRatio: TElement['aspectRatio'],
  baseHeight: number,
  baseWidth: number,
  height: number,
): number => (aspectRatio ? height * (baseWidth / baseHeight) : baseWidth);
