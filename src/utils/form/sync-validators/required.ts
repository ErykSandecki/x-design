import { isArray, isNumber } from 'lodash';

// types
import { TFieldValue } from 'core/ReduxHookForm/types';
import { TT } from 'types/generic';

export const required = (t: TT, value: TFieldValue): string => {
  const error = t('formValidators.required');

  if (isArray(value)) {
    return value.length ? '' : error;
  }

  if (isNumber(value)) {
    return '';
  }

  return value ? '' : error;
};
