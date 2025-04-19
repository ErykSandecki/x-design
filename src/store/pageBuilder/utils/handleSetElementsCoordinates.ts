// types
import { T2DCoordinates, TRectCoordinates } from 'types';
import {
  TPage,
  TPageBuilderState,
  TPositions,
  TSelectedElement,
  TSetElementsCoordinatesAction,
} from '../types';

export const getSelectedElementPosition = (
  coordinates: TRectCoordinates,
  x: T2DCoordinates['x'],
  y: T2DCoordinates['y'],
): TSelectedElement['coordinates'] => ({
  x1: coordinates.x1 + x,
  x2: coordinates.x2 + x,
  y1: coordinates.y1 + y,
  y2: coordinates.y2 + y,
});

export const getPositions = (
  { x, y }: TSetElementsCoordinatesAction['payload'],
  prevState: TPage['prevState'],
): TPositions => {
  const { allData, dynamicData } = prevState.elements;
  const selectedElements = prevState.selectedElements;
  const positions: TPositions = {
    allData: {},
    dynamicData: {},
    selectedElements: [],
  };

  selectedElements.forEach(({ coordinates, id, ...restData }) => {
    const {
      coordinates: { x: xA, y: yA },
    } = allData[id];
    const position = { x: xA + x, y: yA + y };

    positions.allData = {
      ...positions.allData,
      [id]: { ...allData[id], coordinates: position },
    };
    positions.dynamicData = {
      ...positions.dynamicData,
      [id]: {
        ...dynamicData[id],
        coordinates: position,
      },
    };

    positions.selectedElements.push({
      ...restData,
      coordinates: getSelectedElementPosition(coordinates, x, y),
      id,
    });
  });

  return positions;
};

export const handleSetElementsCoordinates = (
  coordinates: TSetElementsCoordinatesAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const { canMoveElements } = state.events;
  const currentPage = state.pages[state.currentPage];
  const positions = canMoveElements
    ? getPositions(coordinates, currentPage.prevState)
    : { allData: {}, dynamicData: {}, selectedElements: [] };

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          allData: {
            ...currentPage.elements.allData,
            ...positions.allData,
          },
          dynamicData: {
            ...currentPage.elements.dynamicData,
            ...positions.dynamicData,
          },
        },
        selectedElements: positions.selectedElements,
      },
    },
  };
};
