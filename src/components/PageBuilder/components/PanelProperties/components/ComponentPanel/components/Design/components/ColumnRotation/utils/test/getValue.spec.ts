// utils
import { getValue } from '../getValue';

describe('getValue', () => {
  it(`should return mixed`, () => {
    // before
    const result = getValue(true, '');

    // result
    expect(result).toBe('mixed');
  });

  it(`should return value`, () => {
    // before
    const result = getValue(false, '');

    // result
    expect(result).toBe('');
  });
});
