// types
import { TApplyElementsOpacityTypeAction, TPageBuilderState } from '../../types';

// utils
import { applyOpacityType } from './applyOpacityType';
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleApplyElementsOpacityType = (
  type: TApplyElementsOpacityTypeAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
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
            opacity: applyOpacityType(element, type),
          })),
        },
      },
    },
  };
};
