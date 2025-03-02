// utils
import { generateID } from '../generateID';

describe('generateID', () => {
  it('should contains date time in id', () => {
    // before
    const result = generateID();

    // result
    expect(result.includes('11577836800000')).toBe(true);
  });
});
