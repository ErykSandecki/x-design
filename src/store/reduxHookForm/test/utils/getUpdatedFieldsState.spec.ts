// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from '../../actionsType';

// types
import { TField, TReduxHookFormState } from '../../types';

// utils
import { getUpdatedFieldsState } from '../../utils';

describe('getUpdatedFieldsState', () => {
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
          },
        },
      },
    } as TReduxHookFormState;

    // result
    expect(getUpdatedFieldsState({ value: '' } as Partial<TField>, 'testForm', 'testField', stateMock)).toStrictEqual({
      testField: {
        ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm.fields.testField,
        value: '',
      },
    });
  });
});
