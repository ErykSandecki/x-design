import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Redirect, Router } from 'react-router';
import { render } from '@testing-library/react';

// components
import ProtectedRoute from './ProtectedRoute';

// mocks
import { routerStateMock } from 'test/mocks/reducer/routerMock';

// others
import { TAppRouteData } from '../../types';

// store
import { configureStore } from 'store/store';

// types
import { RouteName } from '../../constants/routes';

const history = createMemoryHistory({
  initialEntries: ['*'],
});

const stateMock = {
  ...routerStateMock,
};

const routeData: TAppRouteData = {
  Component: () => <div>Component</div>,
  guards: [
    {
      guardCheck: () => true,
      renderFallback: () => <Redirect exact from={'/'} to={'/error'} />,
      translationKey: '',
    },
  ],
  name: RouteName.home,
};

describe('ProtectedRoute snapshots', () => {
  // mock
  const store = configureStore(stateMock);

  it('should allow user on route', () => {
    // mock
    const { Component, guards, name } = routeData;

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <ProtectedRoute component={Component} guards={guards} name={name} />
        </Router>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow user without guards', () => {
    // mock
    const { Component, name } = routeData;

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <ProtectedRoute component={Component} name={name} />
        </Router>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not allow user on route', () => {
    // mock
    const store = configureStore(stateMock);
    const { Component, guards, name } = routeData;

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <ProtectedRoute
            component={Component}
            guards={[{ ...guards![0], guardCheck: () => false }]}
            name={name}
          />
        </Router>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not allow user on route with translation key', () => {
    // mock
    const store = configureStore(stateMock);
    const { Component, guards, name } = routeData;

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <ProtectedRoute
            component={Component}
            guards={[
              {
                ...guards![0],
                guardCheck: () => false,
                translationKey: 'translationKey',
              },
            ]}
            name={name}
          />
        </Router>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
