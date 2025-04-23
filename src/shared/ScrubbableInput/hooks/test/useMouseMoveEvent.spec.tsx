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
      useMouseMoveEvent(100, 0, BASE_2D, mockCallBack, mockCallBack, 0),
    );

    // action
    fireEvent.mouseMove(window, { movementX: 1, shiftKey: false });

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should triger event with bigger speed`, () => {
    // before
    renderHook(() =>
      useMouseMoveEvent(100, 0, BASE_2D, mockCallBack, mockCallBack, 0),
    );

    // action
    fireEvent.mouseMove(window, { movementX: 1, shiftKey: true });

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should not triger event`, () => {
    // before
    renderHook(() =>
      useMouseMoveEvent(100, 0, null, mockCallBack, mockCallBack, 0),
    );

    // action
    fireEvent.mouseMove(window, { movementX: 1, shiftKey: false });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
