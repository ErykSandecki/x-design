// utils
import { getCssVariable } from '../getCssVariable';

describe('getCssVariable', () => {
  it('should return css schema for style', () => {
    // before
    const result = getCssVariable('--xd-blue-1-dark');

    // result
    expect(result).toBe('var(--xd-blue-1-dark)');
  });
});
