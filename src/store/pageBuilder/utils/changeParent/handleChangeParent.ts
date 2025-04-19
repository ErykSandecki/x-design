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

  if (possibleParent !== null) {
    const currentPage = state.pages[state.currentPage];
    const parentHasChanged =
      currentPage.elements.allData[id].parentId !== possibleParent;
    const clonedState = cloneDeep(state);
    const children = getMappedElementsToMove(
      parentHasChanged,
      payload,
      clonedState,
    );
    const parents = getMappedParentsChildren(parentHasChanged, payload, state);

    return {
      ...state,
      events: {
        ...state.events,
        draggableElements: [],
        possibleIndexPosition: null,
        possibleParent: null,
      },
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
          selectedElements:
            possibleParent === '-1' ? currentPage.selectedElements : [],
        },
      },
    };
  }

  return state;
};
