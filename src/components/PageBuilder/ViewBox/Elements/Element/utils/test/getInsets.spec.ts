// mocks
import { insetsMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { getInsets } from '../getInsets';

describe('getInsets', () => {
  it(`should return insets`, () => {
    // before
    const result = getInsets(insetsMock);

    // result
    expect(result).toBe('0px 0px 0px 0px');
  });
});
