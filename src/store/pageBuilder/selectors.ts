import { createSelector, Selector } from 'reselect';
import { get as getFp } from 'lodash/fp';
import { size } from 'lodash';

// others
import { REDUCER_KEY } from './actionsType';

// types
import { T3DCoordinates, TElement } from 'types';
import {
  TElementsData,
  TElementDynamicData,
  TPageBuilderState,
  TSelectedElements,
  TEvents,
} from './types';
import { TMainState } from 'types/reducers';

export const pageBuilderStateSelector: Selector<TMainState, TPageBuilderState> =
  getFp(REDUCER_KEY);

export const areaCoordinatesSelector: Selector<TMainState, T3DCoordinates> =
  createSelector(pageBuilderStateSelector, getFp('areaCoordinates'));

export const areaAxisSelectorCreator = (
  axis: keyof T3DCoordinates,
): Selector<TMainState, T3DCoordinates[typeof axis]> =>
  createSelector(areaCoordinatesSelector, getFp(axis));

export const elementsSelector: Selector<TMainState, TElementsData> =
  createSelector(pageBuilderStateSelector, getFp('elements'));

export const allDataSelector: Selector<TMainState, TElementsData['allData']> =
  createSelector(elementsSelector, getFp('allData'));

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

export const eventsSelector: Selector<TMainState, TEvents> = createSelector(
  pageBuilderStateSelector,
  getFp('events'),
);

export const eventSelectorCreator = (
  key: keyof TEvents,
): Selector<TMainState, TEvents[typeof key]> =>
  createSelector(eventsSelector, getFp(key));

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

export const multipleSelectedElementsSelector: Selector<TMainState, boolean> =
  createSelector(
    selectedElementsSelector,
    (selectedElements) => size(selectedElements) > 1,
  );
