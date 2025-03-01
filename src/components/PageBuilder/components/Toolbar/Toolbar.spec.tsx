import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Toolbar from './Toolbar';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { MouseMode } from 'components/PageBuilder/enums';

const mockCallBack = jest.fn();

describe('Toolbar snapshots', () => {
  it('should render Toolbar', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Toolbar mouseMode={MouseMode.default} setMouseMode={mockCallBack} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
