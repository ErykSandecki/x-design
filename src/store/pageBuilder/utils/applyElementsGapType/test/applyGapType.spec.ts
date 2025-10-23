// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { applyGapType } from '../applyGapType';

describe('applyGapType', () => {
  it(`should apply fixed`, () => {
    // before
    const result = applyGapType(elementMock, 'column', 100, 'fixed');

    // result
    expect(result.value).toBe(100);
  });
});
