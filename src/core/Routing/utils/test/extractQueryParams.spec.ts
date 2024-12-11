import { Location } from 'history';

// utils
import { extractQueryParams } from '../extractQueryParams';

describe('extractQueryParams', () => {
  it('should extract query params', () => {
    // before
    const result = extractQueryParams({
      search: '/param=1&param2=2',
    } as Location);

    // result
    expect(result).toEqual({ param: '1', param2: '2' });
  });
});
