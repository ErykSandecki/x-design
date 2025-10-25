import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useStyle } from '../useStyle';

const optionsRef = { current: { getBoundingClientRect: () => ({ height: 100 }) } } as RefObject<HTMLDivElement>;
const wrapperRef = {
  current: { getBoundingClientRect: () => ({ width: 100, x: 0, y: 0 }) },
} as RefObject<HTMLDivElement>;

describe('useStyle', () => {
  it(`should return style`, () => {
    // mock
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;

    // before
    const { result } = renderHook(() => useStyle(optionsRef, false, '', wrapperRef));

    // result
    expect(result.current).toStrictEqual({ left: '0px', top: '24px', width: 100 });
  });

  it(`should return style when is bigger than window size`, () => {
    // mock
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;

    // before
    const { result } = renderHook(() =>
      useStyle(optionsRef, false, '', {
        current: { getBoundingClientRect: () => ({ width: 100, x: 0, y: 1000 }) },
      } as RefObject<HTMLDivElement>),
    );

    // result
    expect(result.current).toStrictEqual({ bottom: 10, left: '0px', width: 100 });
  });
});
