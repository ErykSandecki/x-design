import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import SelectableArea from './SelectableArea';

// mocks
import 'test/mocks/sagas/allSagas';

// others
import { BASE_RECT } from 'shared';

// store
import { configureStore } from 'store/store';

describe('SelectableArea snapshots', () => {
  it('should render SelectableArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <SelectableArea selectableArea={BASE_RECT} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render SelectableArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <SelectableArea selectableArea={null} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
