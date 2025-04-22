import { MouseEvent, RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// mocks
import {
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// others
import { BASE_2D } from 'shared';

// store
import { configureStore } from 'store';

// types
import { MouseButton, T2DCoordinates } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const mousePosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useMouseDownEvent(
          { x: 0, y: 0 },
          mousePosition,
          false,
          true,
          MouseMode.default,
          selectedElementMock,
          mockCallBack,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current({
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
          { x: 0, y: 0 },
          mousePosition,
          false,
          true,
          MouseMode.comment,
          selectedElementMock,
          mockCallBack,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current({ stopPropagation: mockCallBack as any } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
