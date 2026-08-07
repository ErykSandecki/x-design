import { renderHook } from '@testing-library/react';

// hooks
import { useWheelEvent } from '../useWheelEvent';

describe('useWheelEvent', () => {
  it(`should prevent default`, () => {
    // mock
    const event = new WheelEvent('wheel', { ctrlKey: true });
    vi.spyOn(event, 'preventDefault');

    // before
    renderHook(() => useWheelEvent());

    // action
    document.dispatchEvent(event);

    // result
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it(`should not prevent default`, () => {
    // mock
    const event = new WheelEvent('wheel', {});
    vi.spyOn(event, 'preventDefault');

    // before
    renderHook(() => useWheelEvent());

    // action
    document.dispatchEvent(event);

    // result
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
