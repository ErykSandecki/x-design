// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { firstSelectedElementParentIdSelector } from '../../selectors';

describe('firstSelectedElementParentIdSelector', () => {
  it('should return undefined', () => {
    // before
    const selectorFunction = (firstSelectedElementParentIdSelector as any).resultFunc;

    // result
    expect(selectorFunction([])).toBe(undefined);
  });

  it('should not anyone be selected', () => {
    // before
    const selectorFunction = (firstSelectedElementParentIdSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock])).toBe(selectedElementMock.parentId);
  });
});
