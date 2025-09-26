import { isNaN } from 'lodash';

// types
import {
  TPage,
  TPageBuilderState,
  TPositions,
  TSetElementsCoordinatesAction,
} from '../types';
import { T2DCoordinates } from 'types';

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
  {
    coordinates: currentCoordinates,
    mode,
  }: TSetElementsCoordinatesAction['payload'],
  prevPageState: TPage['prevState'],
  currentPage: TPage,
): TPositions => {
  const elements = currentPage.elements;
  const isDynamic = mode === 'dynamic';
  const { allData, dynamicData } = prevPageState.elements;
  const selectedElements = prevPageState.selectedElements;
  const positions: TPositions = {
    allData: {},
    dynamicData: {},
    selectedElements: [],
  };

  selectedElements.forEach(({ id, ...restData }) => {
    const alignment = elements.allData[id].alignment;
    const { coordinates: prevCoordinates } = allData[id];
    const coordinates = getCoordinates(
      currentCoordinates,
      isDynamic,
      prevCoordinates,
    );

    positions.allData = {
      ...positions.allData,
      [id]: { ...allData[id], alignment, coordinates },
    };
    positions.dynamicData = {
      ...positions.dynamicData,
      [id]: {
        ...dynamicData[id],
        alignment,
        coordinates,
      },
    };

    positions.selectedElements.push({
      ...restData,
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
    ? getPositions(
        coordinates,
        currentPage.prevState || currentPage,
        currentPage,
      )
    : {
        allData: {},
        dynamicData: {},
        selectedElements: currentPage.selectedElements,
      };

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
