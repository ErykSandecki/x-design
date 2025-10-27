import { Provider } from 'react-redux';

// components
import GridArea from './GridArea';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// utils
import { customRender } from 'test';

describe('GridArea snapshots', () => {
  it('should render GridArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <GridArea columns={10} rows={10} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
