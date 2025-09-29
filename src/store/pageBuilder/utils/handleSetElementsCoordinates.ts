import { isNaN } from 'lodash';

// types
import { TElements, TPage, TPageBuilderState, TSelectedElements, TSetElementsCoordinatesAction } from '../types';

export const getCoordinates = (
  coordinates: T2DCoordinates,
  isDynamic: boolean,
  prevCoordinates: T2DCoordinates,
): T2DCoordinates => {
  const { x, y } = coordinates;
  const { x: prevX, y: prevY } = prevCoordinates;

  if (isDynamic) {
    return { x: prevX + (isNaN(x) ? 0 : x), y: prevY + (isNaN(y) ? 0 : y) };
  }

  return { x: isNaN(x) ? prevX : x, y: isNaN(y) ? prevY : y };
};

export const getPositions = (
  canMoveElements: boolean,
  { coordinates: currentCoordinates, mode }: TSetElementsCoordinatesAction['payload'],
  prevPageState: TPage['prevState'],
  currentPage: TPage,
): { elements: TElements; selectedElements: TSelectedElements } => {
  const elements = currentPage.elements;
  const isDynamic = mode === 'dynamic';
  const prevElements = prevPageState.elements;
  const selectedElements = prevPageState.selectedElements;
  const positions = {
    elements: {},
    selectedElements: [],
  };

  if (canMoveElements) {
    selectedElements.forEach(({ id, ...restData }) => {
      const alignment = elements[id].alignment;
      const { coordinates: prevCoordinates } = prevElements[id];
      const coordinates = getCoordinates(currentCoordinates, isDynamic, prevCoordinates);

      positions.elements = { ...positions.elements, [id]: { ...prevElements[id], alignment, coordinates } };
      positions.selectedElements.push({ ...restData, id });
    });

    return positions;
  }

  return {
    ...positions,
    selectedElements: currentPage.selectedElements,
  };
};

export const handleSetElementsCoordinates = (
  coordinates: TSetElementsCoordinatesAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const { canMoveElements } = state.events;
  const currentPage = state.pages[state.currentPage];
  const positions = getPositions(canMoveElements, coordinates, currentPage.prevState || currentPage, currentPage);

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          ...positions.elements,
        },
        selectedElements: positions.selectedElements,
      },
    },
  };
};
