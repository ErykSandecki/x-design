// utils
import { mappingBordersRadius } from '../mappingBordersRadius';

describe('mappingBordersRadius', () => {
  it('should return border radius in default unit', () => {
    // mock
    const value = 1;

    // before
    const result = mappingBordersRadius({
      borderRadius: value,
    });

    // result
    expect(result).toBe(`border-radius: ${value}px;`);
  });

  it('should return border radius with choosen unit', () => {
    // mock
    const value = '100%';

    // before
    const result = mappingBordersRadius({
      borderRadius: value,
    });

    // result
    expect(result).toBe(`border-radius: ${value};`);
  });

  it('should return empty data', () => {
    // before
    const result = mappingBordersRadius({});

    // result
    expect(result).toBe('');
  });
});
