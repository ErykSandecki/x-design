// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { isPendingSelector } from '../../selectors';

const state = pageBuilderStateMock[PAGE_BUILDER];

describe('isPendingSelector', () => {
  it('should return true', () => {
    // before
    const selectorFunction = (isPendingSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(true);
  });

  it('should return false', () => {
    // mock
    const stateMock = { ...state, isPending: false };

    // before
    const selectorFunction = (isPendingSelector as any).resultFunc;

    // result
    expect(selectorFunction(stateMock)).toStrictEqual(false);
  });
});
