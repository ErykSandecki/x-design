import { Provider } from 'react-redux';

// components
import PageBuilderPage from './PageBuilderPage';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore, store } from 'store/store';

// utils
import { customRender } from 'test';

describe('PageBuilderPage snapshots', () => {
  beforeAll(() => {
    // mock
    window.store = store;
  });

  it('should render PageBuilderPage', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <PageBuilderPage />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
