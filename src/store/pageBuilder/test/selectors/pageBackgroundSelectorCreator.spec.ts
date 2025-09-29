// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { pageBackgroundSelectorCreator } from '../../selectors';

describe('pageBackgroundSelectorCreator', () => {
  it('should return background', () => {
    // before
    const selectorFunction = (pageBackgroundSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction(pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements['-1'])).toStrictEqual(
      pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements['-1'].background,
    );
  });
});
