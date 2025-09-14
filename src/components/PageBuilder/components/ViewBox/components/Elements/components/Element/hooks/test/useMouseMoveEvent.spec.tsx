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

const mockCallBack = jest.fn();
const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;
const refBase = { current: { x: 10, y: 10 } } as RefObject<T2DCoordinates>;
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
          BASE_2D,
          ref,
          refBase,
          '-1',
          false,
          true,
          MouseMode.default,
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
          BASE_2D,
          ref,
          refBase,
          '-1',
          false,
          true,
          MouseMode.comment,
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

  it(`should trigger event when is multiple`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useMouseMoveEvent(
          BASE_2D,
          ref,
          refBase,
          '-1',
          false,
          true,
          MouseMode.default,
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
});
