// types
import { TFieldValue } from 'core';
import { TObject } from 'types';

export type TField<V = TFieldValue> = {
  active: boolean;
  afterSubmit?: TFunc;
  asyncErrors: Array<string>;
  beforeSubmit?: TFunc;
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

export type TInitFieldActionPayload = {
  field: Partial<TField>;
  name: string;
  formName: string;
};

export type TMountFormActionPayload = { [key: string]: TForm };

export type TSubmitErrorActionPayload = {
  error: string;
  formName: string;
};

export type TUpdateFieldActionPayload = {
  field: Partial<TField>;
  name: string;
  formName: string;
};

export type TUpdateFormActionPayload = {
  form: Partial<TForm>;
  formName: string;
};
