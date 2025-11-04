// types
import { Unit } from 'types';

export const transformValueWithUnit = (isScrubbableInput: boolean, unit: Unit, value: string): string =>
  isScrubbableInput ? `${value}${unit ?? ''}` : value;
