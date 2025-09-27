import { renderHook } from '@testing-library/react';

// hooks
import { useBlurColorEvent } from '../useBlurColorEvent';

const mockCallBack = jest.fn();

describe('useBlurColorEvent', () => {
  it(`should trigger on change when current value is valid`, () => {
    // before
    const { result } = renderHook(() => useBlurColorEvent('100', 'ffffff', '000000', mockCallBack, mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[0][1]).toBe('#000000');
  });

  it(`should use default value when hex is not valid`, () => {
    // before
    const { result } = renderHook(() => useBlurColorEvent('100', 'ffffff', '', mockCallBack, mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('ffffff');
  });
});
