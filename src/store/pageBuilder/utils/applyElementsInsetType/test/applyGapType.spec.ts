// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { applyInsetType } from '../applyInsetType';

describe('applyInsetType', () => {
  it(`should apply fixed`, () => {
    // before
    const result = applyInsetType(elementMock, 'b', 100, 'padding', 'fixed');

    // result
    expect(result.value).toBe(100);
  });
});
