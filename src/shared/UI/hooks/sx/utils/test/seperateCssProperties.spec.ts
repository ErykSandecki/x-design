// utils
import { seperateCssProperties } from '../utils';

describe('mappingSpacings', () => {
  it('should return seperated properties', () => {
    // before
    const result = seperateCssProperties('p;p');

    // result
    expect(result).toStrictEqual(['p', 'p']);
  });
});
