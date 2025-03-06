// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { elementsSelector } from '../../selectors';

const state = pageBuilderStateMock[PAGE_BUILDER];

describe('elementsSelector', () => {
  it('should return data', () => {
    // before
    const selectorFunction = (elementsSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual({
      dynamicData: {},
      staticData: {},
    });
  });
});
