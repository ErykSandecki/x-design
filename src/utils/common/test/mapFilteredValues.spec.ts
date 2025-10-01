// utils
import { mapFilteredValues } from '../mapFilteredValues';

describe('mapFilteredValues', () => {
  it('should return filtered values', () => {
    // before
    const result = mapFilteredValues({ a: 10, b: 10, c: 10 }, ['a', 'b'], (value) => value);

    // result
    expect(result).toStrictEqual({ a: 10, b: 10 });
  });
});
