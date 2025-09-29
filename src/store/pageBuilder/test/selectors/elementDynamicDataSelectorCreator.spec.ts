// mocks
import { elementDynamicDataMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { elementDataSelectorCreator } from '../../selectors';

describe('elementDataSelectorCreator', () => {
  it('should find item', () => {
    // before
    const selectorFunction = (elementDataSelectorCreator(elementDynamicDataMock.id) as any).resultFunc;

    // result
    expect(selectorFunction({ [elementDynamicDataMock.id]: elementDynamicDataMock })).toStrictEqual(
      elementDynamicDataMock,
    );
  });

  it('should not find item', () => {
    // before
    const selectorFunction = (elementDataSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction({ [elementDynamicDataMock.id]: elementDynamicDataMock })).toBe(undefined);
  });
});
