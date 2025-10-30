// utils
import { getScrubbableInputValue } from '../getScrubbableInputValue';

describe('getScrubbableInputValue', () => {
  it(`should return default value`, () => {
    // before
    const result = getScrubbableInputValue('0', 0, false, ['l', 'r'], '0');

    // result
    expect(result).toStrictEqual({ valueInput: '0', valueStore: { l: { value: 0 }, r: { value: 0 } } });
  });

  it(`should return default value`, () => {
    // before
    const result = getScrubbableInputValue('0', 0, true, ['l', 'r'], '0');

    // result
    expect(result).toStrictEqual({ valueInput: '0', valueStore: { l: { value: 0 }, r: { value: 0 } } });
  });

  it(`should extract value when two are`, () => {
    // before
    const result = getScrubbableInputValue('3, 1', 2, true, ['l', 'r'], '3, 1');

    // result
    expect(result).toStrictEqual({ valueInput: '3, 2', valueStore: { l: { value: 3 }, r: { value: 2 } } });
  });

  it(`should extract value when two are`, () => {
    // before
    const result = getScrubbableInputValue('-1, 1', 2, true, ['l', 'r'], '-1, 1');

    // result
    expect(result).toStrictEqual({ valueInput: '-1, -2', valueStore: { l: { value: -1 }, r: { value: -2 } } });
  });
});
