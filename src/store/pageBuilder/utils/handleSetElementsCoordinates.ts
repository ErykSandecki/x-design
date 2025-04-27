// types
import {
  TPage,
  TPageBuilderState,
  TPositions,
  TSetElementsCoordinatesAction,
} from '../types';

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

  selectedElements.forEach(({ id, ...restData }) => {
    const {
      coordinates: { x: xA, y: yA },
    } = allData[id];
    const position = { x: xA + x, y: yA + y };

    positions.allData = {
      ...positions.allData,
      [id]: { ...allData[id], alignment: undefined, coordinates: position },
    };
    positions.dynamicData = {
      ...positions.dynamicData,
      [id]: {
        ...dynamicData[id],
        alignment: undefined,
        coordinates: position,
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
    ? getPositions(coordinates, currentPage.prevState)
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
