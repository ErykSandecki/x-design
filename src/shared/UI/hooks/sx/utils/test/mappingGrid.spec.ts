// utils
import { mappingGrid } from '../mappingGrid';

describe('mappingGrid', () => {
  it('should return grid styles', () => {
    // before
    const result = mappingGrid({
      columnGap: 1,
      gap: 1,
      gridArea: 'auto',
      gridAutoColumns: 1,
      gridAutoFlow: 'column',
      gridAutoRows: 1,
      gridColumn: 1,
      gridRow: 'auto',
      gridTemplateAreas: 'revert',
      gridTemplateColumns: 1,
      gridTemplateRows: 1,
      rowGap: 1,
    });

    // result
    expect(result).toBe(
      `display: grid;\ngap: 1;\ncolumn-gap: 1;\nrow-gap: 1;\ngrid-column: 1;\ngrid-row: auto;\ngrid-auto-flow: column;\ngrid-auto-columns: 1;\ngrid-auto-rows: 1;\ngrid-template-columns: 1;\ngrid-template-rows: 1;\ngrid-template-areas: revert;\ngrid-area: auto;`,
    );
  });

  it('should return empty data', () => {
    // before
    const result = mappingGrid({});

    // result
    expect(result).toBe('');
  });
});
