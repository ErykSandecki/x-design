import { every } from 'lodash';

// types
import { TAsyncValidator, TFieldValue, TSyncValidator } from '../types';
import { TFields } from 'store/reduxHookForm/types';
import { TFileData } from 'types/types';

export const defaultFormValidator = (fields: TFields): boolean =>
  every(fields, (field) => !(field.asyncErrors.length || field.syncErrors.length));

export const formValidatorWithFileUploader =
  (files: Array<TFileData>, setTouched: TFunc<[boolean]>) =>
  (fields: TFields): boolean => {
    setTouched(true);

    return files.length !== 0 && every(fields, (field) => !(field.asyncErrors.length || field.syncErrors.length));
  };

export const getErrorsFromAsyncValidators = async (
  validators: Array<TAsyncValidator>,
  value: TFieldValue,
  subscribedFields: TFields | undefined,
  t: TT,
): Promise<Array<string>> => {
  const errors = [];

  for (const validator of validators) {
    errors.push(await validator(t, value, subscribedFields));
  }

  return errors.filter(Boolean);
};

export const getErrorsFromSyncValidators = (
  validators: Array<TSyncValidator>,
  value: TFieldValue,
  subscribedFields: TFields | undefined,
  t: TT,
): Array<string> => validators.map((validator) => validator(t, value, subscribedFields)).filter(Boolean);
