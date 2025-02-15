// types
import { TFieldValue } from 'core/ReduxHookForm/types';
import { TT } from 'types';

export const password = (t: TT, value: TFieldValue): string => {
  const error = t('formValidators.password');
  const isValid =
    /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[ !"#$%&'()*+,-./:;<=>?@[\]^_{|}~]).{10,}$/.test(
      value as string,
    );

  return isValid ? '' : error;
};
