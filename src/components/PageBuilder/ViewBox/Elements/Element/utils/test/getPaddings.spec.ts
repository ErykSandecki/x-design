// mocks
import { insetsMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { getPaddings } from '../getPaddings';

describe('getPaddings', () => {
  it(`should return paddings`, () => {
    // before
    const result = getPaddings(insetsMock);

    // result
    expect(result).toBe('0px 0px 0px 0px');
  });
});
