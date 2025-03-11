// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { eventsSelector } from '../../selectors';

const state = pageBuilderStateMock[PAGE_BUILDER];

describe('eventsSelector', () => {
  it('should return data', () => {
    // before
    const selectorFunction = (eventsSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual({
      isMultipleMoving: false,
    });
  });
});
