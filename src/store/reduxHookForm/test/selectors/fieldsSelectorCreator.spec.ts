// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY } from '../../actionsType';

// store
import { fieldsSelectorCreator } from '../../selectors';

const state = reduxHookFormStateMock[REDUCER_KEY].testForm;

describe('fieldsSelectorCreator', () => {
  it('should return empty object', () => {
    // before
    const selectorFunction = (fieldsSelectorCreator('', ['']) as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual({});
  });

  it('should return object with fields', () => {
    // before
    const selectorFunction = (fieldsSelectorCreator('testForm', ['testField']) as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual({
      testField: reduxHookFormStateMock[REDUCER_KEY].testForm.fields.testField,
    });
  });
});
