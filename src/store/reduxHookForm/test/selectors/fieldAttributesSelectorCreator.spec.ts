// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY } from '../../actionsType';

// store
import { fieldAttributesSelectorCreator } from '../../selectors';

const state = reduxHookFormStateMock[REDUCER_KEY].testForm.fields.testField;

describe('fieldAttributesSelectorCreator', () => {
  it('should return nothing', () => {
    // before
    const selectorFunction = (fieldAttributesSelectorCreator('', '', '') as any)
      .resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(undefined);
  });

  it('should return single attribute', () => {
    // before
    const selectorFunction = (
      fieldAttributesSelectorCreator('active', 'testForm', 'testField') as any
    ).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(false);
  });

  it('should return set of attributes', () => {
    // before
    const selectorFunction = (
      fieldAttributesSelectorCreator(
        ['active', 'touched'],
        'testForm',
        'testField',
      ) as any
    ).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual({
      active: false,
      touched: false,
    });
  });
});
