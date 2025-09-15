// types
import { Shadows } from '../enums/shadows';
import { TSX } from '../types/types';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingShadows = (sx: TSX): string =>
  getCssStyles(sx, enumToArray<string>(Shadows));
