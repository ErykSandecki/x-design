// utils
import { getScrubbableInputValue } from '../getScrubbableInputValue';

describe('getScrubbableInputValue', () => {
  it(`should return default value`, () => {
    // before
    const result = getScrubbableInputValue('0', 0, false, ['l', 'r'], '0');

    // result
    expect(result).toStrictEqual({ valueInput: '0', valueStore: { l: 0, r: 0 } });
  });

  it(`should return default value`, () => {
    // before
    const result = getScrubbableInputValue('0', 0, true, ['l', 'r'], '0');

    // result
    expect(result).toStrictEqual({ valueInput: '0', valueStore: { l: 0, r: 0 } });
  });

  it(`should extract value when two are`, () => {
    // before
    const result = getScrubbableInputValue('3, 1', 2, true, ['l', 'r'], '3, 1');

    // result
    expect(result).toStrictEqual({ valueInput: '3, 2', valueStore: { l: 3, r: 2 } });
  });

  it(`should extract value when two are`, () => {
    // before
    const result = getScrubbableInputValue('-1, 1', 2, true, ['l', 'r'], '-1, 1');

    // result
    expect(result).toStrictEqual({ valueInput: '-1, -2', valueStore: { l: -1, r: -2 } });
  });
});
