// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { anySelectedElementSelector } from '../../selectors';

describe('anySelectedElementSelector', () => {
  it('should any be selected', () => {
    // before
    const selectorFunction = (anySelectedElementSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock])).toBe(true);
  });

  it('should not anyone be selected', () => {
    // before
    const selectorFunction = (anySelectedElementSelector as any).resultFunc;

    // result
    expect(selectorFunction([])).toBe(false);
  });
});
