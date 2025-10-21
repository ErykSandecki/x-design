// types
import { TChangeLayoutAlignmentAction, TPageBuilderState } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleChangeLayoutAlignment = (
  alignment: TChangeLayoutAlignmentAction['payload'],
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
            layout: { ...element.layout, alignment },
          })),
        },
      },
    },
  };
};
