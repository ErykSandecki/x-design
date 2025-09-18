import { cloneDeep, first } from 'lodash';

// types
import {
  TChangeParentActionPayload,
  TPage,
  TPageBuilderState,
} from '../../types';

// utils
import { getMappedElementsToMove } from './getMappedElementsToMove';
import { getMappedElementsWithResetPosition } from './getMappedElementsWithResetPosition';
import { getMappedParentsChildren } from './getMappedParentsChildren';
import { detectIdAnomalies } from './detectIdAnomalies';

export const handleWithPossibleParent = (
  currentPage: TPage,
  events: TPageBuilderState['events'],
  id: string,
  payload: TChangeParentActionPayload,
  possibleParent: string,
  state: TPageBuilderState,
  stateCopy: TPageBuilderState,
): TPageBuilderState => {
  const prevParentId = currentPage.elements.allData[id].parentId;
  const parentHasChanged = prevParentId !== possibleParent;
  const children = getMappedElementsToMove(
    parentHasChanged,
    payload,
    stateCopy,
  );
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
          allData: {
            ...currentPage.elements.allData,
            ...children.allData,
            ...parents.allData,
          },
          dynamicData: {
            ...currentPage.elements.dynamicData,
            ...children.dynamicData,
            ...parents.dynamicData,
          },
          staticData: {
            ...currentPage.elements.staticData,
            ...children.staticData,
            ...parents.staticData,
          },
        },
        selectedElements: currentPage.selectedElements.map(
          (selectedElement) => ({
            ...selectedElement,
            parentId: possibleParent,
            position: children.allData[selectedElement.id].position,
          }),
        ),
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
          allData: {
            ...currentPage.elements.allData,
            ...children.allData,
          },
          dynamicData: {
            ...currentPage.elements.dynamicData,
            ...children.dynamicData,
          },
          staticData: {
            ...currentPage.elements.staticData,
            ...children.staticData,
          },
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
  const id = first(draggableElements);
  const hasAnomalies = detectIdAnomalies(
    draggableElements,
    currentPage.selectedElements,
  );
  const events = {
    ...state.events,
    draggableElements: [],
    possibleIndexPosition: null,
    possibleParent: null,
  };

  if (
    !hasAnomalies &&
    possibleParent &&
    possibleParent !== currentPage.elements.allData[id].parentId &&
    !draggableElements.includes(possibleParent)
  ) {
    return handleWithPossibleParent(
      currentPage,
      events,
      id,
      payload,
      possibleParent,
      state,
      stateCopy,
    );
  }

  return handleWithResetPosition(currentPage, events, payload, state);
};
