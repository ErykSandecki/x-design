// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { staticDataSelector } from '../../selectors';

const { elements } = pageBuilderStateMock[PAGE_BUILDER];

describe('staticDataSelector', () => {
  it('should return data', () => {
    // before
    const selectorFunction = (staticDataSelector as any).resultFunc;

    // result
    expect(selectorFunction(elements)).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData,
    });
  });
});
