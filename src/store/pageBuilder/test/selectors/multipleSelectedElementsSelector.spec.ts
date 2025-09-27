// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { multipleSelectedElementsSelector } from '../../selectors';

describe('multipleSelectedElementsSelector', () => {
  it('should be multiple', () => {
    // before
    const selectorFunction = (multipleSelectedElementsSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock, selectedElementMock])).toBe(true);
  });

  it('should not be multiple', () => {
    // before
    const selectorFunction = (multipleSelectedElementsSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock])).toBe(false);
  });
});
