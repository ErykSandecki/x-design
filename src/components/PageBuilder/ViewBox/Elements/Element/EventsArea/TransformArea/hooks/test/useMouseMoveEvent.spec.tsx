import { fireEvent, renderHook } from '@testing-library/react';
import { RefObject } from 'react';

// mocks
import { eventsMock, flipMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_2D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';

// utils
import { getProviderWrapper } from 'test';

const cursorBaseAngle = { current: 0 } as RefObject<number>;
const cursorOffsetAngle = { current: 0 } as RefObject<number>;
const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const elementRef = {
  current: {
    getBoundingClientRect: () => ({ height: 100, left: 0, top: 0, width: 100 }),
  },
} as RefObject<HTMLDivElement>;
const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    events: eventsMock,
  },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useMouseMoveEvent', () => {
  it(`should trigger event resize`, () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          selectedAnchorResize: AnchorResize.east,
        },
      },
    });

    // before
    renderHook(
      () =>
        useMouseMoveEvent(
          cursorBaseAngle,
          cursorOffsetAngle,
          cursorPosition,
          elementRef,
          flipMock,
          100,
          selectedElementMock.id,
          0,
          100,
          0,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.mouseMove(window, {});

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      baseCoordinates: { x1: 100, x2: 100, y1: 0, y2: 100 },
      flip: flipMock,
      height: 100,
      id: 'test-1',
      mouseCoordinates: { x: 0, y: 0 },
      width: 0,
    });
  });

  it(`should trigger event rotate`, () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          selectedAnchorRotate: AnchorRotate.northEast,
        },
      },
    });

    // before
    renderHook(
      () =>
        useMouseMoveEvent(
          cursorBaseAngle,
          cursorOffsetAngle,
          cursorPosition,
          elementRef,
          flipMock,
          100,
          selectedElementMock.id,
          0,
          100,
          0,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.mouseMove(window, {});

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toBe(-135);
  });

  it(`should not trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useMouseMoveEvent(
          cursorBaseAngle,
          cursorOffsetAngle,
          cursorPosition,
          elementRef,
          flipMock,
          100,
          selectedElementMock.id,
          0,
          100,
          0,
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
