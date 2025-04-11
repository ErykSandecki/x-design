// types
import { T2DCoordinates, TElement, TRectCoordinates } from 'types';
import {
  TPageBuilderState,
  TPositions,
  TSelectedElements,
  TSetElementsCoordinatesAction,
} from '../types';

export const getSelectedElementPosition = (
  coordinates: TRectCoordinates,
  id: TElement['id'],
  positions: TPositions,
  selectedElements: TSelectedElements,
  x: T2DCoordinates['x'],
  y: T2DCoordinates['y'],
): TSelectedElements => ({
  ...positions.selectedElements,
  [id]: {
    ...selectedElements[id],
    coordinates: {
      x1: coordinates.x1 + x,
      x2: coordinates.x2 + x,
      y1: coordinates.y1 + y,
      y2: coordinates.y2 + y,
    },
  },
});

export const getPositions = (
  { x, y }: TSetElementsCoordinatesAction['payload'],
  prevState: TPageBuilderState['prevState'],
): TPositions => {
  const { allData, dynamicData } = prevState.elements;
  const selectedElements = prevState.selectedElements;
  const positions: TPositions = {
    allData: {},
    dynamicData: {},
    selectedElements: {},
  };

  for (const [_, { coordinates, id }] of Object.entries(selectedElements)) {
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
    positions.selectedElements = getSelectedElementPosition(
      coordinates,
      id,
      positions,
      selectedElements,
      x,
      y,
    );
  }

  return positions;
};

export const handleSetElementsCoordinates = (
  coordinates: TSetElementsCoordinatesAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const positions = getPositions(coordinates, state.prevState);

  return {
    ...state,
    elements: {
      ...state.elements,
      allData: {
        ...state.elements.allData,
        ...positions.allData,
      },
      dynamicData: {
        ...state.elements.dynamicData,
        ...positions.dynamicData,
      },
    },
    selectedElements: {
      ...positions.selectedElements,
    },
  };
};
