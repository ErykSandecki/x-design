// types
import { Position } from '../enums/positions';
import { TSXPositions } from '../types/positions';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingPositions = (display: TSXPositions): string => {
  const position =
    !display[Position.position] && display[Position.zIndex]
      ? 'relative'
      : display[Position.position];

  return getCssStyles({ ...display, position }, enumToArray<string>(Position));
};
