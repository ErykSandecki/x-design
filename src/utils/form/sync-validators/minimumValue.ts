// types
import { TT } from 'types';

export const minimumValue =
  (amount: number): ((t: TT, value: number) => string) =>
  (t: TT, value: number): string =>
    value >= amount ? '' : t('formValidators.minimumValue', { amount });
