// types
import { TFieldValue } from 'core';
import { TT } from 'types';

export const name = (t: TT, value: TFieldValue): string => {
  const error = t('formValidators.name');
  const isValid = /^[a-zA-Z0-9_ ]{1,}$/.test(value as string);

  return isValid ? '' : error;
};
