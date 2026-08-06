// others
import { colors } from 'constant/colors';

// types
import { ColorsTheme } from 'types';

// utils
import { mappingPallete } from '../mappingPallete';

describe('mappingPallete', () => {
  it('should return pallete styles', () => {
    // before
    const result = mappingPallete({ bg: ColorsTheme.blue1, cl: ColorsTheme.blue1 });

    // result
    expect(result).toBe(`color: ${colors.blue1};\nbackground-color: ${colors.blue1};`);
  });

  it('should return empty data', () => {
    // before
    const result = mappingPallete({});

    // result
    expect(result).toBe('');
  });
});
