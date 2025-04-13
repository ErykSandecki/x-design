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
    const parentHasChanged =
      state.elements.allData[id].parentId !== possibleParent;
    const clonedState = cloneDeep(state);
    const children = getMappedElementsToMove(
      parentHasChanged,
      payload,
      clonedState,
    );
    const parents = getMappedParentsChildren(parentHasChanged, payload, state);

    return {
      ...state,
      elements: {
        ...state.elements,
        allData: {
          ...state.elements.allData,
          ...children.allData,
          ...parents.allData,
        },
        dynamicData: {
          ...state.elements.dynamicData,
          ...children.dynamicData,
          ...parents.dynamicData,
        },
        staticData: {
          ...state.elements.staticData,
          ...children.staticData,
          ...parents.staticData,
        },
      },
      events: {
        ...state.events,
        draggableElements: [],
        possibleIndexPosition: null,
        possibleParent: null,
      },
      selectedElements: possibleParent === '-1' ? state.selectedElements : [],
    };
  }

  return state;
};
