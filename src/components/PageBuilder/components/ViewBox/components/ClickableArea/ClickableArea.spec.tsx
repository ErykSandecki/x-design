import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import ClickableArea from './ClickableArea';

// mocks
import 'test/mocks/sagas/allSagas';

// others
import { BASE_RECT } from 'shared';

// store
import { configureStore } from 'store/store';

describe('ClickableArea snapshots', () => {
  it('should render ClickableArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ClickableArea rectCoordinates={BASE_RECT} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
