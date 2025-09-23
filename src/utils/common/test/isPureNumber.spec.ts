// utils
import { isPureNumber } from '../isPureNumber';

describe('isPureNumber', () => {
  it('should be pure number', () => {
    // before
    const result = isPureNumber('100');

    // result
    expect(result).toBe(true);
  });

  it('should not be pure number', () => {
    // before
    const result = isPureNumber('100%');

    // result
    expect(result).toBe(false);
  });
});
