import { isNaN } from 'lodash';

// types
import {
  TPage,
  TPageBuilderState,
  TPositions,
  TSetElementsCoordinatesAction,
} from '../types';

export const getPositions = (
  { coordinates: { x, y }, mode }: TSetElementsCoordinatesAction['payload'],
  prevPageState: TPage['prevState'],
): TPositions => {
  const isDynamic = mode === 'dynamic';
  const { allData, dynamicData } = prevPageState.elements;
  const selectedElements = prevPageState.selectedElements;
  const positions: TPositions = {
    allData: {},
    dynamicData: {},
    selectedElements: [],
  };

  selectedElements.forEach(({ id, ...restData }) => {
    const {
      coordinates: { x: prevX, y: prevY },
    } = allData[id];
    const coordinates = isDynamic
      ? { x: prevX + (isNaN(x) ? 0 : x), y: prevY + (isNaN(y) ? 0 : y) }
      : { x: isNaN(x) ? prevX : x, y: isNaN(y) ? prevY : y };

    positions.allData = {
      ...positions.allData,
      [id]: { ...allData[id], alignment: {}, coordinates },
    };
    positions.dynamicData = {
      ...positions.dynamicData,
      [id]: {
        ...dynamicData[id],
        alignment: {},
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
    ? getPositions(coordinates, currentPage.prevState || currentPage)
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
