// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { filtredStaticDataSelectorCreator } from '../../selectors';

describe('filtredStaticDataSelectorCreator', () => {
  it('should return filtered static data', () => {
    // before
    const selectorFunction = (filtredStaticDataSelectorCreator('-1') as any)
      .resultFunc;

    // result
    expect(
      selectorFunction([], {
        allData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.allData,
        },
        dynamicData: {},
        staticData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData,
        },
      }),
    ).toStrictEqual([]);
  });
});
