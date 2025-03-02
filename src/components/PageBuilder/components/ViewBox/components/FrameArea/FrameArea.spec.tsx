import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import FrameArea from './FrameArea';

// mocks
import 'test/mocks/sagas/allSagas';

// others
import { BASE_RECT } from 'shared';

// store
import { configureStore } from 'store/store';

describe('FrameArea snapshots', () => {
  it('should render FrameArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FrameArea frameArea={BASE_RECT} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with label when x2 i y2 is less than rest cords', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FrameArea frameArea={{ ...BASE_RECT, x2: -100, y2: -100 }} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render FrameArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FrameArea frameArea={null} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
