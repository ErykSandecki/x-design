// types
import { TChangeVisibilityAction, TPageBuilderState } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleChangeVisibility = (
  visible: TChangeVisibilityAction['payload'],
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
            visible,
          })),
        },
      },
    },
  };
};
