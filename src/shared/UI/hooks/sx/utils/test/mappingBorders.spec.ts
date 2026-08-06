// others
import { colors } from 'constant/colors';

// utils
import { mappingBorders } from '../mappingBorders';

describe('mappingBorders', () => {
  it('should return border', () => {
    // mock
    const color = colors.neutral3;
    const value1 = 1;
    const value2 = 2;

    // before
    const result = mappingBorders({
      border: value1,
      borderBottom: value2,
      borderLeft: value2,
      borderRight: value2,
      borderTop: value2,
    });

    // result
    expect(result).toBe(
      `border: ${value1}px solid ${color};\nborder-bottom: ${value2}px solid ${color};\nborder-left: ${value2}px solid ${color};\nborder-right: ${value2}px solid ${color};\nborder-top: ${value2}px solid ${color};`,
    );
  });

  it('should return substractive border', () => {
    // mock
    const color = colors.neutral3;
    const value1 = 0;
    const value2 = 1;

    // before
    const result = mappingBorders({
      borderBottom: value1,
    });

    // result
    expect(result).toBe(
      `border-left: ${value2}px solid ${color};\nborder-right: ${value2}px solid ${color};\nborder-top: ${value2}px solid ${color};`,
    );
  });

  it('should return substractive border', () => {
    // mock
    const color = colors.neutral3;
    const value1 = '0';
    const value2 = 1;

    // before
    const result = mappingBorders({
      borderBottom: value1,
    });

    // result
    expect(result).toBe(
      `border-left: ${value2}px solid ${color};\nborder-right: ${value2}px solid ${color};\nborder-top: ${value2}px solid ${color};`,
    );
  });

  it('should return empty data', () => {
    // before
    const result = mappingBorders({});

    // result
    expect(result).toBe('');
  });
});
