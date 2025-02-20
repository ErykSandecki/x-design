import { RefObject, WheelEvent } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useWheelEvent } from '../useWheelEvent';

// others
import { INITIAL_COORDINATES } from 'shared/ZoomBox/constants';

const mockCallBack = jest.fn();
const ref = { current: { getBoundingClientRect: () => ({ left: 0, top: 0 }) } };

describe('useWheelEvent', () => {
  it(`should not trigger event when is no contol pressed`, () => {
    // before
    const { result } = renderHook(() =>
      useWheelEvent(
        INITIAL_COORDINATES,
        mockCallBack,
        ref as RefObject<HTMLDivElement>,
      ),
    );

    // action
    result.current({ clientX: 0, clientY: 0, deltaY: 0 } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should zoom out`, () => {
    // before
    const { result } = renderHook(() =>
      useWheelEvent(
        INITIAL_COORDINATES,
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
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 0, y: 0, z: 0.9 });
  });

  it(`should zoom in`, () => {
    // before
    const { result } = renderHook(() =>
      useWheelEvent(
        INITIAL_COORDINATES,
        mockCallBack,
        ref as RefObject<HTMLDivElement>,
      ),
    );

    // action
    result.current({
      clientX: 0,
      clientY: 0,
      ctrlKey: true,
      deltaY: -1,
    } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 0, y: 0, z: 1.1 });
  });

  it(`should zoom with change position`, () => {
    // before
    const { result } = renderHook(() =>
      useWheelEvent(
        INITIAL_COORDINATES,
        mockCallBack,
        ref as RefObject<HTMLDivElement>,
      ),
    );

    // action
    result.current({
      clientX: 100,
      clientY: 100,
      ctrlKey: true,
      deltaY: 1,
    } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({
      x: 9.999999999999998,
      y: 9.999999999999998,
      z: 0.9,
    });
  });
});
