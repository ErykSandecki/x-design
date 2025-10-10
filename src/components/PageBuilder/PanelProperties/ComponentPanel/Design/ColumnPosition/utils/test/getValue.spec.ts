// utils
import { getValue } from '../getValue';

describe('getValue', () => {
  it(`should return Locked`, () => {
    // before
    const result = getValue(true, false, false, '');

    // result
    expect(result).toBe('Locked');
  });

  it(`should return Mixed`, () => {
    // before
    const result = getValue(false, true, true, '');

    // result
    expect(result).toBe('Mixed');
  });

  it(`should return auto`, () => {
    // before
    const result = getValue(false, true, false, '');

    // result
    expect(result).toBe('auto');
  });

  it(`should return value`, () => {
    // before
    const result = getValue(false, false, false, 'value');

    // result
    expect(result).toBe('value');
  });
});
