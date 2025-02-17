// utils
import { mappingSpacings } from '../mappingSpacings';

describe('mappingSpacings', () => {
  it('should return spacing styles', () => {
    // before
    const result = mappingSpacings({
      m: 0,
      mb: 0,
      ml: 0,
      mr: 0,
      mt: 0,
      mx: 0,
      my: 0,
      p: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      pt: 0,
      px: 0,
      py: 0,
    });

    // result
    expect(result).toBe(
      `margin: 0px;\nmargin-bottom: 0px;\nmargin-left: 0px;\nmargin-right: 0px;\nmargin-top: 0px;\nmargin-left: 0px;\nmargin-right: 0px;\nmargin-top: 0px;\nmargin-bottom: 0px;\npadding: 0px;\npadding-bottom: 0px;\npaddng-left: 0px;\npadding-right: 0px;\npadding-top: 0px;\npadding-left: 0px;\npadding-right: 0px;\npadding-top: 0px;\npadding-bottom: 0px;`,
    );
  });

  it('should return empty data', () => {
    // before
    const result = mappingSpacings({});

    // result
    expect(result).toBe('');
  });
});
