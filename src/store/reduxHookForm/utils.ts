import { forOwn } from 'lodash';

// types
import { TField, TFields, TReduxHookFormState } from './types';

export const getFieldsWithModifiedAttributes = (formName: string, state: TReduxHookFormState): TFields => {
  const fields: { [key: string]: TField } = {};

  forOwn(state[formName].fields, (field: TField, name) => {
    const { value } = field;

    fields[name] = {
      ...field,
      modifiedSinceLastSubmit: false,
      valueSinceLastSubmit: value,
    };
  });

  return {
    ...state[formName].fields,
    ...fields,
  };
};

export const getUpdatedFieldsState = (
  field: Partial<TField>,
  formName: string,
  name: string,
  state: TReduxHookFormState,
): TFields => ({
  ...state[formName]?.fields,
  [name]: { ...state[formName]?.fields?.[name], ...field },
});

export const notifyFields = (formName: string, state: TReduxHookFormState, when: 'after' | 'before'): void => {
  const { fields } = state[formName] || {};

  forOwn(fields, (field: TField) => {
    const notify = field[`${when}Submit`] as () => void;

    if (notify) {
      notify();
    }
  });
};
