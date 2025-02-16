// types
import { Shadows } from '../enums/shadows';
import { TSXShadows } from '../types/shadows';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingShadows = (shadows: TSXShadows): string =>
  getCssStyles(shadows, enumToArray<string>(Shadows));
