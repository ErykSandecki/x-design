// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { elementAttributeNestedSelectorCreator } from '../../selectors';

describe('elementAttributeNestedSelectorCreator', () => {
  it('should get attribute', () => {
    // before
    const selectorFunction = (elementAttributeNestedSelectorCreator('coordinates.x', elementMock.id) as any).resultFunc;

    // result
    expect(selectorFunction(elementMock)).toBe(0);
  });
});
