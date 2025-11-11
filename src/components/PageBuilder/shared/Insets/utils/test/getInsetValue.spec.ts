// mocks
import { insetsMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { getInsetValue } from '../getInsetValue';

describe('getInsetValue', () => {
  it(`should return single value`, () => {
    // before
    const result = getInsetValue(insetsMock, ['l', 'r']);

    // result
    expect(result).toBe('0');
  });

  it(`should return separeted value`, () => {
    // before
    const result = getInsetValue({ ...insetsMock, r: { mode: 'fixed', value: 1 } }, ['l', 'r']);

    // result
    expect(result).toBe('0, 1');
  });
});
