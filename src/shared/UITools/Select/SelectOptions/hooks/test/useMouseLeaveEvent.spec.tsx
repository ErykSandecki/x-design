import { renderHook } from '@testing-library/react';

// hooks
import { useMouseLeaveEvent } from '../useMouseLeaveEvent';

const mockCallBack = jest.fn();

describe('useMouseLeaveEvent', () => {
  it(`should trigger event`, () => {
    // mock
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;

    // before
    const { result } = renderHook(() => useMouseLeaveEvent(mockCallBack));

    // action
    result.current({ target: { getAttribute: () => 'value', tagName: 'LI' } } as any);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('value');
  });

  it(`should not trigger event`, () => {
    // mock
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;

    // before
    const { result } = renderHook(() => useMouseLeaveEvent(undefined));

    // action
    result.current({ target: { getAttribute: () => 'value', tagName: 'LI' } } as any);

    // result
    expect(mockCallBack.mock.calls[0]).toBe(undefined);
  });
});
