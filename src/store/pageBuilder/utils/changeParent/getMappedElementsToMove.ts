// others
import { BASE_2D } from 'shared';

// types
import { TElement } from 'types';
import { TElements, TEvents, TPageBuilderState } from '../../types';

// utils
import { calculateCoordinates } from './calculateCoordinates';
import { getTargetPosition } from './getTargetPosition';
import { reducedData } from './reducedData';

export const getSizes = (
  element: Pick<TElement, 'height' | 'width'>,
  id: TElement['id'],
  possibleParent: TElement['parentId'],
): Pick<TElement, 'height' | 'width'> => {
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
    height: element.height,
    width: element.width,
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
  const sizes = getSizes({ height: element.height, width: element.width }, id, possibleParent);

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

  return reducedData(
    draggableElements.map(({ id }) => {
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
    }),
  );
};
