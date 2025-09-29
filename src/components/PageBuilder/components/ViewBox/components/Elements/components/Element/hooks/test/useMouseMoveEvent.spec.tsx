import { fireEvent, renderHook } from '@testing-library/react';
import { RefObject } from 'react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_2D } from 'shared';

// store
import { configureStore } from 'store';

// types
import { ElementType } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const cursorPositionBase = {
  current: { x: 10, y: 10 },
} as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: (callback): any => callback,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useMouseMoveEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useMouseMoveEvent(cursorPosition, cursorPositionBase, '-1', true, MouseMode.default, '-1', ElementType.frame),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.mouseMove(window, {});

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({ coordinates: { x: 0, y: 0 }, mode: 'dynamic' });
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      draggableElements: [{ id: '-1', type: ElementType.frame }],
    });
  });

  it(`should not trigger event when mouse mode is not default`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useMouseMoveEvent(cursorPosition, cursorPositionBase, '-1', true, MouseMode.comment, '-1', ElementType.frame),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.mouseMove(window, {});

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
