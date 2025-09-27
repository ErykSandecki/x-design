// types
import { ZIndex } from 'types/enums/scss/zIndex';

// utils
import { mappingPositions } from '../mappingPositions';

describe('mappingPositions', () => {
  it('should return position styles', () => {
    // before
    const result = mappingPositions({
      bottom: 0,
      left: 0,
      overflow: 'auto',
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: ZIndex.dropdown,
    });

    // result
    expect(result).toBe(`bottom: 0;\nleft: 0;\nposition: absolute;\noverflow: auto;\nright: 0;\ntop: 0;\nz-index: 4;`);
  });

  it('should return add position relative when zIndex passed', () => {
    // before
    const result = mappingPositions({
      zIndex: ZIndex.dropdown,
    });

    // result
    expect(result).toBe(`position: relative;\nz-index: 4;`);
  });

  it('should return empty data', () => {
    // before
    const result = mappingPositions({});

    // result
    expect(result).toBe('');
  });
});
