import { cloneDeep, first } from 'lodash';

// types
import { TPageBuilderState } from '../../types';

// utils
import { getMappedChildren } from './getMappedChildren';
import { getMappedParents } from './getMappedParents';

export const handleChangeParent = (
  state: TPageBuilderState,
): TPageBuilderState => {
  const { events } = state;
  const { draggableElements, possibleParent } = events;
  const id = first(draggableElements);

  if (possibleParent !== null) {
    const parentHasChanged =
      state.elements.allData[id].parentId !== possibleParent;
    const clonedState = cloneDeep(state);
    const children = getMappedChildren(parentHasChanged, clonedState);
    const parents = getMappedParents(parentHasChanged, state);

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
      selectedElements: possibleParent === '-1' ? state.selectedElements : {},
    };
  }

  return state;
};
