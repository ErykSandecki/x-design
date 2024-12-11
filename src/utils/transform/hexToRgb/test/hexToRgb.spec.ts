// utils
import { hexToRgb } from '../hexToRgb';

describe('hexToRgb', () => {
  it('Should return rgb value', () => {
    // before
    const result = hexToRgb('#000000');

    // result
    expect(result).toStrictEqual({ b: 0, g: 0, r: 0 });
  });

  it('Should return null', () => {
    // before
    const result = hexToRgb();

    // result
    expect(result).toBe(null);
  });
});
