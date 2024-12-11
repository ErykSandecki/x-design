// types
import { TFields } from 'store/reduxHookForm/types';

export const validateForm = (fields: TFields): boolean => {
  if (fields) {
    for (const [, { asyncErrors, syncErrors }] of Object.entries(fields)) {
      if (asyncErrors.length || syncErrors.length) {
        return false;
      }
    }
  }

  return true;
};
