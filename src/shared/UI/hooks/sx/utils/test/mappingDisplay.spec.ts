// utils
import { mappingDisplay } from '../mappingDisplay';

describe('mappingDisplay', () => {
  it('should return display styles', () => {
    // before
    const result = mappingDisplay({
      display: 'block',
      overflow: 'auto',
      textOverflow: 'clip',
      visibility: 'collapse',
      whiteSpace: 'balance',
    });

    // result
    expect(result).toBe(
      `display: block;\noverflow: auto;\ntext-overflow: clip;\nvisibility: collapse;\nwhite-space: balance;`,
    );
  });

  it('should return empty data', () => {
    // before
    const result = mappingDisplay({});

    // result
    expect(result).toBe('');
  });
});
