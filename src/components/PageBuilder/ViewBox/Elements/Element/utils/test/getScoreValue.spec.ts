// mocks
import { valueExtendMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { Unit } from 'types';

// utils
import { getScoreValue } from '../getScoreValue';

describe('getScoreValue', () => {
  it(`should return empty value`, () => {
    // before
    const result = getScoreValue(undefined);

    // result
    expect(result).toBe('');
  });

  it(`should return value`, () => {
    // before
    const result = getScoreValue(valueExtendMock);

    // result
    expect(result).toBe('0px');
  });

  it(`should return value with unit`, () => {
    // before
    const result = getScoreValue({ ...valueExtendMock, unit: Unit.percentage });

    // result
    expect(result).toBe('0%');
  });

  it(`should return auto`, () => {
    // before
    const result = getScoreValue({ ...valueExtendMock, mode: 'auto' });

    // result
    expect(result).toBe('auto');
  });
});
