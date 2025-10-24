import { MouseEvent } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useClickEvent } from '../useClickEvent';

const mockCallBack = jest.fn();

describe('useClickEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() => useClickEvent(mockCallBack, false, mockCallBack));

    // action
    result.current({} as MouseEvent<HTMLButtonElement>);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should trigger only one event`, () => {
    // before
    const { result } = renderHook(() => useClickEvent(undefined, false, mockCallBack));

    // action
    result.current({} as MouseEvent<HTMLButtonElement>);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
