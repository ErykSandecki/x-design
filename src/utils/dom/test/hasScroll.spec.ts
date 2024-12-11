import { MutableRefObject } from 'react';

// utils
import { hasScroll } from '../hasScroll';

describe('hasScroll', () => {
  it('should has scroll', () => {
    // mock
    const ref = { current: {} };

    window.getComputedStyle = () =>
      ({ height: '1000px' }) as CSSStyleDeclaration;

    // before
    const result = hasScroll(ref);

    // result
    expect(result).toBe(true);
  });

  it('should has not scroll', () => {
    // mock
    const ref = { current: {} };

    window.getComputedStyle = () =>
      ({ height: '100px' }) as CSSStyleDeclaration;

    // before
    const result = hasScroll(ref);

    // result
    expect(result).toBe(false);
  });

  it('should return default value', () => {
    // mock
    const ref = {};

    window.getComputedStyle = () =>
      ({ height: '100px' }) as CSSStyleDeclaration;

    // before
    const result = hasScroll(ref as MutableRefObject<any>);

    // result
    expect(result).toBe(false);
  });
});
