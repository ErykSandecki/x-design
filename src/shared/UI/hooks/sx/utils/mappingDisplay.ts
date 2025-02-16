// types
import { Display } from '../enums/display';
import { TSXDisplay } from '../types/display';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingDisplay = (display: TSXDisplay): string =>
  getCssStyles(display, enumToArray<string>(Display));
