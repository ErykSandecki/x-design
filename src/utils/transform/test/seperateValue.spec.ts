// utils
import { seperateValue } from '../seperateValue';

describe('seperateValue', () => {
  it('should return separeted value with spaces', () => {
    // before
    const result = seperateValue(' ', 3, 10000);

    // result
    expect(result).toBe('10 000');
  });

  it('should return separeted value with comma', () => {
    // before
    const result = seperateValue(',', 3, 10000);

    // result
    expect(result).toBe('10,000');
  });

  it('should return separeted value with value after comma', () => {
    // before
    const result = seperateValue(',', 3, '10.000');

    // result
    expect(result).toBe('10.000');
  });
});
