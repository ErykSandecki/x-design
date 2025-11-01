// mocks
import { elementMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { isMixedSelectorCreator } from '../../selectors';

describe('isMixedSelectorCreator', () => {
  it('should be mixed', () => {
    // before
    const selectorFunction = (isMixedSelectorCreator('clipContent') as any).resultFunc;

    // result
    expect(
      selectorFunction(
        { [elementMock.id]: elementMock, ['test-2']: { ...elementMock, clipContent: false, id: 'test-2' } },
        selectedElementMock,
        [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      ),
    ).toBe(true);
  });

  it('should not be mixed', () => {
    // before
    const selectorFunction = (isMixedSelectorCreator('clipContent') as any).resultFunc;

    // result
    expect(
      selectorFunction(
        { [elementMock.id]: elementMock, ['test-2']: { ...elementMock, id: 'test-2' } },
        selectedElementMock,
        [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      ),
    ).toBe(false);
  });
});
