// types
import { TT } from 'types/generic';

export const minimumValue =
  (amount: number): ((t: TT, value: number) => string) =>
  (t: TT, value: number): string =>
    value >= amount ? '' : t('formValidators.minimumValue', { amount });
