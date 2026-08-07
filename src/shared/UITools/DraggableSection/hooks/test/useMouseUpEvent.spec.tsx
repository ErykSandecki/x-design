import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

// others
import { ANCHOR_INDEX } from '../../constants';

const mockCallBack = vi.fn();

const dispatchMouseUp = (anchorIndex: string | null): void => {
  const anchor = document.createElement('div');

  if (anchorIndex !== null) {
    anchor.setAttribute(ANCHOR_INDEX, anchorIndex);
  }

  document.body.appendChild(anchor);
  fireEvent.mouseUp(anchor);
  document.body.removeChild(anchor);
};

describe('useMouseUpEvent', () => {
  it(`should trigger event`, () => {
    // before
    renderHook(() => useMouseUpEvent(2, true, mockCallBack, mockCallBack, mockCallBack, mockCallBack));

    // action
    dispatchMouseUp('0');

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(2);
    expect(mockCallBack.mock.calls[0][1]).toBe(0);
    expect(mockCallBack.mock.calls[1][0]).toBe(0);
    expect(mockCallBack.mock.calls[2][0]).toBe(false);
    expect(mockCallBack.mock.calls[3][0]).toBe(false);
  });

  it(`should trigger some events when value is NaN`, () => {
    // before
    renderHook(() => useMouseUpEvent(0, true, mockCallBack, mockCallBack, mockCallBack, mockCallBack));

    // action
    dispatchMouseUp(null);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(false);
    expect(mockCallBack.mock.calls[1][0]).toBe(false);
  });
});
