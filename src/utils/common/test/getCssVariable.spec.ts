// others
import { cssVariables } from 'constant/cssVariables';

// utils
import { getCssVariable } from '../getCssVariable';

describe('getCssVariable', () => {
  it('should return css schema for style', () => {
    // before
    const result = getCssVariable(cssVariables.XD_BLUE_1_DARK);

    // result
    expect(result).toBe(`var(${cssVariables.XD_BLUE_1_DARK})`);
  });
});
