import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useZoomBoxEvents } from '../useZoomBoxEvents';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

const mockCallBack = jest.fn();
const ref = {
  current: { getBoundingClientRect: (): any => ({ left: 0, top: 0 }) },
};

describe('useZoomBoxEvents', () => {
  it(`should return zoom events and data`, () => {
    // before
    const { result } = renderHook(() =>
      useZoomBoxEvents(
        BASE_3D,
        MouseMode.default,
        mockCallBack,
        mockCallBack,
        [],
        mockCallBack,
        [],
        mockCallBack,
        mockCallBack,
        ref as RefObject<HTMLDivElement>,
      ),
    );

    // result
    expect(result.current).toStrictEqual({
      cursorState: CURSOR_STATES[MouseButton.idle],
      onMouseDown: expect.any(Function),
      onWheel: expect.any(Function),
    });
  });
});
