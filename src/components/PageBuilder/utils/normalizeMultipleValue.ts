// others
import { MIXED } from 'constant/constants';

// types
import { Unit } from 'types';

export const normalizeMultipleValue = (isMixed: boolean, value: number | string, valueUnit?: Unit): string =>
  isMixed ? MIXED : `${value.toString()}${valueUnit ?? ''}`;
