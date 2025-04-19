// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { dynamicDataSelector } from '../../selectors';

const { elements } = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

describe('dynamicDataSelector', () => {
  it('should return data', () => {
    // before
    const selectorFunction = (dynamicDataSelector as any).resultFunc;

    // result
    expect(selectorFunction(elements)).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements.dynamicData,
    });
  });
});
