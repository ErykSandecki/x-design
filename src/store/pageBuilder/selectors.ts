import { createSelector, Selector } from 'reselect';
import { get as getFp, getOr as getOrFp } from 'lodash/fp';

// others
import { REDUCER_KEY } from './actionsType';

// types
import { TPageBuilderState } from './types';
import { TMainState } from 'types/reducers';

export const pageBuilderStateSelector: Selector<TMainState, TPageBuilderState> =
  getFp(REDUCER_KEY);

export const isLoadingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getOrFp(false, 'isLoading'),
);

export const isPendingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getOrFp(false, 'isPending'),
);
