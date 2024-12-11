// utils
import { toggleBodyUserSelect } from '../toggleBodyUserSelect';

describe('toggleBodyScroll', () => {
  it('should set property for body', () => {
    // before
    toggleBodyUserSelect('none');

    // result
    expect(document.body.style.userSelect).toBe('none');
  });
});
