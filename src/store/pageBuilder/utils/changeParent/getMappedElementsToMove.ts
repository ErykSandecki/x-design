// others
import { BASE_2D } from 'shared';

// types
import { LayoutType, TElement } from 'types';
import { TElements, TEvents, TPageBuilderState } from '../../types';

// utils
import { calculateCoordinates } from './calculateCoordinates';
import { extractObjectValues, mapFilteredValues } from 'utils';
import { getTargetPosition } from './getTargetPosition';

export const getSizes = (
  element: TElement,
  id: TElement['id'],
  parent: TElement,
  possibleParent: TElement['parentId'],
): Pick<TElement, 'height' | 'width'> => {
  const { type } = parent.layout;
  const isGrid = type === LayoutType.grid;

  if (possibleParent === '-1') {
    const element = document.getElementById(id);
    const height = parseInt(getComputedStyle(element).height);
    const width = parseInt(getComputedStyle(element).width);

    return {
      height: { value: height },
      width: {
        value: width,
      },
    };
  }

  return {
    height: isGrid ? { ...element.height, unit: undefined, value: 'auto' } : element.height,
    width: isGrid ? { ...element.width, unit: undefined, value: 'auto' } : element.width,
  };
};

export const getPartialData = (
  element: TElement,
  id: TElement['id'],
  parent: TElement,
  parentHasChanged: boolean,
  possibleParent: TEvents['possibleParent'],
  state: TPageBuilderState,
): Partial<TElement> => {
  const deepLevel = possibleParent !== '-1' ? parent.deepLevel + 1 : 0;
  const targetPosition = getTargetPosition(parent, possibleParent);
  const sizes = getSizes(element, id, parent, possibleParent);

  return {
    coordinates: parentHasChanged
      ? calculateCoordinates(element.parentId, id, possibleParent, state)
      : element.coordinates,
    deepLevel: parentHasChanged ? deepLevel : element.deepLevel,
    height: parentHasChanged ? sizes.height : element.height,
    parentId: parentHasChanged ? possibleParent : element.parentId,
    position: parentHasChanged ? targetPosition : element.position,
    width: parentHasChanged ? sizes.width : element.width,
  };
};

export const getMappedElementsToMove = (parentHasChanged: boolean, state: TPageBuilderState): TElements => {
  const currentPage = state.pages[state.currentPage];
  const { elements } = currentPage;
  const { draggableElements, possibleParent } = state.events;
  const ids = extractObjectValues(draggableElements, ['id']);

  return mapFilteredValues(elements, ids, ({ id }) => {
    const data = getPartialData(elements[id], id, elements[possibleParent], parentHasChanged, possibleParent, state);
    const shouldResetCoordinates = data.position === 'relative';

    return {
      ...elements[id],
      coordinates: shouldResetCoordinates ? BASE_2D : data.coordinates,
      deepLevel: data.deepLevel,
      height: data.height,
      parentId: data.parentId,
      position: data.position,
      width: data.width,
    };
  });
};
