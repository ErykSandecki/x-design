import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useSelectOptionsEvents } from '../useSelectOptionsEvents';

const mockCallBack = jest.fn();
const optionsRef = { current: { getBoundingClientRect: () => ({ height: 100 }) } } as RefObject<HTMLDivElement>;
const wrapperRef = {
  current: { getBoundingClientRect: () => ({ width: 100, x: 0, y: 0 }) },
} as RefObject<HTMLDivElement>;

describe('useSelectOptionsEvents', () => {
  it(`should return data`, () => {
    // mock
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;

    // before
    const { result } = renderHook(() =>
      useSelectOptionsEvents(mockCallBack, mockCallBack, optionsRef, false, '', wrapperRef),
    );

    // result
    expect(result.current).toStrictEqual({
      onMouseEnter: expect.any(Function),
      onMouseLeave: expect.any(Function),
      style: { left: '0px', top: '24px', width: 100 },
    });
  });
});
