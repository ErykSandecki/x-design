// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from 'store/reduxHookForm/actionsType';

// types
import { TField, TForm, TReduxHookFormState } from 'store/reduxHookForm/types';

export const reduxHookFormStateMock: Record<typeof REDUX_HOOK_FORM, TReduxHookFormState> = {
  [REDUX_HOOK_FORM]: {
    testForm: {
      asyncTimeDelay: 0,
      error: '',
      fields: {
        testField: {
          active: false,
          asyncErrors: [],
          data: {},
          emptyValue: '',
          fieldsToClearOnChange: [],
          initialValue: '',
          isPending: false,
          parse: (value: any) => value,
          previousValue: '',
          syncErrors: [],
          touched: false,
          value: '',
          visited: false,
        },
      },
      isPending: false,
      isValid: false,
    },
  },
};

export const fieldMock: TField = {
  active: false,
  asyncErrors: [],
  data: {},
  emptyValue: '',
  fieldsToClearOnChange: [],
  initialValue: '',
  isPending: false,
  parse: (value: any) => value,
  previousValue: '',
  syncErrors: [],
  touched: false,
  value: '',
  visited: false,
};

export const formMock: TForm = {
  asyncTimeDelay: 0,
  error: '',
  fields: {},
  isPending: false,
  isValid: false,
};
