// mocks
import { backgroundMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { getBackground } from '../getBackground';

describe('getBackground', () => {
  it(`should return background`, () => {
    // before
    const result = getBackground(backgroundMock);

    // result
    expect(result).toBe('linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))');
  });
});
