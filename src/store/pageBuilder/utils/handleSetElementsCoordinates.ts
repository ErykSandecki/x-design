// types
import { T2DCoordinates, TElement, TRectCoordinates } from 'types';
import {
  TPageBuilderState,
  TPositions,
  TSelectedElements,
  TSetElementsCoordinatesActionPayload,
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
  { x, y }: TSetElementsCoordinatesActionPayload['coordinates'],
  prevState: TSetElementsCoordinatesActionPayload['prevState'],
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
      positionAbsolute: { x: xA, y: yA },
      positionRelative: { x: xR, y: yR },
    } = allData[id];
    const positionAbsolute = { x: xA + x, y: yA + y };
    const positionRelative = { x: xR + x, y: yR + y };

    positions.allData = {
      ...positions.allData,
      [id]: { ...allData[id], positionAbsolute, positionRelative },
    };
    positions.dynamicData = {
      ...positions.dynamicData,
      [id]: { ...dynamicData[id], positionAbsolute, positionRelative },
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
  coordinates: TSetElementsCoordinatesActionPayload['coordinates'],
  prevState: TSetElementsCoordinatesActionPayload['prevState'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const positions = getPositions(coordinates, prevState);

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
