// types
import {
  TPageBuilderState,
  TSetElementCoordinatesActionPayload,
} from '../types';

export const handleSetElementCoordinates = (
  id: TSetElementCoordinatesActionPayload['id'],
  position: TSetElementCoordinatesActionPayload['coordinates'],
  state: TPageBuilderState,
): TPageBuilderState => ({
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
                  alignment: undefined,
                  coordinates: position,
                },
              },
              dynamicData: {
                ...state.pages[state.currentPage].elements.dynamicData,
                [id]: {
                  ...state.pages[state.currentPage].elements.dynamicData[id],
                  alignment: undefined,
                  coordinates: position,
                },
              },
            },
          },
        },
      }
    : {}),
});
