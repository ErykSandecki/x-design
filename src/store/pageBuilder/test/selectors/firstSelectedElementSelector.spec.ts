// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { firstSelectedElementSelector } from '../../selectors';

describe('firstSelectedElementSelector', () => {
  it('should return undefined', () => {
    // before
    const selectorFunction = (firstSelectedElementSelector as any).resultFunc;

    // result
    expect(selectorFunction([])).toBe(undefined);
  });

  it('should not anyone be selected', () => {
    // before
    const selectorFunction = (firstSelectedElementSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock])).toBe(selectedElementMock);
  });
});
