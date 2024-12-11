import { mapValues, omit } from 'lodash';

// others
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
import { TAction } from 'types/redux';
import {
  TClearFieldsAction,
  TDestroyFormAction,
  TInitFieldAction,
  TMountFormAction,
  TReduxHookFormState,
  TSubmitAction,
  TSubmitErrorAction,
  TSubmitSuccessAction,
  TUpdateFieldAction,
  TUpdateFormAction,
} from './types';

// utils
import {
  getUpdatedFieldsState,
  getFieldsWithModifiedAttributes,
  notifyFields,
} from './utils';

const initialState: TReduxHookFormState = {};

const clearFields = (
  state: TReduxHookFormState,
  { payload }: TAction<TClearFieldsAction['payload']>,
): TReduxHookFormState => {
  const names = payload!.names;
  const formName = payload!.formName;

  const fields = mapValues(state[payload!.formName].fields, (field, name) =>
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

const destroyForm = (
  state: TReduxHookFormState,
  { payload: formName }: TAction<TDestroyFormAction['payload']>,
): TReduxHookFormState => {
  const newState = omit({ ...state }, [formName]);

  return {
    ...newState,
  };
};

const initField = (
  state: TReduxHookFormState,
  { payload: { formName, field, name } }: TAction<TInitFieldAction['payload']>,
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

const mountForm = (
  state: TReduxHookFormState,
  { payload }: TAction<TMountFormAction['payload']>,
): TReduxHookFormState => ({ ...state, ...payload });

const submit = (
  state: TReduxHookFormState,
  { payload: formName }: TAction<TSubmitAction['payload']>,
): TReduxHookFormState => {
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

const submitError = (
  state: TReduxHookFormState,
  { payload: { error, formName } }: TAction<TSubmitErrorAction['payload']>,
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

const submitSuccess = (
  state: TReduxHookFormState,
  { payload: formName }: TAction<TSubmitSuccessAction['payload']>,
): TReduxHookFormState => {
  notifyFields(formName, state, 'after');
  return {
    ...state,
    [formName]: {
      ...state[formName],
      isPending: false,
    },
  };
};

const updateField = (
  state: TReduxHookFormState,
  {
    payload: { formName, field, name },
  }: TAction<TUpdateFieldAction['payload']>,
): TReduxHookFormState => ({
  ...state,
  [formName]: {
    ...state[formName],
    fields: getUpdatedFieldsState(field, formName, name, state),
  },
});

const updateForm = (
  state: TReduxHookFormState,
  { payload: { form, formName } }: TAction<TUpdateFormAction['payload']>,
): TReduxHookFormState => ({
  ...state,
  [formName]: {
    ...state[formName],
    ...form,
  },
});

export const reduxHookForm = (
  state: TReduxHookFormState = initialState,
  action: TAction,
): TReduxHookFormState => {
  switch (action.type) {
    case CLEAR_FIELDS:
      return clearFields(state, action);
    case DESTROY_FORM:
      return destroyForm(state, action);
    case INIT_FIELD:
      return initField(state, action);
    case MOUNT_FORM:
      return mountForm(state, action);
    case SUBMIT:
      return submit(state, action);
    case SUBMIT_ERROR:
      return submitError(state, action);
    case SUBMIT_SUCCESS:
      return submitSuccess(state, action);
    case BLUR:
    case CHANGE:
    case FOCUS:
    case SET_PENDING_FIELD:
    case SET_TOUCHED_FIELD:
    case UPDATE_ASYNC_ERRORS:
    case UPDATE_SYNC_ERRORS:
      return updateField(state, action);
    case SET_PENDING:
    case UPDATE_FORM_VALIDATOR:
      return updateForm(state, action);
    default:
      return state;
  }
};

export default reduxHookForm;
