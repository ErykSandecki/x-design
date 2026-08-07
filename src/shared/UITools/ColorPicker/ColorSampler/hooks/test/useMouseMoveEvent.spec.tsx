import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_2D } from 'shared/ZoomBox/constants';

// utils
import { sleep } from 'test';

const mockCallBack = vi.fn();

vi.mock('lodash', async (importOriginal) => ({
  ...((await importOriginal()) as any).default,
  throttle:
    (callback: any) =>
    (value: any): any =>
      callback(value),
}));

vi.mock('../../utils/extractColors', () => ({
  extractColors: async (): Promise<any> => new Promise((resolve) => resolve([])),
}));

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, async () => {
    // before
    renderHook(() => useMouseMoveEvent(BASE_2D, mockCallBack, mockCallBack, mockCallBack));

    // action
    fireEvent.mouseMove(window, { clientX: 0, clientY: 0 });

    // wait
    await sleep(100);

    // result
    expect(mockCallBack.mock.calls.length).toBe(4);
  });
});
