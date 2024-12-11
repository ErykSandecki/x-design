import { createMemoryHistory } from 'history';
import { renderHook } from '@testing-library/react';

// hooks
import { useHandleRouter } from '../useHandleRouter';

// others
import { REDUCER_KEY } from 'store/router/actionsType';

// mocks
import { configureStore } from 'store/store';
import { routerStateMock } from 'test/mocks/reducer/routerMock';

// store
import { redirectTo } from 'store/router/actions';

// types
import { RouteName } from 'core/Routing/constants/routes';
import { RouterAction } from 'types/router/enums';

// utils
import { getProviderWrapper, sleep } from 'test/testHelpers';
import { getRouteByName } from 'core/Routing/utils/getRouteByName';

const history = createMemoryHistory({
  initialEntries: ['/'],
});

const stateMock = {
  ...routerStateMock,
};
describe('useHandleRouter', () => {
  beforeEach(() => {
    history.push(getRouteByName(RouteName.home));
  });

  it('should init router', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useHandleRouter(), {
      wrapper: getProviderWrapper(store, history),
    });

    // result
    expect(store.getState()[REDUCER_KEY]).not.toBeUndefined();
  });

  // it('should redirect by method PUSH', async () => {
  //   // mock
  //   const store = configureStore(stateMock);

  //   // before
  //   renderHook(() => useHandleRouter(), {
  //     wrapper: getProviderWrapper(store, history),
  //   });

  //   // action
  //   store.dispatch(
  //     redirectTo({
  //       action: RouterAction.push,
  //       to: getRouteByName(RouteName.createStrategy),
  //     }),
  //   );

  //   // wait
  //   await sleep(100);

  //   // result
  //   expect(history.location.pathname).toBe(
  //     getRouteByName(RouteName.createStrategy),
  //   );
  // });

  it('should redirect by method REPLACE', async () => {
    // mock
    const queryParam = 'queryParam=queryParam';
    const store = configureStore(stateMock);

    // before
    renderHook(() => useHandleRouter(), {
      wrapper: getProviderWrapper(store, history),
    });

    // action
    store.dispatch(
      redirectTo({
        action: RouterAction.replace,
        to: `${getRouteByName(RouteName.home)}?${queryParam}`,
      }),
    );

    // wait
    await sleep(100);

    // result
    expect(history.location.pathname).toBe(getRouteByName(RouteName.home));
  });
});
