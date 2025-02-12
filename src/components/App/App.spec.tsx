import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import App from './App';

// mocks
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';
import 'test/mocks/sagas/allSagas';

// others
import { REDUCER_KEY as APP_INITIALIZER } from 'store/appInitializer/actionsType';

// store
import { configureStore } from 'store/store';

// jest.mock('core/Routing/Routing', () => () => 'Routing');

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
