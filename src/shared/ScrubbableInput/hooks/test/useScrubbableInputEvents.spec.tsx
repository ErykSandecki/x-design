import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useScrubbableInputEvents } from '../useScrubbableInputEvents';

const mockCallBack = jest.fn();
const ref = { current: {} } as RefObject<HTMLDivElement>;

describe('useScrubbableInputEvents', () => {
  it(`should return events and data`, () => {
    // before
    const { result } = renderHook(() =>
      useScrubbableInputEvents(ref, false, 100, 0, mockCallBack, mockCallBack, mockCallBack, 0),
    );

    // result
    expect(result.current).toStrictEqual({
      mousePosition: null,
      onMouseDown: expect.any(Function),
      onMouseUp: expect.any(Function),
    });
  });
});
