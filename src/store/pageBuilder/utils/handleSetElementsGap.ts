// types
import { TPageBuilderState, TSetElementsGapActionPayload } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleSetElementsGap = (
  payload: TSetElementsGapActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const { gap, value } = payload;
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          ...mapFilteredValues(currentPage.elements, ids, (element) => ({
            ...element,
            layout: { ...element.layout, gap: { ...element.layout.gap, [gap]: { ...element.layout.gap[gap], value } } },
          })),
        },
      },
    },
  };
};
