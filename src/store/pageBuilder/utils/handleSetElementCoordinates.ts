// types
import {
  TPageBuilderState,
  TSetElementCoordinatesActionPayload,
} from '../types';

export const handleSetElementCoordinates = (
  id: TSetElementCoordinatesActionPayload['id'],
  position: TSetElementCoordinatesActionPayload['position'],
  state: TPageBuilderState,
): TPageBuilderState => ({
  ...state,
  elements: {
    ...state.elements,
    allData: {
      ...state.elements.allData,
      [id]: {
        ...state.elements.allData[id],
        position,
      },
    },
    dynamicData: {
      ...state.elements.dynamicData,
      [id]: {
        ...state.elements.dynamicData[id],
        position,
      },
    },
  },
});
