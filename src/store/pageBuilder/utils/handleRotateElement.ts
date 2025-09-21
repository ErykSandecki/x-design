import { TPageBuilderState, TRotateElementActionPayload } from '../types';

export const handleRotateElement = (
  { id, rotate }: TRotateElementActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const fixedAngle = parseFloat(rotate.toFixed(2));

  return {
    ...state,
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
              rotate: fixedAngle,
            },
          },
          dynamicData: {
            ...state.pages[state.currentPage].elements.dynamicData,
            [id]: {
              ...state.pages[state.currentPage].elements.dynamicData[id],
              rotate: fixedAngle,
            },
          },
        },
      },
    },
  };
};
