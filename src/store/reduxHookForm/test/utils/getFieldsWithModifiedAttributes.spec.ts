// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from '../../actionsType';

// types
import { TReduxHookFormState } from '../../types';

// utils
import { getFieldsWithModifiedAttributes } from '../../utils';

describe('getFieldsWithModifiedAttributes', () => {
  it('should return updated field', () => {
    // before
    const stateMock = {
      ...reduxHookFormStateMock[REDUX_HOOK_FORM],
      testForm: {
        ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm,
        fields: {
          ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm.fields,
          testField: {
            ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm.fields.testField,
            value: '',
          },
        },
      },
    } as TReduxHookFormState;

    // result
    expect(getFieldsWithModifiedAttributes('testForm', stateMock)).toStrictEqual({
      testField: {
        ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm.fields.testField,
        modifiedSinceLastSubmit: false,
        value: '',
        valueSinceLastSubmit: '',
      },
    });
  });
});
