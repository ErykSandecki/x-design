// types
import { TFieldValue } from 'core/ReduxHookForm/types';
import { TT } from 'types/generic';

export const email = (t: TT, value: TFieldValue): string => {
  const error = t('formValidators.email');
  const isValid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value as string,
    );

  return isValid ? '' : error;
};
