// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { elementDataSelectorCreator } from '../../selectors';

describe('elementDataSelectorCreator', () => {
  it('should find item', () => {
    // before
    const selectorFunction = (elementDataSelectorCreator(elementMock.id) as any).resultFunc;

    // result
    expect(selectorFunction({ [elementMock.id]: elementMock })).toStrictEqual(elementMock);
  });

  it('should not find item', () => {
    // before
    const selectorFunction = (elementDataSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction({ [elementMock.id]: elementMock })).toBe(undefined);
  });
});
