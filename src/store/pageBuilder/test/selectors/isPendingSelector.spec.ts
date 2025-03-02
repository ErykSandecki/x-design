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
    expect(selectorFunction(state)).toBe(false);
  });

  it('should return true', () => {
    // mock
    const stateMock = { ...state, isPending: true };

    // before
    const selectorFunction = (isPendingSelector as any).resultFunc;

    // result
    expect(selectorFunction(stateMock)).toBe(true);
  });
});
