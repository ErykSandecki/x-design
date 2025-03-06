import { createSelector, Selector } from 'reselect';
import { get as getFp } from 'lodash/fp';

// others
import { REDUCER_KEY } from './actionsType';

// types
import { TElement } from 'types';
import {
  TElementsData,
  TElementDynamicData,
  TPageBuilderState,
  TSelectedElements,
} from './types';
import { TMainState } from 'types/reducers';

export const pageBuilderStateSelector: Selector<TMainState, TPageBuilderState> =
  getFp(REDUCER_KEY);

export const elementsSelector: Selector<TMainState, TElementsData> =
  createSelector(pageBuilderStateSelector, getFp('elements'));

export const dynamicDataSelector: Selector<
  TMainState,
  TElementsData['dynamicData']
> = createSelector(elementsSelector, getFp('dynamicData'));

export const elementDynamicDataSelectorCreator = (
  elementId: TElement['id'],
): Selector<TMainState, TElementDynamicData | undefined> =>
  createSelector(dynamicDataSelector, getFp(elementId));

export const staticDataSelector: Selector<
  TMainState,
  TElementsData['staticData']
> = createSelector(elementsSelector, getFp('staticData'));

export const isLoadingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getFp('isLoading'),
);

export const isPendingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getFp('isPending'),
);

export const selectedElementsSelector: Selector<TMainState, TSelectedElements> =
  createSelector(pageBuilderStateSelector, getFp('selectedElements'));

export const isSelectedElementSelectorCreator = (
  elementId: TElement['id'],
): Selector<TMainState, boolean> =>
  createSelector(
    selectedElementsSelector,
    (selectedElements) => !!selectedElements[elementId],
  );
