import { renderHook } from '@testing-library/react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_3D, BASE_RECT } from 'shared/ZoomBox/constants';

// types
import { MouseButton } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

const mockCallBack = jest.fn();

describe('useMouseMoveEvent', () => {
  it(`should trigger event toolBeltA`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseMoveEvent(
        BASE_3D,
        BASE_RECT,
        MouseMode.toolBeltA,
        BASE_RECT,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current({ buttons: MouseButton.lmb } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should trigger event default`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseMoveEvent(
        BASE_3D,
        BASE_RECT,
        MouseMode.default,
        BASE_RECT,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current({ buttons: MouseButton.lmb } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
