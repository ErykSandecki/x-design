// utils
import { getPNGUrl } from '../utils';

describe('getPNGUrl', () => {
  it(`should return url`, () => {
    // before
    const result = getPNGUrl('cursorDefault');

    // result
    expect(result).toBe('url(cursorDefault), auto');
  });
});
