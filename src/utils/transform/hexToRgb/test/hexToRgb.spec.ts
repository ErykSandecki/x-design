// utils
import { hexToRgb } from '../hexToRgb';

describe('hexToRgb', () => {
  it('Should return rgb value', () => {
    // before
    const result = hexToRgb('#000000');

    // result
    expect(result).toStrictEqual('rgba(0, 0, 0, 1)');
  });
});
