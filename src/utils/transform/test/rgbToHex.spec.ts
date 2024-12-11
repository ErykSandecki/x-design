// utils
import { rgbToHex } from '../rgbToHex';

describe('rgbToHex', () => {
  it('should return hex value', () => {
    // before
    const result = rgbToHex(0, 0, 0);

    // result
    expect(result).toEqual('#000000');
  });

  it('should return hex value', () => {
    // before
    const result = rgbToHex(100, 100, 100);

    // result
    expect(result).toEqual('#646464');
  });
});
