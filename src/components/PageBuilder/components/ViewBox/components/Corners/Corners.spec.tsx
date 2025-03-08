import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Corners from './Corners';

// mocks
import 'test/mocks/sagas/allSagas';

// others
import { BASE_RECT } from 'shared';

// store
import { configureStore } from 'store/store';

describe('Corners snapshots', () => {
  it('should render Corners', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Corners rectCoordinates={BASE_RECT} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht outline', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Corners rectCoordinates={BASE_RECT} withOutline />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
