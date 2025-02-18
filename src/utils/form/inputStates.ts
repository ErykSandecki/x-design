// types
import { TUseMetaProps } from 'core';

export const isInvalidState = (
  errors: Array<string>,
  touched: boolean,
): boolean => touched && errors.length > 0;

export const getErrorMessage = (meta: TUseMetaProps<any>): string => {
  const { errors, touched } = meta;

  if (isInvalidState(errors, touched)) {
    return errors[0];
  }

  return '';
};
