// utils
import { mappingSizing } from '../mappingSizing';

describe('mappingSizing', () => {
  it('should return sizing styles', () => {
    // before
    const result = mappingSizing({
      boxSizing: 'border-box',
      height: 0,
      maxHeight: 0,
      maxWidth: 0,
      minHeight: 0,
      minWidth: 0,
      width: 0,
    });

    // result
    expect(result).toBe(
      `box-sizing: border-box;\nheight: 0;\nmax-height: 0;\nmin-height: 0;\nmax-width: 0;\nmin-width: 0;\nwidth: 0;`,
    );
  });

  it('should return empty data', () => {
    // before
    const result = mappingSizing({});

    // result
    expect(result).toBe('');
  });
});
