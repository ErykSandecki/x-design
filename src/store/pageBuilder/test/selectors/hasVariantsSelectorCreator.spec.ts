// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { hasVariantsSelectorCreator } from '../../selectors';

describe('hasVariantsSelectorCreator', () => {
  it('should has some variants', () => {
    // before
    const selectorFunction = (hasVariantsSelectorCreator('background', 'test-1') as any).resultFunc;

    // result
    expect(selectorFunction(elementMock.background)).toBe(true);
  });

  it('should doesnt have any variants', () => {
    // before
    const selectorFunction = (hasVariantsSelectorCreator('background', 'test-1') as any).resultFunc;

    // result
    expect(selectorFunction([])).toBe(false);
  });
});
