// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { isSelectedElementSelectorCreator } from '../../selectors';

describe('isSelectedElementSelectorCreator', () => {
  it('should be selected', () => {
    // before
    const selectorFunction = (isSelectedElementSelectorCreator(selectedElementMock.id) as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock])).toBe(true);
  });

  it('should be not selected', () => {
    // before
    const selectorFunction = (isSelectedElementSelectorCreator(selectedElementMock.id) as any).resultFunc;

    // result
    expect(selectorFunction([])).toBe(false);
  });
});
