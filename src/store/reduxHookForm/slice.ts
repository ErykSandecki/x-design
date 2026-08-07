import { mapValues, omit } from 'lodash';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

// types
import {
  TClearFieldsActionPayload,
  TInitFieldActionPayload,
  TMountFormActionPayload,
  TReduxHookFormState,
  TSubmitErrorActionPayload,
  TUpdateFieldActionPayload,
  TUpdateFormActionPayload,
} from './types';

// utils
import { getUpdatedFieldsState, getFieldsWithModifiedAttributes, notifyFields } from './utils';

const initialState: TReduxHookFormState = {};

const handleClearFields = (
  state: TReduxHookFormState,
  { formName, names }: TClearFieldsActionPayload,
): TReduxHookFormState => {
  const fields = mapValues(state[formName].fields, (field, name) =>
    names.includes(name)
      ? {
          ...field,
          asyncErrors: [],
          previousValue: field.emptyValue,
          syncErrors: [],
          touched: false,
          value: field.emptyValue,
        }
      : field,
  );

  return {
    ...state,
    [formName]: {
      ...state[formName],
      fields,
    },
  };
};

const handleDestroyForm = (state: TReduxHookFormState, formName: string): TReduxHookFormState => ({
  ...omit({ ...state }, [formName]),
});

const handleInitField = (
  state: TReduxHookFormState,
  { formName, field, name }: TInitFieldActionPayload,
): TReduxHookFormState => {
  if (!state[formName]) {
    return state;
  }

  return {
    ...state,
    [formName]: {
      ...state[formName],
      fields: getUpdatedFieldsState(field, formName, name, state),
    },
  };
};

const handleMountForm = (state: TReduxHookFormState, payload: TMountFormActionPayload): TReduxHookFormState => ({
  ...state,
  ...payload,
});

const handleSubmit = (state: TReduxHookFormState, formName: string): TReduxHookFormState => {
  notifyFields(formName, state, 'before');

  return {
    ...state,
    [formName]: {
      ...state[formName],
      error: '',
      fields: getFieldsWithModifiedAttributes(formName, state),
      isPending: true,
    },
  };
};

const handleSubmitError = (
  state: TReduxHookFormState,
  { error, formName }: TSubmitErrorActionPayload,
): TReduxHookFormState => {
  notifyFields(formName, state, 'after');

  return {
    ...state,
    [formName]: {
      ...state[formName],
      error,
      isPending: false,
    },
  };
};

const handleSubmitSuccess = (state: TReduxHookFormState, formName: string): TReduxHookFormState => {
  notifyFields(formName, state, 'after');

  return {
    ...state,
    [formName]: {
      ...state[formName],
      isPending: false,
    },
  };
};

const handleUpdateField = (
  state: TReduxHookFormState,
  { formName, field, name }: TUpdateFieldActionPayload,
): TReduxHookFormState => ({
  ...state,
  [formName]: {
    ...state[formName],
    fields: getUpdatedFieldsState(field, formName, name, state),
  },
});

const handleUpdateForm = (
  state: TReduxHookFormState,
  { form, formName }: TUpdateFormActionPayload,
): TReduxHookFormState => ({
  ...state,
  [formName]: {
    ...state[formName],
    ...form,
  },
});

const reduxHookFormSlice = createSlice({
  initialState,
  name: 'reduxHookForm',
  reducers: {
    blur: (state, action: PayloadAction<TUpdateFieldActionPayload>) =>
      handleUpdateField(current(state) as TReduxHookFormState, action.payload),
    change: (state, action: PayloadAction<TUpdateFieldActionPayload>) =>
      handleUpdateField(current(state) as TReduxHookFormState, action.payload),
    clearFields: (state, action: PayloadAction<TClearFieldsActionPayload>) =>
      handleClearFields(current(state) as TReduxHookFormState, action.payload),
    destroyForm: (state, action: PayloadAction<string>) =>
      handleDestroyForm(current(state) as TReduxHookFormState, action.payload),
    focus: (state, action: PayloadAction<TUpdateFieldActionPayload>) =>
      handleUpdateField(current(state) as TReduxHookFormState, action.payload),
    initField: (state, action: PayloadAction<TInitFieldActionPayload>) =>
      handleInitField(current(state) as TReduxHookFormState, action.payload),
    mountForm: (state, action: PayloadAction<TMountFormActionPayload>) =>
      handleMountForm(current(state) as TReduxHookFormState, action.payload),
    setPending: (state, action: PayloadAction<TUpdateFormActionPayload>) =>
      handleUpdateForm(current(state) as TReduxHookFormState, action.payload),
    setPendingField: (state, action: PayloadAction<TUpdateFieldActionPayload>) =>
      handleUpdateField(current(state) as TReduxHookFormState, action.payload),
    setTouchedField: (state, action: PayloadAction<TUpdateFieldActionPayload>) =>
      handleUpdateField(current(state) as TReduxHookFormState, action.payload),
    submit: (state, action: PayloadAction<string>) =>
      handleSubmit(current(state) as TReduxHookFormState, action.payload),
    submitError: (state, action: PayloadAction<TSubmitErrorActionPayload>) =>
      handleSubmitError(current(state) as TReduxHookFormState, action.payload),
    submitSuccess: (state, action: PayloadAction<string>) =>
      handleSubmitSuccess(current(state) as TReduxHookFormState, action.payload),
    updateAsyncErrors: (state, action: PayloadAction<TUpdateFieldActionPayload>) =>
      handleUpdateField(current(state) as TReduxHookFormState, action.payload),
    updateFormValidator: (state, action: PayloadAction<TUpdateFormActionPayload>) =>
      handleUpdateForm(current(state) as TReduxHookFormState, action.payload),
    updateSyncErrors: (state, action: PayloadAction<TUpdateFieldActionPayload>) =>
      handleUpdateField(current(state) as TReduxHookFormState, action.payload),
  },
});

export const {
  blur,
  change,
  clearFields,
  destroyForm,
  focus,
  initField,
  mountForm,
  setPending,
  setPendingField,
  setTouchedField,
  submit,
  submitError,
  submitSuccess,
  updateAsyncErrors,
  updateFormValidator,
  updateSyncErrors,
} = reduxHookFormSlice.actions;
export const REDUCER_KEY = reduxHookFormSlice.name;
export default reduxHookFormSlice.reducer;
