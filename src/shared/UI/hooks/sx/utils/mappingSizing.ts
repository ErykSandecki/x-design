// types
import { Sizing } from '../enums/sizing';
import { TSXSizing } from '../types/sizing';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingSizing = (sizing: TSXSizing): string =>
  getCssStyles(sizing, enumToArray<string>(Sizing));
