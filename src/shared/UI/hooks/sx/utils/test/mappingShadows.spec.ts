// types
import { BoxShadow } from 'types/enums/scss/boxShadow';

// utils
import { mappingShadows } from '../mappingShadows';

describe('mappingShadows', () => {
  it('should return box styles', () => {
    // before
    const result = mappingShadows({
      boxShadow: BoxShadow.boxShadow0,
    });

    // result
    expect(result).toBe(`box-shadow: none;`);
  });

  it('should return empty data', () => {
    // before
    const result = mappingShadows({});

    // result
    expect(result).toBe('');
  });
});
