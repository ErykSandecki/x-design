import { createSelector, Selector } from 'reselect';
import { get as getFp } from 'lodash/fp';
import { get, head, size } from 'lodash';

// others
import { REDUCER_KEY } from './actionsType';

// types
import { TAlignment, TElement, TNestedKeyOf } from 'types';
import { TElements, TEvents, TPage, TPageBuilderState, TSelectedElement, TSelectedElements } from './types';
import { TMainState } from 'types/reducers';

// utils
import { computeCounterRotation } from 'utils';
import { findMainParent } from './utils/findMainParent';
import { getParentsAngles } from './utils/getParentsAngles';

export const pageBuilderStateSelector: Selector<TMainState, TPageBuilderState> = getFp(REDUCER_KEY);

export const pageSelector: Selector<TMainState, TPage> = createSelector(
  pageBuilderStateSelector,
  (state) => state.pages[state.currentPage],
);

export const areaCoordinatesSelector: Selector<TMainState, T3DCoordinates> = createSelector(
  pageSelector,
  getFp('areaCoordinates'),
);

export const areaAxisSelectorCreator = (
  axis: keyof T3DCoordinates,
): Selector<TMainState, T3DCoordinates[typeof axis]> => createSelector(areaCoordinatesSelector, getFp(axis));

export const elementsSelector: Selector<TMainState, TElements> = createSelector(pageSelector, getFp('elements'));

export const elementDataSelectorCreator = (id: TElement['id']): Selector<TMainState, TElement | undefined> =>
  createSelector(elementsSelector, getFp(id));

export const elementAttributeSelectorCreator = <K extends keyof TElement>(
  attribute: K,
  elementId: TElement['id'],
): Selector<TMainState, TElement[K]> => createSelector(elementDataSelectorCreator(elementId), getFp(attribute));

export const elementAttributeNestedSelectorCreator = <K>(
  attribute: TNestedKeyOf<TElement>,
  elementId: TElement['id'],
): Selector<TMainState, K> => createSelector(elementDataSelectorCreator(elementId), getFp(attribute));

export const childrenSelectorCreator = (id: TElement['id'] | '-1'): Selector<TMainState, TElement['children']> =>
  createSelector(elementDataSelectorCreator(id), (elements) => get(elements, 'children'));

export const canRedoReduxHistorySelector: Selector<TMainState, boolean> = createSelector(
  pageSelector,
  ({ reducerHistory, reducerHistoryIndex }) => {
    if (reducerHistory[reducerHistoryIndex - 1]) {
      return true;
    }

    return false;
  },
);

export const canUndoReduxHistorySelector: Selector<TMainState, boolean> = createSelector(
  pageSelector,
  ({ reducerHistory, reducerHistoryIndex }) => {
    if (reducerHistory[reducerHistoryIndex + 1]) {
      return true;
    }

    return false;
  },
);

export const pageBackgroundSelectorCreator = (
  id: TElement['id'] | '-1',
): Selector<TMainState, TElement['background']> => createSelector(elementDataSelectorCreator(id), getFp('background'));

export const eventsSelector: Selector<TMainState, TEvents> = createSelector(pageBuilderStateSelector, getFp('events'));

export const eventSelectorCreator = <K extends keyof TEvents>(key: K): Selector<TMainState, TEvents[K]> =>
  createSelector(eventsSelector, getFp(key));

export const isHoverSelectorCreator = (id: TElement['id']): Selector<TMainState, boolean> =>
  createSelector(eventsSelector, ({ hoverOnElement }) => hoverOnElement === id);

export const hasPossibleElementSelectorCreator = (id: TElement['id']): Selector<TMainState, boolean> =>
  createSelector(eventsSelector, ({ possibleElement }) => possibleElement?.parentId === id);

export const isDraggableSelectorCreator = (id: TElement['id']): Selector<TMainState, boolean> =>
  createSelector(eventsSelector, ({ draggableElements }) =>
    draggableElements.some((draggableElement) => draggableElement.id === id),
  );

export const isLoadingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getFp('isLoading'),
);

export const isPendingSelector: Selector<TMainState, boolean> = createSelector(
  pageBuilderStateSelector,
  getFp('isPending'),
);

export const selectedElementsSelector: Selector<TMainState, TSelectedElements> = createSelector(
  pageSelector,
  getFp('selectedElements'),
);

export const firstSelectedElementIdSelector: Selector<TMainState, TSelectedElement['id']> = createSelector(
  selectedElementsSelector,
  (selectedElements) => head(selectedElements)?.id,
);

export const firstSelectedElementParentIdSelector: Selector<TMainState, TSelectedElement['id']> = createSelector(
  selectedElementsSelector,
  (selectedElements) => head(selectedElements)?.parentId,
);

export const anySelectedElementSelector: Selector<TMainState, boolean> = createSelector(
  selectedElementsSelector,
  (selectedElements) => !!selectedElements.length,
);

export const selectedElementsSizeSelector: Selector<TMainState, number> = createSelector(
  selectedElementsSelector,
  (selectedElements) => selectedElements.length,
);

export const isSelectedElementSelectorCreator = (elementId: TElement['id']): Selector<TMainState, boolean> =>
  createSelector(selectedElementsSelector, (selectedElements) => !!selectedElements.find(({ id }) => id === elementId));

export const mainParentIdSelectorCreator = (parentId: TElement['parentId']): Selector<TMainState, TElement['id']> =>
  createSelector(elementsSelector, (elements) => findMainParent(parentId, elements));

export const multipleSelectedElementsSelector: Selector<TMainState, boolean> = createSelector(
  selectedElementsSelector,
  (selectedElements) => size(selectedElements) > 1,
);

export const areParentsTheSameSelector: Selector<TMainState, boolean> = createSelector(
  selectedElementsSelector,
  (selectedElements) => {
    if (size(selectedElements) > 1) {
      const baseParentId = selectedElements[0].parentId;

      return selectedElements.every(({ parentId }) => parentId === baseParentId);
    }

    return true;
  },
);

export const counterAngleSelectorCreator = (parentId: TElement['parentId']): Selector<TMainState, number> =>
  createSelector(elementsSelector, (elements) =>
    parentId === '-1' ? 0 : computeCounterRotation(getParentsAngles([], elements, parentId)).counterAngle,
  );

export const isMixedSelectorCreator = (key: TNestedKeyOf<TElement>): Selector<TMainState, boolean> =>
  createSelector(
    elementsSelector,
    firstSelectedElementIdSelector,
    selectedElementsSelector,
    (elements, firstElementId, selectedElements) =>
      selectedElements
        .filter(({ id }) => id !== firstElementId)
        .some(({ id }) => get(elements[id], key) !== get(elements[firstElementId], key)),
  );

export const hasSomeAlignmentSelectorCreator = (direction: keyof TAlignment): Selector<TMainState, boolean> =>
  createSelector(elementsSelector, selectedElementsSelector, (elements, selectedElements) =>
    selectedElements.some(({ id }) => elements[id].alignment[direction] !== undefined),
  );

export const hasSomeRelativePositionSelector: Selector<TMainState, boolean> = createSelector(
  selectedElementsSelector,
  (selectedElements) => selectedElements.some(({ position }) => position === 'relative'),
);

export const hasVariantsSelectorCreator = (
  attribute: 'background',
  elementId: TElement['id'],
): Selector<TMainState, boolean> =>
  createSelector(elementAttributeSelectorCreator(attribute, elementId), (variants) => !!variants.length);
