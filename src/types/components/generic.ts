// types
import { Unit } from './enums';

export type TValue = {
  value: number;
};

export type TValueMode = {
  mode: 'auto' | 'fixed' | 'max' | 'min' | 'unit' | 'variable';
};

export type TValueScore = {
  max?: TValue & TValueMode & TValueUnit;
  min?: TValue & TValueMode & TValueUnit;
};
export type TValueUnit = {
  unit?: Unit;
};

export type TValueExtended = TValue & TValueMode & TValueScore & TValueUnit;
