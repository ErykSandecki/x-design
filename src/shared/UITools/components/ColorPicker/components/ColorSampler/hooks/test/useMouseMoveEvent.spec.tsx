import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// utils
import { sleep } from 'test';

const mockCallBack = jest.fn();

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: (callback: any) => (value: any) => callback(value),
}));

jest.mock('../../utils/extractColors', () => ({
  extractColors: async () => new Promise((resolve) => resolve([])),
}));

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, async () => {
    // before
    renderHook(() =>
      useMouseMoveEvent(mockCallBack, mockCallBack, mockCallBack),
    );

    // action
    fireEvent.mouseMove(window, { clientX: 0, clientY: 0 });

    // wait
    await sleep(100);

    // result
    expect(mockCallBack.mock.calls.length).toBe(4);
  });
});
