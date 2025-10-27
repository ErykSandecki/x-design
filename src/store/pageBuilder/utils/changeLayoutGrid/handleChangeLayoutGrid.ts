// types
import { TChangeLayoutGridAction, TPageBuilderState } from '../../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';
import { getCorrectChildren } from './getCorrectChildren';
import { getCorrectGrid } from './getCorrectGrid';

export const handleChangeLayoutGrid = (
  cell: TChangeLayoutGridAction['payload'],
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
          ...mapFilteredValues(currentPage.elements, ids, (element) => {
            const grid = getCorrectGrid(cell, element);

            return {
              ...element,
              children: getCorrectChildren(element.children, grid),
              layout: {
                ...element.layout,
                grid,
              },
            };
          }),
        },
      },
    },
  };
};
