// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { selectedElementsSelector } from '../../selectors';

const state = pageBuilderStateMock[PAGE_BUILDER];

describe('selectedElementsSelector', () => {
  it('should return data', () => {
    // before
    const selectorFunction = (selectedElementsSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual([]);
  });
});
