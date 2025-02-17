// types
import { Position } from '../enums/positions';
import { TSXPositions } from '../types/positions';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingPositions = (display: TSXPositions): string => {
  const anyPosition = display[Position.position];
  const zIndex = display[Position.zIndex];
  const position = !anyPosition && zIndex ? 'relative' : anyPosition;

  return getCssStyles({ ...display, position }, enumToArray<string>(Position));
};
