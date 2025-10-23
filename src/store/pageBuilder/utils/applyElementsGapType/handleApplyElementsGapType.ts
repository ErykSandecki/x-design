// types
import { TApplyElementsGapTypeActionPaylad, TPageBuilderState } from '../../types';

// utils
import { applyGapType } from './applyGapType';
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleApplyElementsGapType = (
  payload: TApplyElementsGapTypeActionPaylad,
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { gap, type } = payload;
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
            layout: {
              ...element.layout,
              gap: {
                ...element.layout.gap,
                [gap]: applyGapType(element, gap, element.layout.gap[gap].value, type),
              },
            },
          })),
        },
      },
    },
  };
};
