// utils
import { toggleBodyScroll } from '../toggleBodyScroll';

describe('toggleBodyScroll', () => {
  it('should set property for body', () => {
    // before
    toggleBodyScroll('hidden');

    // result
    expect(document.body.style.overflow).toBe('hidden');
  });
});
