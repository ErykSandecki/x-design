// types
import { TElement } from 'types';

export const getHeightByAspectRatio = (
  aspectRatio: TElement['aspectRatio'],
  baseHeight: number,
  baseWidth: number,
  width: number,
): number => (aspectRatio ? width / (baseWidth / baseHeight) : baseHeight);
