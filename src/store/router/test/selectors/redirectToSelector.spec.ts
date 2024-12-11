// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// others
import { REDUCER_KEY as APP_INITIALIZER } from '../../actionsType';

// store
import { redirectToSelector } from '../../selectors';

// types
import { RouterAction } from 'types/router/enums';

const state = appInitializerStateMock[APP_INITIALIZER];

describe('redirectToSelector', () => {
  it('should return undefined', () => {
    // before
    const selectorFunction = (redirectToSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toBe(undefined);
  });

  it('should return true', () => {
    // mock
    const stateMock = {
      ...state,
      redirectTo: {
        action: RouterAction.push,
        to: '/',
      },
    };

    // before
    const selectorFunction = (redirectToSelector as any).resultFunc;

    // result
    expect(selectorFunction(stateMock)).toStrictEqual({
      action: RouterAction.push,
      to: '/',
    });
  });
});
