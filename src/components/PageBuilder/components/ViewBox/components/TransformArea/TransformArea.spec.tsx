import { fireEvent, render } from '@testing-library/react';
import { kebabCase } from 'lodash';
import { Provider } from 'react-redux';
import { RefObject } from 'react';

// components
import TransformArea from './TransformArea';

// hooks
import { useTransformAreaEvents } from './hooks/useTransformAreaEvents';

// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';
// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';
import { E2EAttribute } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { createHtmlElement } from 'utils';
import { getByE2EAttribute } from 'test';

const elementRef = {
  current: createHtmlElement('div'),
} as RefObject<HTMLDivElement>;

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

jest.mock('./hooks/useTransformAreaEvents', () => ({
  useTransformAreaEvents: jest.fn(),
}));

describe('TransformArea snapshots', () => {
  beforeEach(() => {
    (useTransformAreaEvents as jest.Mock).mockReturnValue({
      onMouseDownAnchorResize: mockCallBack,
      onMouseDownAnchorRotate: mockCallBack,
    });
  });

  it('should render TransformArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <TransformArea
          elementRef={elementRef}
          height={100}
          id={selectedElementMock.id}
          moseMode={MouseMode.default}
          rotate={0}
          width={100}
          x={100}
          y={100}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('TransformArea behaviors', () => {
  beforeEach(() => {
    (useTransformAreaEvents as jest.Mock).mockImplementation(() => ({
      onMouseDownAnchorResize: mockCallBack,
      onMouseDownAnchorRotate: mockCallBack,
    }));
  });

  it('should triiger mouse down event anchor resize', () => {
    // mock
    const store = configureStore();

    // before
    const { container } = render(
      <Provider store={store}>
        <TransformArea
          elementRef={elementRef}
          height={100}
          id={selectedElementMock.id}
          moseMode={MouseMode.default}
          rotate={0}
          width={100}
          x={100}
          y={100}
        />
      </Provider>,
    );

    // action
    fireEvent.mouseDown(
      getByE2EAttribute(
        container,
        E2EAttribute.anchorResize,
        kebabCase(AnchorResize.east),
      ),
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should triiger mouse down event anchor rotate', () => {
    // mock
    const store = configureStore();

    // before
    const { container } = render(
      <Provider store={store}>
        <TransformArea
          elementRef={elementRef}
          height={100}
          id={selectedElementMock.id}
          moseMode={MouseMode.default}
          rotate={0}
          width={100}
          x={100}
          y={100}
        />
      </Provider>,
    );

    // action
    fireEvent.mouseDown(
      getByE2EAttribute(
        container,
        E2EAttribute.anchorRotate,
        kebabCase(AnchorRotate.northEast),
      ),
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
