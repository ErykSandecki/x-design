// types
import { TChangeBackgroundActionPayload, TPageBuilderState } from '../types';

export const handleChangeBackground = (
  payload: TChangeBackgroundActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => ({
  ...state,
  elements: {
    ...state.elements,
    allData: {
      ...state.elements.allData,
      [payload.id]: {
        ...state.elements.allData[payload.id],
        backgroundColor: payload.backgroundColor,
      },
    },
    dynamicData: {
      ...state.elements.dynamicData,
      [payload.id]: {
        ...state.elements.dynamicData[payload.id],
        backgroundColor: payload.backgroundColor,
      },
    },
  },
});
