// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// others
import { REDUCER_KEY as APP_INITIALIZER } from '../../actionsType';

// store
import { isAppLoadedSelector } from '../../selectors';

const state = appInitializerStateMock[APP_INITIALIZER];

describe('isAppLoadedSelector', () => {
  it('should return false', () => {
    // before
    const selectorFunction = (isAppLoadedSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(false);
  });

  it('should return true', () => {
    // mock
    const stateMock = { ...state, isAppLoaded: true };

    // before
    const selectorFunction = (isAppLoadedSelector as any).resultFunc;

    // result
    expect(selectorFunction(stateMock)).toStrictEqual(true);
  });
});
