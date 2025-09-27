// others
import {
  CLEAR_FIELDS,
  DESTROY_FORM,
  INIT_FIELD,
  MOUNT_FORM,
  SUBMIT,
  SUBMIT_ERROR,
  SUBMIT_SUCCESS,
} from './actionsType';

// types
import {
  TClearFieldsAction,
  TClearFieldsActionPayload,
  TDestroyFormAction,
  TInitFieldAction,
  TInitFieldActionPayload,
  TMountFormAction,
  TMountFormActionPayload,
  TSubmitAction,
  TSubmitErrorAction,
  TSubmitErrorActionPayload,
  TSubmitSuccessAction,
  TUpdateFieldAction,
  TUpdateFieldActionPayload,
  TUpdateFieldActions,
  TUpdateFormAction,
  TUpdateFormActionPayload,
  TUpdateFormActions,
} from './types';

export const clearFields = (
  formName: TClearFieldsActionPayload['formName'],
  names: TClearFieldsActionPayload['names'],
): TClearFieldsAction => ({
  payload: { formName, names },
  type: CLEAR_FIELDS,
});

export const destroyForm = (formName: TDestroyFormAction['payload']): TDestroyFormAction => ({
  payload: formName,
  type: DESTROY_FORM,
});

export const initField = (payload: TInitFieldActionPayload): TInitFieldAction => ({
  payload,
  type: INIT_FIELD,
});

export const mountForm = (payload: TMountFormActionPayload): TMountFormAction => ({
  payload,
  type: MOUNT_FORM,
});

export const submit = (formName: TSubmitAction['payload']): TSubmitAction => ({
  payload: formName,
  type: SUBMIT,
});

export const submitError = (payload: {
  error: TSubmitErrorActionPayload['error'];
  formName: TSubmitErrorActionPayload['formName'];
}): TSubmitErrorAction => ({
  payload,
  type: SUBMIT_ERROR,
});

export const submitSuccess = (formName: TSubmitSuccessAction['payload']): TSubmitSuccessAction => ({
  payload: formName,
  type: SUBMIT_SUCCESS,
});

export const updateField = (payload: TUpdateFieldActionPayload, type: TUpdateFieldActions): TUpdateFieldAction => ({
  payload,
  type,
});

export const updateForm = (payload: TUpdateFormActionPayload, type: TUpdateFormActions): TUpdateFormAction => ({
  payload,
  type,
});
