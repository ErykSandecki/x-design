import { createSelector, Selector } from 'reselect';
import { get as getFp } from 'lodash/fp';

// others
import { REDUCER_KEY } from './actionsType';

// types
import { TElement } from 'types';
import {
  TElementsData,
  TElementDynamicData,
  TElementStaticData,
  TPageBuilderState,
} from './types';
import { TMainState } from 'types/reducers';

export const pageBuilderStateSelector: Selector<TMainState, TPageBuilderState> =
  getFp(REDUCER_KEY);

export const elementsSelector: Selector<TMainState, TElementsData> =
  createSelector(pageBuilderStateSelector, getFp('elements'));

export const dynamicDataSelector: Selector<
  TMainState,
  Array<TElementDynamicData>
> = createSelector(elementsSelector, getFp('dynamicData'));

export const elementDynamicDataSelectorCreator = (
  elementId: TElement['id'],
): Selector<TMainState, TElementDynamicData | undefined> =>
  createSelector(dynamicDataSelector, (dynamicData) =>
    dynamicData.find(({ id }) => id === elementId),
  );

export const staticDataSelector: Selector<
  TMainState,
  Array<TElementStaticData>
> = createSelector(elementsSelector, getFp('staticData'));

export const isLoadingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getFp('isLoading'),
);

export const isPendingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getFp('isPending'),
);
