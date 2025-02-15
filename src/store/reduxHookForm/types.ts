// store
import {
  BLUR,
  CHANGE,
  CLEAR_FIELDS,
  DESTROY_FORM,
  FOCUS,
  INIT_FIELD,
  MOUNT_FORM,
  SET_PENDING,
  SET_PENDING_FIELD,
  SET_TOUCHED_FIELD,
  SUBMIT,
  SUBMIT_ERROR,
  SUBMIT_SUCCESS,
  UPDATE_ASYNC_ERRORS,
  UPDATE_FORM_VALIDATOR,
  UPDATE_SYNC_ERRORS,
} from './actionsType';

// types
import { TFieldValue } from 'core/ReduxHookForm/types';
import { TObject } from 'types';

export type TField<V = TFieldValue> = {
  active: boolean;
  afterSubmit?: () => void;
  asyncErrors: Array<string>;
  beforeSubmit?: () => void;
  data: TObject<any>;
  emptyValue: V;
  fieldsToClearOnChange: Array<string>;
  formatOnBlur?: (value: V, name: string) => V;
  formatOnChange?: (value: V, name: string) => V;
  formatOnFocus?: (value: V, name: string) => V;
  initialValue: V;
  isPending: boolean;
  modified?: boolean;
  modifiedSinceLastSubmit?: boolean;
  parse?: (value: V, name: string) => V;
  previousValue: V;
  syncErrors: Array<string>;
  touched: boolean;
  value: V;
  valueSinceLastSubmit?: V;
  visited: boolean;
};

export type TForm = {
  asyncTimeDelay: number;
  error: string;
  fields: TFields;
  isPending: boolean;
  isValid: boolean;
};

export type TFields<T = any> = { [key in keyof T]: TField<T[keyof T]> };

export type TReduxHookFormState = {
  [key: string]: TForm;
};

export type TClearFieldsActionPayload = {
  formName: string;
  names: Array<string>;
};

export type TClearFieldsAction = {
  payload: TClearFieldsActionPayload;
  type: typeof CLEAR_FIELDS;
};

export type TDestroyFormAction = {
  payload: string;
  type: typeof DESTROY_FORM;
};

export type TInitFieldActionPayload = {
  field: Partial<TField>;
  name: string;
  formName: string;
};

export type TInitFieldAction = {
  payload: TInitFieldActionPayload;
  type: typeof INIT_FIELD;
};

export type TMountFormActionPayload = { [key: string]: TForm };

export type TMountFormAction = {
  payload: TMountFormActionPayload;
  type: typeof MOUNT_FORM;
};

export type TSubmitAction = {
  payload: string;
  type: typeof SUBMIT;
};

export type TSubmitErrorActionPayload = {
  error: string;
  formName: string;
};

export type TSubmitErrorAction = {
  payload: TSubmitErrorActionPayload;
  type: typeof SUBMIT_ERROR;
};

export type TSubmitSuccessAction = {
  payload: string;
  type: typeof SUBMIT_SUCCESS;
};

export type TUpdateFieldActions =
  | typeof BLUR
  | typeof CHANGE
  | typeof FOCUS
  | typeof MOUNT_FORM
  | typeof SET_PENDING_FIELD
  | typeof SET_TOUCHED_FIELD
  | typeof UPDATE_ASYNC_ERRORS
  | typeof UPDATE_SYNC_ERRORS;

export type TUpdateFieldActionPayload = {
  field: Partial<TField>;
  name: string;
  formName: string;
};

export type TUpdateFieldAction = {
  payload: TUpdateFieldActionPayload;
  type: TUpdateFieldActions;
};

export type TUpdateFormActions =
  | typeof SET_PENDING
  | typeof UPDATE_FORM_VALIDATOR;

export type TUpdateFormActionPayload = {
  form: Partial<TForm>;
  formName: string;
};

export type TUpdateFormAction = {
  payload: TUpdateFormActionPayload;
  type: TUpdateFormActions;
};
