import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_2D } from 'shared/ZoomBox/constants';

const mockCallBack = jest.fn();

describe('useMouseMoveEvent', () => {
  beforeAll(() => {
    // mock
    window.innerHeight = 1000;
    window.innerWidth = 1000;
  });

  it(`should triger event`, () => {
    // before
    renderHook(() =>
      useMouseMoveEvent(100, 0, false, BASE_2D, mockCallBack, mockCallBack, 0),
    );

    // action
    fireEvent.mouseMove(window, { movementX: 1, shiftKey: false });

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should triger event with bigger speed`, () => {
    // before
    renderHook(() =>
      useMouseMoveEvent(100, 0, false, BASE_2D, mockCallBack, mockCallBack, 0),
    );

    // action
    fireEvent.mouseMove(window, { movementX: 1, shiftKey: true });

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should not triger event`, () => {
    // before
    renderHook(() =>
      useMouseMoveEvent(100, 0, false, null, mockCallBack, mockCallBack, 0),
    );

    // action
    fireEvent.mouseMove(window, { movementX: 1, shiftKey: false });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should return min when max`, () => {
    // mock
    const mouseMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
      view: window,
    });
    Object.defineProperty(mouseMoveEvent, 'movementX', { value: 100 });

    // before
    renderHook(() =>
      useMouseMoveEvent(100, 0, true, BASE_2D, mockCallBack, mockCallBack, 100),
    );

    // action
    window.dispatchEvent(mouseMoveEvent);

    // result
    expect(mockCallBack.mock.calls[1][0]).toBe(0);
  });
});
