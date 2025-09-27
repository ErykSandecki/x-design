import { renderHook } from '@testing-library/react';

// hooks
import { useHandleInitialValue } from '../useHandleInitialValue';

const mockCallBack = jest.fn();

describe('useHandleInitialValue', () => {
  it(`should return data`, () => {
    // before
    renderHook(() => useHandleInitialValue('', false, mockCallBack));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('');
  });
});
