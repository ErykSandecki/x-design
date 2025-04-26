import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Design from './Design';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { configureStore } from 'store/store';

const stateMock = {
  ...pageBuilderStateMock,
};

describe('Design snapshots', () => {
  it('should render Design', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
