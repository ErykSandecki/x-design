import { isNaN } from 'lodash';

// types
import { TAlignment } from 'types';
import {
  TPageBuilderState,
  TSetElementCoordinatesActionPayload,
} from '../types';

export const handleSetElementCoordinates = (
  coordinates: TSetElementCoordinatesActionPayload['coordinates'],
  id: TSetElementCoordinatesActionPayload['id'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const element = currentPage.elements.allData[id];
  const prevCoordinates = element.coordinates;
  const isNanX = isNaN(coordinates.x);
  const isNanY = isNaN(coordinates.y);
  const targetCoordinates = {
    x: isNanX ? prevCoordinates.x : coordinates.x,
    y: isNanY ? prevCoordinates.y : coordinates.y,
  };
  const alignment: TAlignment = {
    ...(isNanX && element.alignment?.horizontal
      ? { horizontal: element.alignment.horizontal }
      : {}),
    ...(isNanY && element.alignment?.vertical
      ? { vertical: element.alignment?.vertical }
      : {}),
  };

  return {
    ...state,
    ...(state.events.canMoveElements
      ? {
          pages: {
            ...state.pages,
            [state.currentPage]: {
              ...state.pages[state.currentPage],
              elements: {
                ...state.pages[state.currentPage].elements,
                allData: {
                  ...state.pages[state.currentPage].elements.allData,
                  [id]: {
                    ...state.pages[state.currentPage].elements.allData[id],
                    alignment,
                    coordinates: targetCoordinates,
                  },
                },
                dynamicData: {
                  ...state.pages[state.currentPage].elements.dynamicData,
                  [id]: {
                    ...state.pages[state.currentPage].elements.dynamicData[id],
                    alignment,
                    coordinates: targetCoordinates,
                  },
                },
              },
            },
          },
        }
      : {}),
  };
};
