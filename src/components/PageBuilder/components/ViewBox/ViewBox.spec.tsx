import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

// components
import ViewBox from './ViewBox';

// mocks
import 'test/mocks/sagas/allSagas';

// others
import { BASE_3D } from 'shared';

// store
import { configureStore } from 'store/store';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { E2EAttribute, MouseButton } from 'types';
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: (callback: any) => (value: any) => callback(value),
}));

describe('ViewBox snapshots', () => {
  it('should render ViewBox', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ViewBox
          coordinates={BASE_3D}
          mouseMode={MouseMode.default}
          setCoordinates={mockCallBack}
          setMouseMode={mockCallBack}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ViewBox behaviors', () => {
  it('should triiger on update coordinates', () => {
    // mock
    const store = configureStore();

    // before
    const { container } = render(
      <Provider store={store}>
        <ViewBox
          coordinates={BASE_3D}
          mouseMode={MouseMode.default}
          setCoordinates={mockCallBack}
          setMouseMode={mockCallBack}
        />
      </Provider>,
    );

    // action
    fireEvent.mouseDown(
      getByE2EAttribute(container, E2EAttribute.box, 'zoom-box'),
      {
        buttons: MouseButton.rmb,
      },
    );
    fireEvent.mouseMove(window, {
      buttons: MouseButton.rmb,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
