// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { allDataSelector } from '../../selectors';

const { elements } = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

describe('allDataSelector', () => {
  it('should return data', () => {
    // before
    const selectorFunction = (allDataSelector as any).resultFunc;

    // result
    expect(selectorFunction(elements)).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements.allData,
    });
  });
});
