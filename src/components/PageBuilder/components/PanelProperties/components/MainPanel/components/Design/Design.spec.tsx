import { Provider } from 'react-redux';

// components
import Design from './Design';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { configureStore } from 'store/store';

// utils
import { customRender } from 'test';

const stateMock = {
  ...pageBuilderStateMock,
};

describe('Design snapshots', () => {
  it('should render Design', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
