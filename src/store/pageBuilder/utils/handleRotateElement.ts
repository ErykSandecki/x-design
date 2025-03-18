import { TPageBuilderState, TRotateElementActionPayload } from '../types';

export const handleRotateElement = (
  { id, rotate }: TRotateElementActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => ({
  ...state,
  elements: {
    ...state.elements,
    allData: {
      ...state.elements.allData,
      [id]: {
        ...state.elements.allData[id],
        rotate,
      },
    },
    dynamicData: {
      ...state.elements.dynamicData,
      [id]: {
        ...state.elements.dynamicData[id],
        rotate,
      },
    },
  },
});
