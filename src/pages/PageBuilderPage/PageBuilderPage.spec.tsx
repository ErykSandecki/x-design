import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import PageBuilderPage from './PageBuilderPage';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

describe('PageBuilderPage snapshots', () => {
  it('should render PageBuilderPage', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <PageBuilderPage />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
