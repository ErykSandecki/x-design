// others
import { colors } from 'constant/colors';

// types
import { ColorsTheme } from 'types';

// utils
import { mappingBordersColors } from '../mappingBordersColors';

describe('mappingBordersColors', () => {
  it('should return border colors', () => {
    // mock
    const blue1 = colors.blue1;

    // before
    const result = mappingBordersColors({
      borderColor: ColorsTheme.blue1,
      borderColorBottom: ColorsTheme.blue1,
      borderColorLeft: ColorsTheme.blue1,
      borderColorRight: ColorsTheme.blue1,
      borderColorTop: ColorsTheme.blue1,
    });

    // result
    expect(result).toBe(
      `border-color: ${blue1};\nborder-color-bottom: ${blue1};\nborder-color-left: ${blue1};\nborder-color-right: ${blue1};\nborder-color-top: ${blue1};`,
    );
  });

  it('should return empty data', () => {
    // before
    const result = mappingBordersColors({});

    // result
    expect(result).toBe('');
  });
});
