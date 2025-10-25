import { renderHook } from '@testing-library/react';

// hooks
import { useMouseEnterEvent } from '../useMouseEnterEvent';

const mockCallBack = jest.fn();

describe('useMouseEnterEvent', () => {
  it(`should trigger event`, () => {
    // mock
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;

    // before
    const { result } = renderHook(() => useMouseEnterEvent(mockCallBack));

    // action
    result.current({ target: { getAttribute: () => 'value', tagName: 'LI' } } as any);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('value');
  });

  it(`should not trigger event`, () => {
    // mock
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;

    // before
    const { result } = renderHook(() => useMouseEnterEvent(undefined));

    // action
    result.current({ target: { getAttribute: () => 'value', tagName: 'LI' } } as any);

    // result
    expect(mockCallBack.mock.calls[0]).toBe(undefined);
  });
});
