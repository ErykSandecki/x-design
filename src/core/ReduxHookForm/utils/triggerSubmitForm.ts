import { Dispatch } from '@reduxjs/toolkit';

// store
import { submit, updateFormValidator } from 'store/reduxHookForm/slice';

// types
import { TFields } from 'store/reduxHookForm/types';

// utils
import { markInputsAsTouched } from './markInputsAsTouched';

export const triggerSubmitForm = (dispatch: Dispatch, fields: TFields, formName: string, isValid: boolean): void => {
  markInputsAsTouched(dispatch, formName, fields);
  dispatch(submit(formName));
  dispatch(updateFormValidator({ form: { isValid }, formName }));
};
