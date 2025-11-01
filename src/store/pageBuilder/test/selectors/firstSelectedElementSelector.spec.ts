// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { firstSelectedElementIdSelector } from '../../selectors';

describe('firstSelectedElementIdSelector', () => {
  it('should return undefined', () => {
    // before
    const selectorFunction = (firstSelectedElementIdSelector as any).resultFunc;

    // result
    expect(selectorFunction([])).toBe(undefined);
  });

  it('should not anyone be selected', () => {
    // before
    const selectorFunction = (firstSelectedElementIdSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock])).toBe(selectedElementMock.id);
  });
});
