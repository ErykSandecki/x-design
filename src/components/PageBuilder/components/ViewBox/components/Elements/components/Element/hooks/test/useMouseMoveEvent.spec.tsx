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
import { MouseMode } from 'types/enums/mouseMode';
import { T2DCoordinates } from 'types';

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
  throttle: (callback) => callback,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
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
        useMouseMoveEvent(
          cursorPosition,
          cursorPositionBase,
          '-1',
          true,
          MouseMode.default,
          '-1',
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.mouseMove(window, {});

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should not trigger event when mouse mode is not default`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useMouseMoveEvent(
          cursorPosition,
          cursorPositionBase,
          '-1',
          true,
          MouseMode.comment,
          '-1',
        ),
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
