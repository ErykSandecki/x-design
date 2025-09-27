// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY } from '../../actionsType';

// store
import { formSelectorCreator } from '../../selectors';

const state = reduxHookFormStateMock[REDUCER_KEY];

describe('formSelectorCreator', () => {
  it('should return empty object', () => {
    // before
    const selectorFunction = (formSelectorCreator('') as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual({});
  });

  it('should return form data', () => {
    // before
    const selectorFunction = (formSelectorCreator('testForm') as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(reduxHookFormStateMock[REDUCER_KEY].testForm);
  });
});
