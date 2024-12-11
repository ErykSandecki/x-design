import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import AppInitializer from './AppInitializer';

// core
import { ContextProvider } from 'core/ContextProvider/ContextProvider';

// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// store
import { configureStore } from 'store/store';

// types
import { Theme } from 'types/enums';

const stateMock = {
  ...appInitializerStateMock,
};

describe('AppInitializer snapshots', () => {
  it('should render AppInitializer', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <AppInitializer />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render in dark mode', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ContextProvider theme={Theme.dark}>
          <AppInitializer />
        </ContextProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
