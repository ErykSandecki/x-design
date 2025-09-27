// types
import { Position } from '../enums/positions';
import { TSX } from '../types/types';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingPositions = (sx: TSX): string => {
  const anyPosition = sx[Position.position];
  const zIndex = sx[Position.zIndex];
  const position = !anyPosition && zIndex ? 'relative' : anyPosition;

  return position ? getCssStyles({ ...sx, position }, enumToArray<string>(Position)) : '';
};
