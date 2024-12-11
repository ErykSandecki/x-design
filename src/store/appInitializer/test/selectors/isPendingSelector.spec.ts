// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// others
import { REDUCER_KEY as APP_INITIALIZER } from '../../actionsType';

// store
import { isPendingSelector } from '../../selectors';

const state = appInitializerStateMock[APP_INITIALIZER];

describe('isPendingSelector', () => {
  it('should return true', () => {
    // before
    const selectorFunction = (isPendingSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(true);
  });

  it('should return false', () => {
    // mock
    const stateMock = { ...state, isPending: false };

    // before
    const selectorFunction = (isPendingSelector as any).resultFunc;

    // result
    expect(selectorFunction(stateMock)).toStrictEqual(false);
  });
});
