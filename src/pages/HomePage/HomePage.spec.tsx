import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { render } from '@testing-library/react';

// components
import HomePage from './HomePage';

// core
import { ContextProvider } from 'core/ContextProvider/ContextProvider';

// types
import { RouteName } from 'core/Routing/constants/routes';

// store
import { configureStore } from 'store/store';

// types
import { Theme } from 'types/enums';

// utils
import { getRouteByName } from 'core/Routing/utils/getRouteByName';

const history = createMemoryHistory({
  initialEntries: [getRouteByName(RouteName.home)],
});

describe('HomePage snapshots', () => {
  it('should render HomePage', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <ContextProvider>
            <HomePage />
          </ContextProvider>
        </Router>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render in dark mode', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <ContextProvider theme={Theme.dark}>
            <HomePage />
          </ContextProvider>
        </Router>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
