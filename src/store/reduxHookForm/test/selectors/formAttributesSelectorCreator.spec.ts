// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY } from '../../actionsType';

// store
import { formAttributesSelectorCreator } from '../../selectors';

const state = reduxHookFormStateMock[REDUCER_KEY].testForm;

describe('formAttributesSelectorCreator', () => {
  it('should return nothing', () => {
    // before
    const selectorFunction = (formAttributesSelectorCreator('', '') as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(undefined);
  });

  it('should return single attribute', () => {
    // before
    const selectorFunction = (formAttributesSelectorCreator('asyncTimeDelay', 'testForm') as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(0);
  });

  it('should return set of attributes', () => {
    // before
    const selectorFunction = (formAttributesSelectorCreator(['asyncTimeDelay', 'error'], 'testForm') as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual({
      asyncTimeDelay: 0,
      error: '',
    });
  });
});
