import { renderHook } from '@testing-library/react';

// hooks
import { useMouseEnterEvent } from '../useMouseEnterEvent';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';

const mockCallBack = jest.fn();

describe('useMouseEnterEvent', () => {
  it(`should trigger event on resize`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseEnterEvent(0, false, false, mockCallBack, mockCallBack),
    );

    // action
    result.current.onMouseEnterAnchorResize(AnchorResize.east);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should trigger event on rotate`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseEnterEvent(0, false, false, mockCallBack, mockCallBack),
    );

    // action
    result.current.onMouseEnterAnchorRotate(AnchorRotate.northEast);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should not trigger any events`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseEnterEvent(0, true, true, mockCallBack, mockCallBack),
    );

    // action
    result.current.onMouseEnterAnchorRotate(AnchorRotate.northEast);
    result.current.onMouseEnterAnchorResize(AnchorResize.east);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
