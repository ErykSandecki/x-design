import { MouseEvent } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useClickEvent } from '../useClickEvent';

const mockCallBack = jest.fn();

describe('useClickEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() => useClickEvent(false, mockCallBack, false, mockCallBack));

    // action
    result.current({} as MouseEvent<HTMLButtonElement>);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should not trigger any event`, () => {
    // before
    const { result } = renderHook(() => useClickEvent(true, undefined, false, mockCallBack));

    // action
    result.current({} as MouseEvent<HTMLButtonElement>);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
