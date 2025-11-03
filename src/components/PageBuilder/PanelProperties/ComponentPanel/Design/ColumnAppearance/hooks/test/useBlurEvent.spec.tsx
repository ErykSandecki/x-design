import { renderHook } from '@testing-library/react';

// hooks
import { useBlurEvent } from '../useBlurEvent';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useBlurEvent', () => {
  it(`should trigger blur height`, () => {
    // before
    const { result } = renderHook(() => useBlurEvent({ type: 'fixed', value: 100 }, '1', mockCallBack));

    // action
    result.current.onBlurOpacity();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({ opacity: { type: 'fixed', value: 1 } });
  });

  it(`should reset opacity`, () => {
    // before
    const { result } = renderHook(() => useBlurEvent({ type: 'fixed', value: 100 }, '', mockCallBack));

    // action
    result.current.onBlurOpacity();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });
});
