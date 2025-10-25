// utils
import { getBoxSizing } from '../getBoxSizing';

describe('getBoxSizing', () => {
  it(`should return for included`, () => {
    // before
    const result = getBoxSizing('included');

    // result
    expect(result).toBe('border-box');
  });

  it(`should return for excluded`, () => {
    // before
    const result = getBoxSizing('excluded');

    // result
    expect(result).toBe('content-box');
  });
});
