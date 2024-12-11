import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import HomePage from 'pages/HomePage/HomePage';

// core
import { renderRoute } from '../renderRoute';

// mocks
import { routerStateMock } from 'test/mocks/reducer/routerMock';

// store
import { configureStore } from 'store/store';

// types
import { RouteName } from '../../constants/routes';
import { TAppRouteData } from '../../types';

// utils
const stateMock = {
  ...routerStateMock,
};

describe('renderRoute snaphots', () => {
  const store = configureStore(stateMock);

  it('should render renderRoute', () => {
    // mock
    const routeData: TAppRouteData = {
      Component: HomePage,
      name: RouteName.home,
    };

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>{renderRoute(routeData)}</BrowserRouter>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when routeDataArg is string', () => {
    // mock
    const routeData: TAppRouteData['name'] = RouteName.home;

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>{renderRoute(routeData)}</BrowserRouter>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
