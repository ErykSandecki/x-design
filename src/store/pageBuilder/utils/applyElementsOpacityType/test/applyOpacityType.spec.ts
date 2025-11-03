// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { applyOpacityType } from '../applyOpacityType';

describe('applyOpacityType', () => {
  it(`should apply fixed`, () => {
    // before
    const result = applyOpacityType(elementMock, 'fixed');

    // result
    expect(result).toStrictEqual({ mode: 'fixed', value: 100 });
  });
});
