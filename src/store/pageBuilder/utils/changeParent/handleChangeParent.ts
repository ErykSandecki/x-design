import { cloneDeep, first } from 'lodash';

// types
import { TChangeParentActionPayload, TPageBuilderState } from '../../types';

// utils
import { getMappedElementsToMove } from './getMappedElementsToMove';
import { getMappedParentsChildren } from './getMappedParentsChildren';

export const handleChangeParent = (
  payload: TChangeParentActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const { draggableElements, possibleParent } = payload;
  const id = first(draggableElements);
  const events = {
    ...state.events,
    draggableElements: [],
    possibleIndexPosition: null,
    possibleParent: null,
  };

  if (possibleParent !== null) {
    const currentPage = state.pages[state.currentPage];
    const prevParentId = currentPage.elements.allData[id].parentId;
    const parentHasChanged = prevParentId !== possibleParent;
    const clonedState = cloneDeep(state);
    const children = getMappedElementsToMove(
      parentHasChanged,
      payload,
      clonedState,
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
  }

  return {
    ...state,
    events,
  };
};
