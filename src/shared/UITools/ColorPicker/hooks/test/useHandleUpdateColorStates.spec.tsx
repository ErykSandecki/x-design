import { renderHook } from '@testing-library/react';

// hooks
import { useHandleUpdateColorStates } from '../useHandleUpdateColorStates';

const mockCallBack = jest.fn();

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce:
    (callback: any) =>
    (...args: any): any =>
      callback(...args),
}));

describe('useHandleUpdateColorStates', () => {
  it(`should trigger change states for data entry`, () => {
    // before
    renderHook(() => useHandleUpdateColorStates('100', '#ffffff', mockCallBack, mockCallBack));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0]).toBe('ffffff');
  });
});
