// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { pageBackgroundSelectorCreator } from '../../selectors';

describe('pageBackgroundSelectorCreator', () => {
  it('should return background', () => {
    // before
    const selectorFunction = (pageBackgroundSelectorCreator('-1') as any)
      .resultFunc;

    // result
    expect(
      selectorFunction(pageBuilderStateMock[PAGE_BUILDER].elements.allData),
    ).toStrictEqual(
      pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'].background,
    );
  });
});
