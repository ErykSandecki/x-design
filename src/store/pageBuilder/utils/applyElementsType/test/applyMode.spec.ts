// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { applyMode } from '../applyMode';

describe('applyMode', () => {
  it(`should apply mode`, () => {
    // before
    const result = applyMode(elementMock, 'fixed', 'opacity');

    // result
    expect(result).toStrictEqual({ mode: 'fixed', value: 100 });
  });
});
