// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookForm';

// others
import { REDUCER_KEY } from '../../actionsType';

// store
import { fieldSelectorCreator } from '../../selectors';

const state = reduxHookFormStateMock[REDUCER_KEY].testForm.fields;

describe('fieldSelectorCreator', () => {
  it('should return empty object', () => {
    // before
    const selectorFunction = (fieldSelectorCreator('', '') as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual({});
  });

  it('should return field', () => {
    // before
    const selectorFunction = (
      fieldSelectorCreator('testForm', 'testField') as any
    ).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(
      reduxHookFormStateMock[REDUCER_KEY].testForm.fields.testField,
    );
  });
});
