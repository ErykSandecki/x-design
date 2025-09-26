import { RefObject, WheelEvent } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useWheelEvent } from '../useWheelEvent';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';

const mockCallBack = jest.fn();
const ref = {
  current: { getBoundingClientRect: (): any => ({ left: 0, top: 0 }) },
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce:
    (callback: any) =>
    (value: any): any =>
      callback(value),
}));

describe('useWheelEvent', () => {
  it(`should trigger handle zoom`, () => {
    // before
    const { result } = renderHook(() =>
      useWheelEvent(
        BASE_3D,
        mockCallBack,
        mockCallBack,
        ref as RefObject<HTMLDivElement>,
      ),
    );

    // action
    result.current({
      clientX: 0,
      clientY: 0,
      ctrlKey: true,
      deltaY: 1,
    } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should trigger handle scroll page`, () => {
    // before
    const { result } = renderHook(() =>
      useWheelEvent(
        BASE_3D,
        mockCallBack,
        mockCallBack,
        ref as RefObject<HTMLDivElement>,
      ),
    );

    // action
    result.current({
      buttons: 0,
      deltaX: 1,
      deltaY: 1,
    } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });
});
