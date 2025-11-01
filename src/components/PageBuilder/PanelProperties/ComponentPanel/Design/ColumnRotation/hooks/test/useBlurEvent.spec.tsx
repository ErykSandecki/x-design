import { renderHook } from '@testing-library/react';

// hooks
import { useBlurEvent } from '../useBlurEvent';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useBlurEvent', () => {
  it(`should trigger blur`, () => {
    // before
    const { result } = renderHook(() => useBlurEvent('0', 0, mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0°');
    expect(mockCallBack.mock.calls[1][0].payload).toBe(0);
  });

  it(`should reset angle`, () => {
    // before
    const { result } = renderHook(() => useBlurEvent('', 0, mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0°');
  });
});
