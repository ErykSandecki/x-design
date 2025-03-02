// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../actionsType';

// store
import pageBuilder from '../reducer';

// types
import { TAction } from 'types';
import { TPageBuilderState } from '../types';

describe('PageBuilderReducer', () => {
  const reducer = (action: TAction, initialState = {}): TPageBuilderState =>
    pageBuilder(initialState as TPageBuilderState, action);

  it('should return default state', () => {
    // before
    const state = pageBuilder(
      { ...pageBuilderStateMock[PAGE_BUILDER] },
      { type: '' },
    );

    // result
    expect(state).toEqual(pageBuilderStateMock[PAGE_BUILDER]);
  });
});
