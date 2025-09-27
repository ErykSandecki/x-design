// others
import { THEME_COLORS } from 'constant/themeColors';

// types
import { ColorsTheme, Theme } from 'types';

// utils
import { mappingPallete } from '../mappingPallete';

describe('mappingPallete', () => {
  it('should return pallete styles in dark mode', () => {
    // mock
    const color = THEME_COLORS[Theme.dark][ColorsTheme.blue1];

    // before
    const result = mappingPallete({ bg: ColorsTheme.blue1, cl: ColorsTheme.blue1 }, Theme.dark);

    // result
    expect(result).toBe(`color: ${color};\nbackground-color: ${color};`);
  });

  it('should return pallete styles in light mode', () => {
    // mock
    const color = THEME_COLORS[Theme.light][ColorsTheme.blue1];

    // before
    const result = mappingPallete({ bg: ColorsTheme.blue1, cl: ColorsTheme.blue1 }, Theme.light);

    // result
    expect(result).toBe(`color: ${color};\nbackground-color: ${color};`);
  });

  it('should return empty data', () => {
    // before
    const result = mappingPallete({}, Theme.dark);

    // result
    expect(result).toBe('');
  });
});
