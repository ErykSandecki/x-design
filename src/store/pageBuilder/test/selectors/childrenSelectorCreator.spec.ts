// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { childrenSelectorCreator } from '../../selectors';

describe('childrenSelectorCreator', () => {
  it('should return children', () => {
    // before
    const selectorFunction = (childrenSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction(pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements['-1'])).toStrictEqual([]);
  });
});
