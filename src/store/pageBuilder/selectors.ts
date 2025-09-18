import { createSelector, Selector } from 'reselect';
import { compose, get as getFp } from 'lodash/fp';
import { get, map, memoize, size } from 'lodash';

// others
import { REDUCER_KEY } from './actionsType';

// types
import { T3DCoordinates, TElement } from 'types';
import {
  TElementDynamicData,
  TElementsData,
  TElementStaticData,
  TEvents,
  TPage,
  TPageBuilderState,
  TSelectedElements,
} from './types';
import { TMainState } from 'types/reducers';

// utils
import { computeCounterRotation } from 'utils';
import { findMainParent } from './utils/findMainParent';
import { getParentsAngles } from './utils/getParentsAngles';

export const pageBuilderStateSelector: Selector<TMainState, TPageBuilderState> =
  getFp(REDUCER_KEY);

export const pageSelector: Selector<TMainState, TPage> = createSelector(
  pageBuilderStateSelector,
  (state) => state.pages[state.currentPage],
);

export const areaCoordinatesSelector: Selector<TMainState, T3DCoordinates> =
  createSelector(pageSelector, getFp('areaCoordinates'));

export const areaAxisSelectorCreator = (
  axis: keyof T3DCoordinates,
): Selector<TMainState, T3DCoordinates[typeof axis]> =>
  createSelector(areaCoordinatesSelector, getFp(axis));

export const elementsSelector: Selector<TMainState, TElementsData> =
  createSelector(pageSelector, getFp('elements'));

export const allDataSelector: Selector<TMainState, TElementsData['allData']> =
  createSelector(elementsSelector, getFp('allData'));

export const elementAllDataSelectorCreator = (
  elementId: TElement['id'],
): Selector<TMainState, TElement | undefined> =>
  createSelector(allDataSelector, getFp(elementId));

export const canRedoReduxHistorySelector: Selector<TMainState, boolean> =
  createSelector(pageSelector, ({ reducerHistory, reducerHistoryIndex }) => {
    if (reducerHistory[reducerHistoryIndex - 1]) {
      return true;
    }

    return false;
  });

export const canUndoReduxHistorySelector: Selector<TMainState, boolean> =
  createSelector(pageSelector, ({ reducerHistory, reducerHistoryIndex }) => {
    if (reducerHistory[reducerHistoryIndex + 1]) {
      return true;
    }

    return false;
  });

export const pageBackgroundSelectorCreator = (
  id: TElement['id'] | '-1',
): Selector<TMainState, TElement['background']> =>
  createSelector(allDataSelector, compose(getFp('background'), getFp(id)));

export const childrenSelectorCreator = (
  id: TElement['id'] | '-1',
): Selector<TMainState, TElement['children']> =>
  createSelector(elementsSelector, (elements) =>
    get(elements, `allData.${id}.children`),
  );

export const dynamicDataSelector: Selector<
  TMainState,
  TElementsData['dynamicData']
> = createSelector(elementsSelector, getFp('dynamicData'));

export const elementDynamicDataSelectorCreator = (
  elementId: TElement['id'],
): Selector<TMainState, TElementDynamicData | undefined> =>
  createSelector(dynamicDataSelector, getFp(elementId));

export const elementAttributeSelectorCreator = (
  attribute: keyof TElement,
  elementId: TElement['id'],
): Selector<TMainState, TElementDynamicData | undefined> =>
  createSelector(allDataSelector, getFp(`${elementId}.${attribute}`));

export const staticDataSelector: Selector<
  TMainState,
  TElementsData['staticData']
> = createSelector(elementsSelector, getFp('staticData'));

export const filtredStaticDataSelectorCreator = (
  parentId: TElement['parentId'],
): Selector<TMainState, Array<TElementStaticData>> =>
  createSelector(
    childrenSelectorCreator(parentId),
    staticDataSelector,
    (children, staticData) => map(children, (id) => staticData[id]),
  );

export const eventsSelector: Selector<TMainState, TEvents> = createSelector(
  pageBuilderStateSelector,
  getFp('events'),
);

export const eventSelectorCreator = (
  key: keyof TEvents,
): Selector<TMainState, TEvents[typeof key]> =>
  createSelector(eventsSelector, getFp(key));

export const isHoverSelectorCreator = (
  id: TElement['id'],
): Selector<TMainState, boolean> =>
  createSelector(eventsSelector, ({ hoverOnElement }) => hoverOnElement === id);

export const isDraggableSelectorCreator = (
  id: TElement['id'],
): Selector<TMainState, boolean> =>
  createSelector(eventsSelector, ({ draggableElements }) =>
    draggableElements.includes(id),
  );

export const isLoadingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getFp('isLoading'),
);

export const isPendingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getFp('isPending'),
);

export const selectedElementsSelector: Selector<TMainState, TSelectedElements> =
  createSelector(pageSelector, getFp('selectedElements'));

export const isSelectedElementSelectorCreator = (
  elementId: TElement['id'],
): Selector<TMainState, boolean> =>
  createSelector(
    selectedElementsSelector,
    (selectedElements) => !!selectedElements.find(({ id }) => id === elementId),
  );

export const mainParentIdSelectorCreator = (
  parentId: TElement['parentId'],
): Selector<TMainState, TElement['id']> =>
  createSelector(staticDataSelector, (staticData) =>
    findMainParent(parentId, staticData),
  );

export const multipleSelectedElementsSelector: Selector<TMainState, boolean> =
  createSelector(
    selectedElementsSelector,
    (selectedElements) => size(selectedElements) > 1,
  );

export const areParentsTheSameSelector: Selector<TMainState, boolean> =
  createSelector(selectedElementsSelector, (selectedElements) => {
    if (size(selectedElements) > 1) {
      const baseParentId = selectedElements[0].parentId;

      return selectedElements.every(
        ({ parentId }) => parentId === baseParentId,
      );
    }

    return true;
  });

export const counterAngleSelectorCreator = (
  parentId: TElement['parentId'],
): Selector<TMainState, number> =>
  createSelector(allDataSelector, (allData) =>
    parentId === '-1'
      ? 0
      : computeCounterRotation(getParentsAngles(allData, [], parentId))
          .counterAngle,
  );
