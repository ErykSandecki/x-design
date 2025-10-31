// types
import { Unit } from 'types';

export const normalizeInputValue = (isMixed: boolean, value: number | string, valueUnit?: Unit): string =>
  isMixed ? 'Mixed' : `${value.toString()}${valueUnit ?? ''}`;
