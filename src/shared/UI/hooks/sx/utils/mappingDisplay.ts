// types
import { Display } from '../enums/display';
import { TSX } from '../types/types';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingDisplay = (sx: TSX): string =>
  getCssStyles(sx, enumToArray<string>(Display));
