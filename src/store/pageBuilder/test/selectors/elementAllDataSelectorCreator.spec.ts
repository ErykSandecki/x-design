// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { elementAllDataSelectorCreator } from '../../selectors';

describe('elementAllDataSelectorCreator', () => {
  it('should find item', () => {
    // before
    const selectorFunction = (elementAllDataSelectorCreator(elementAllDataMock.id) as any).resultFunc;

    // result
    expect(selectorFunction({ [elementAllDataMock.id]: elementAllDataMock })).toStrictEqual(elementAllDataMock);
  });

  it('should not find item', () => {
    // before
    const selectorFunction = (elementAllDataSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction({ [elementAllDataMock.id]: elementAllDataMock })).toBe(undefined);
  });
});
