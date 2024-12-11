// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookForm';

// others
import { REDUCER_KEY } from '../../actionsType';

// store
import { formsSelectorCreator } from '../../selectors';

const state = reduxHookFormStateMock[REDUCER_KEY];

describe('formsSelectorCreator', () => {
  it('should return nothing', () => {
    // before
    const selectorFunction = (formsSelectorCreator(['']) as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual([]);
  });

  it('should return set of forms', () => {
    // before
    const selectorFunction = (formsSelectorCreator(['testForm']) as any)
      .resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual([
      reduxHookFormStateMock[REDUCER_KEY].testForm,
    ]);
  });
});
