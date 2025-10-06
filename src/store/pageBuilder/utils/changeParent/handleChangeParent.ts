import { cloneDeep, first } from 'lodash';

// types
import { TChangeParentActionPayload, TEvents, TPage, TPageBuilderState } from '../../types';

// utils
import { detectIdAnomalies } from './detectIdAnomalies';
import { getMappedElementsToMove } from './getMappedElementsToMove';
import { getMappedElementsWithResetPosition } from './getMappedElementsWithResetPosition';
import { getMappedParentsChildren } from './getMappedParentsChildren';
import { getMappedNestedChildren } from './getMappedNestedChildren';

export const handleWithPossibleParent = (
  currentPage: TPage,
  events: TPageBuilderState['events'],
  id: string,
  payload: TChangeParentActionPayload,
  possibleParent: string,
  state: TPageBuilderState,
  stateCopy: TPageBuilderState,
): TPageBuilderState => {
  const prevParentId = currentPage.elements[id].parentId;
  const parentHasChanged = prevParentId !== possibleParent;
  const children = getMappedElementsToMove(parentHasChanged, payload, stateCopy);
  const nestedChildren = getMappedNestedChildren(currentPage, children);
  const parents = getMappedParentsChildren(parentHasChanged, payload, state);

  return {
    ...state,
    events,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...state.pages[state.currentPage],
        elements: {
          ...currentPage.elements,
          ...children,
          ...parents,
          ...nestedChildren,
        },
        selectedElements: currentPage.selectedElements.map((selectedElement) => ({
          ...selectedElement,
          parentId: possibleParent,
          position: children[selectedElement.id].position,
        })),
      },
    },
  };
};

export const handleWithResetPosition = (
  currentPage: TPage,
  events: TPageBuilderState['events'],
  payload: TChangeParentActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const children = getMappedElementsWithResetPosition(payload, state);

  return {
    ...state,
    events,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          ...children,
        },
      },
    },
  };
};

export const handleChangeParent = (
  payload: TChangeParentActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const { draggableElements, possibleParent } = payload;
  const currentPage = state.pages[state.currentPage];
  const stateCopy = cloneDeep(state);
  const draggableElement = first(draggableElements);
  const draggableElementsId = draggableElements.map(({ id }) => id);
  const hasAnomalies = detectIdAnomalies(draggableElements, currentPage.selectedElements);
  const events: TEvents = {
    ...state.events,
    draggableElements: [],
    possibleAnchorElementId: null,
    possibleAnchorPosition: null,
    possibleIndexPosition: null,
    possibleParent: null,
  };

  if (!hasAnomalies && possibleParent && !draggableElementsId.includes(possibleParent)) {
    return handleWithPossibleParent(
      currentPage,
      events,
      draggableElement.id,
      payload,
      possibleParent,
      state,
      stateCopy,
    );
  }

  return handleWithResetPosition(currentPage, events, payload, state);
};
