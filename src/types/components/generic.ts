// types
import { Unit } from './enums';

export type TValue = {
  value: number;
};

export type TValueExtended = TValue & {
  mode: 'auto' | 'fixed' | 'unit' | 'variable';
  unit?: Unit;
};
