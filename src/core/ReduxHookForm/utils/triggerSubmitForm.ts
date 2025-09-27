import { Dispatch } from 'redux';

// others
import { UPDATE_FORM_VALIDATOR } from 'store/reduxHookForm/actionsType';

// store
import { submit, updateForm } from 'store/reduxHookForm/actions';

// types
import { TFields } from 'store/reduxHookForm/types';

// utils
import { markInputsAsTouched } from './markInputsAsTouched';

export const triggerSubmitForm = (dispatch: Dispatch, fields: TFields, formName: string, isValid: boolean): void => {
  markInputsAsTouched(dispatch, formName, fields);
  dispatch(submit(formName));
  dispatch(updateForm({ form: { isValid }, formName }, UPDATE_FORM_VALIDATOR));
};
