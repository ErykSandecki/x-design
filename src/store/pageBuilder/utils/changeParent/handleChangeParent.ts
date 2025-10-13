import { cloneDeep, first } from 'lodash';

// types
import { TEvents, TPage, TPageBuilderState } from '../../types';

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
  possibleParent: string,
  state: TPageBuilderState,
  stateCopy: TPageBuilderState,
): TPageBuilderState => {
  const prevParentId = currentPage.elements[id].parentId;
  const parentHasChanged = prevParentId !== possibleParent;
  const children = getMappedElementsToMove(parentHasChanged, stateCopy);
  const nestedChildren = getMappedNestedChildren(currentPage, children);
  const parents = getMappedParentsChildren(parentHasChanged, state);

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
  state: TPageBuilderState,
): TPageBuilderState => {
  const children = getMappedElementsWithResetPosition(state);

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

export const handleChangeParent = (state: TPageBuilderState): TPageBuilderState => {
  const { draggableElements, possibleParent } = state.events;
  const currentPage = state.pages[state.currentPage];
  const stateCopy = cloneDeep(state);
  const draggableElement = first(draggableElements);
  const draggableElementsId = draggableElements.map(({ id }) => id);
  const hasAnomalies = detectIdAnomalies(draggableElements, currentPage.selectedElements);
  const events: TEvents = {
    ...state.events,
    draggableElements: [],
    isMultipleMoving: false,
    possibleAnchorElementId: null,
    possibleAnchorPosition: null,
    possibleIndexPosition: null,
    possibleParent: null,
  };

  if (!hasAnomalies && possibleParent && !draggableElementsId.includes(possibleParent)) {
    return handleWithPossibleParent(currentPage, events, draggableElement.id, possibleParent, state, stateCopy);
  }

  return handleWithResetPosition(currentPage, events, state);
};
