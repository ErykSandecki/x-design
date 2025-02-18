import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import App from './App';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

describe('App snapshots', () => {
  it('should render initializer', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
