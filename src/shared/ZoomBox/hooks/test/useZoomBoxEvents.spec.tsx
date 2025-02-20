import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useZoomBoxEvents } from '../useZoomBoxEvents';

// others
import { INITIAL_COORDINATES } from 'shared/ZoomBox/constants';

const mockCallBack = jest.fn();
const ref = { current: { getBoundingClientRect: () => ({ left: 0, top: 0 }) } };

describe('useZoomBoxEvents', () => {
  it(`should return zoom events and data`, () => {
    // before
    const { result } = renderHook(() =>
      useZoomBoxEvents(
        INITIAL_COORDINATES,
        mockCallBack,
        ref as RefObject<HTMLDivElement>,
      ),
    );

    // result
    expect(result.current).toStrictEqual({
      onWheel: expect.any(Function),
    });
  });
});
