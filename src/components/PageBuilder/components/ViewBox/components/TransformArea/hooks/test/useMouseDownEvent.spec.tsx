import { MouseEvent, RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// others
import { BASE_2D } from 'shared';

// store
import { configureStore } from 'store';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';
import { MouseButton, T2DCoordinates } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

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
};

describe('useMouseMoveEvent', () => {
  it(`should trigger event resize`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useMouseDownEvent(
          cursorBaseAngle,
          cursorOffsetAngle,
          cursorPosition,
          elementRef,
          MouseMode.default,
          mockCallBack,
          mockCallBack,
          0,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current.onMouseDownAnchorResize(AnchorResize.east, {
      buttons: MouseButton.lmb,
      stopPropagation: mockCallBack as any,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should trigger event rotate`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useMouseDownEvent(
          cursorBaseAngle,
          cursorOffsetAngle,
          cursorPosition,
          elementRef,
          MouseMode.default,
          mockCallBack,
          mockCallBack,
          0,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current.onMouseDownAnchorRotate(AnchorRotate.northEast, {
      buttons: MouseButton.lmb,
      stopPropagation: mockCallBack as any,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should not trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useMouseDownEvent(
          cursorOffsetAngle,
          cursorBaseAngle,
          cursorPosition,
          elementRef,
          MouseMode.comment,
          mockCallBack,
          mockCallBack,
          0,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current.onMouseDownAnchorResize(AnchorResize.east, {
      buttons: MouseButton.lmb,
      stopPropagation: mockCallBack as any,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should not trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useMouseDownEvent(
          cursorOffsetAngle,
          cursorBaseAngle,
          cursorPosition,
          elementRef,
          MouseMode.comment,
          mockCallBack,
          mockCallBack,
          0,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current.onMouseDownAnchorRotate(AnchorRotate.none, {
      buttons: MouseButton.lmb,
      stopPropagation: mockCallBack as any,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
