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
        elements: {
          ...state.elements,
          allData: {
            ...state.elements.allData,
            [id]: {
              ...state.elements.allData[id],
              coordinates: position,
            },
          },
          dynamicData: {
            ...state.elements.dynamicData,
            [id]: {
              ...state.elements.dynamicData[id],
              coordinates: position,
            },
          },
        },
      }
    : {}),
});
