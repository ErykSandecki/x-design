import { renderHook } from '@testing-library/react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { SEPARATOR } from '../../constants';

const mockCallBack = jest.fn();

describe('useMouseMoveEvent', () => {
  it(`should handle mouse move`, () => {
    // before
    const { result } = renderHook(() => useMouseMoveEvent(mockCallBack));

    // action
    result.current({ target: { getAttribute: () => `1${SEPARATOR}1` } } as any);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ columns: 1, rows: 1 });
  });

  it(`should not trigger event`, () => {
    // before
    const { result } = renderHook(() => useMouseMoveEvent(mockCallBack));

    // action
    result.current({ target: { getAttribute: () => undefined } } as any);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
