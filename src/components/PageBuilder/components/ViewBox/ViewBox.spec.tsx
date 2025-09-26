import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ViewBox from './ViewBox';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';
import 'test/mocks/sagas/allSagas';

// others
import { BASE_3D } from 'shared';

// store
import { configureStore } from 'store/store';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { E2EAttribute, MouseButton } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const element = document.createElement('div');
const overlayContainer = document.createElement('div');
const mockCallBack = jest.fn();
const sharedRefs = {
  [elementAllDataMock.id]: element,
  ['2']: element,
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce:
    (callback: any) =>
    (value: any): any =>
      callback(value),
}));

describe('ViewBox snapshots', () => {
  beforeAll(() => {
    element.style.height = '100px';
    element.style.width = '100px';
    document.body.appendChild(overlayContainer);
  });

  it('should render ViewBox', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider
          itemsRefs={sharedRefs}
          overlayContainerRefHtml={overlayContainer}
        >
          <ViewBox
            coordinates={BASE_3D}
            mouseMode={MouseMode.default}
            setCoordinates={mockCallBack}
            setMouseMode={mockCallBack}
          />
        </RefsProvider>
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
        <RefsProvider
          itemsRefs={sharedRefs}
          overlayContainerRefHtml={overlayContainer}
        >
          <ViewBox
            coordinates={BASE_3D}
            mouseMode={MouseMode.default}
            setCoordinates={mockCallBack}
            setMouseMode={mockCallBack}
          />
        </RefsProvider>
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
