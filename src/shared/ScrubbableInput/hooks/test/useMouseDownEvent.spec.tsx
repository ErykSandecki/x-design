import { MouseEvent, RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

const mockCallBack = jest.fn();
const ref = { current: {} } as RefObject<HTMLDivElement>;

describe('useMouseDownEvent', () => {
  it(`should triiger event`, () => {
    // before
    const { result } = renderHook(() => useMouseDownEvent(ref, mockCallBack, mockCallBack));

    // action
    result.current({ clientX: 0, clientY: 0 } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });
});
