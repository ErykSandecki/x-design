// types
import { Sizing } from '../enums/sizing';
import { TSX } from '../types/types';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingSizing = (sx: TSX): string => getCssStyles(sx, enumToArray<string>(Sizing));
