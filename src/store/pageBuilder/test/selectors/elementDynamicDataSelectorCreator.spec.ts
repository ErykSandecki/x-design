// mocks
import { elementDynamicDataMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { elementDynamicDataSelectorCreator } from '../../selectors';

describe('elementDynamicDataSelectorCreator', () => {
  it('should find item', () => {
    // before
    const selectorFunction = (
      elementDynamicDataSelectorCreator(elementDynamicDataMock.id) as any
    ).resultFunc;

    // result
    expect(selectorFunction([elementDynamicDataMock])).toStrictEqual(
      elementDynamicDataMock,
    );
  });

  it('should not find item', () => {
    // before
    const selectorFunction = (elementDynamicDataSelectorCreator('-1') as any)
      .resultFunc;

    // result
    expect(selectorFunction([elementDynamicDataMock])).toBe(undefined);
  });
});
