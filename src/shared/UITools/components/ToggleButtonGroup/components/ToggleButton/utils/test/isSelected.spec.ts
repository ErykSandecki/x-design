// utils
import { isSelected } from '../isSelected';

describe('isSelected', () => {
  it('should return false when values are not the same', () => {
    // mock
    const currentValue = 'currentValue';
    const value = 'value';

    // before
    const result = isSelected(currentValue, value);

    // result
    expect(result).toBe(false);
  });

  it('should return false when value is not included in array', () => {
    // mock
    const currentValue = ['currentValue'];
    const value = 'value';

    // before
    const result = isSelected(currentValue, value);

    // result
    expect(result).toBe(false);
  });

  it('should return true when values are the same', () => {
    // mock
    const currentValue = 'value';
    const value = 'value';

    // before
    const result = isSelected(currentValue, value);

    // result
    expect(result).toBe(true);
  });

  it('should return true when value is included in array', () => {
    // mock
    const currentValue = ['value'];
    const value = 'value';

    // before
    const result = isSelected(currentValue, value);

    // result
    expect(result).toBe(true);
  });
});
