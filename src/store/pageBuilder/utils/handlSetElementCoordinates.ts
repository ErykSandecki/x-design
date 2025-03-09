// types
import {
  TPageBuilderState,
  TSetElementCoordinatesActionPayload,
} from '../types';

export const handlSetElementCoordinates = (
  id: TSetElementCoordinatesActionPayload['id'],
  positionAbsolute: TSetElementCoordinatesActionPayload['positionAbsolute'],
  state: TPageBuilderState,
): TPageBuilderState => ({
  ...state,
  elements: {
    ...state.elements,
    allData: {
      ...state.elements.allData,
      [id]: {
        ...state.elements.allData[id],
        positionAbsolute,
      },
    },
    dynamicData: {
      ...state.elements.dynamicData,
      [id]: {
        ...state.elements.dynamicData[id],
        positionAbsolute,
      },
    },
  },
});
