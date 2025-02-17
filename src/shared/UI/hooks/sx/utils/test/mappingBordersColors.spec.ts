// others
import { THEME_COLORS } from 'constant/themeColors';

// types
import { ColorsTheme, Theme } from 'types';

// utils
import { mappingBordersColors } from '../mappingBordersColors';

describe('mappingBordersColors', () => {
  it('should return border colors in dark mode', () => {
    // mock
    const blue1 = THEME_COLORS[Theme.dark].blue1;

    // before
    const result = mappingBordersColors(
      {
        borderColor: ColorsTheme.blue1,
        borderColorBottom: ColorsTheme.blue1,
        borderColorLeft: ColorsTheme.blue1,
        borderColorRight: ColorsTheme.blue1,
        borderColorTop: ColorsTheme.blue1,
      },
      Theme.dark,
    );

    // result
    expect(result).toBe(
      `border-color: ${blue1};\nborder-color-bottom: ${blue1};\nborder-color-left: ${blue1};\nborder-color-right: ${blue1};\nborder-color-top: ${blue1};`,
    );
  });

  it('should return border colors in light mode', () => {
    // mock
    const blue1 = THEME_COLORS[Theme.light].blue1;

    // before
    const result = mappingBordersColors(
      {
        borderColor: ColorsTheme.blue1,
        borderColorBottom: ColorsTheme.blue1,
        borderColorLeft: ColorsTheme.blue1,
        borderColorRight: ColorsTheme.blue1,
        borderColorTop: ColorsTheme.blue1,
      },
      Theme.light,
    );

    // result
    expect(result).toBe(
      `border-color: ${blue1};\nborder-color-bottom: ${blue1};\nborder-color-left: ${blue1};\nborder-color-right: ${blue1};\nborder-color-top: ${blue1};`,
    );
  });

  it('should return empty data', () => {
    // before
    const result = mappingBordersColors({}, Theme.dark);

    // result
    expect(result).toBe('');
  });
});
