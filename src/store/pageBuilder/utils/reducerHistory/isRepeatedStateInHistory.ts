import { head } from 'lodash';

// others
import {
  CHANGE_PARENT,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
} from 'store/pageBuilder/actionsType';

// types
import { TAction } from 'types';
import {
  TPage,
  TPageBuilderState,
  TReducerHistory,
  TSelectedElements,
} from 'store/pageBuilder/types';

export const areaHasTheSameCoordinates = (
  prevState: TReducerHistory,
  nextState: TPage,
): boolean => {
  const { x: x1, y: y1, z: z1 } = prevState.areaCoordinates;
  const { x: x2, y: y2, z: z2 } = nextState.areaCoordinates;

  return x1 === x2 && y1 === y2 && z1 === z2;
};

export const hasTheSameSelectedElements = (
  prevSelectedElements: TSelectedElements,
  nextSelectedElements: TSelectedElements,
): boolean => {
  if (prevSelectedElements.length === nextSelectedElements.length) {
    const prevId = prevSelectedElements.map(({ id }) => id);

    return nextSelectedElements.every(({ id: nextId }) =>
      prevId.includes(nextId),
    );
  }

  return false;
};

export const parentHasNotChanged = (
  prevState: TReducerHistory,
  nextState: TPage,
): boolean =>
  prevState.selectedElements[0].parentId ===
  nextState.selectedElements[0].parentId;

export const isRepeatedStateInHistory = (
  state: TPageBuilderState,
  type: TAction['type'],
): boolean => {
  const currentPage = state.pages[state.currentPage];

  if (currentPage.reducerHistory.length) {
    const prevState = head(currentPage.reducerHistory);

    switch (type) {
      case CHANGE_PARENT:
        return parentHasNotChanged(prevState, currentPage);
      case SELECT_ELEMENT:
      case SELECT_ELEMENTS:
        return hasTheSameSelectedElements(
          prevState.selectedElements,
          currentPage.selectedElements,
        );
      case SET_AREA_COORDINATES:
        return areaHasTheSameCoordinates(prevState, currentPage);
      default:
        return false;
    }
  }

  return false;
};
