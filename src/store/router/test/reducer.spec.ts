// mocks
import { routerStateMock } from 'test/mocks/reducer/routerMock';

// others
import { REDUCER_KEY as ROUTER } from '../actionsType';

// store
import router from '../reducer';
import { historyChanged, push, redirectTo } from '../actions';

// types
import { RouterAction } from 'types/router/enums';
import { TAction } from 'types/redux';
import { TRouterState } from '../types';

describe('AppInitializerReducer', () => {
  const reducer = (action: TAction, initialState = {}): TRouterState =>
    router(initialState as TRouterState, action);

  it('should return default state', () => {
    // before
    const state = router({ ...routerStateMock[ROUTER] }, { type: '' });

    // result
    expect(state).toEqual(routerStateMock[ROUTER]);
  });

  it('should handle HISTORY_CHANGED', () => {
    // before
    const state = reducer(
      historyChanged(RouterAction.push, {
        pathname: '',
        query: {},
        search: '',
      }),
      routerStateMock[ROUTER],
    );

    // result
    expect(state).toEqual({
      ...routerStateMock[ROUTER],
      location: {
        pathname: '',
        query: {},
        search: '',
      },
    });
  });

  it('should handle PUSH', () => {
    // before
    const state = reducer(push('/'), routerStateMock[ROUTER]);

    // result
    expect(state).toEqual({
      ...routerStateMock[ROUTER],
      redirectTo: {
        action: RouterAction.push,
        to: '/',
      },
    });
  });

  it('should handle REDIRECT_TO', () => {
    // before
    const state = reducer(
      redirectTo({ action: RouterAction.push, to: '/' }),
      routerStateMock[ROUTER],
    );

    // result
    expect(state).toEqual({
      ...routerStateMock[ROUTER],
      redirectTo: {
        action: RouterAction.push,
        to: '/',
      },
    });
  });
});
