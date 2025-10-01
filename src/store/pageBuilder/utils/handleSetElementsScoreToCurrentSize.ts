// others
import { ZOOM_CONTENT_ID } from 'shared';

// types
import { TElement } from 'types';
import { TPageBuilderState, TSetElementsScoreToCurrentSizeActionPayload } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const getSize = (
  element: TElement,
  sizeType: TSetElementsScoreToCurrentSizeActionPayload['sizeType'],
  zoomContent: HTMLElement,
): number => {
  const elementHTML = zoomContent.querySelector(`#${element.id}`);
  const size = parseInt(getComputedStyle(elementHTML)[sizeType]);

  return size;
};

export const handleSetElementsScoreToCurrentSize = (
  scoreType: TSetElementsScoreToCurrentSizeActionPayload['scoreType'],
  sizeType: TSetElementsScoreToCurrentSizeActionPayload['sizeType'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const zoomContent = document.getElementById(ZOOM_CONTENT_ID);

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
            [sizeType]: { ...element[sizeType], [scoreType]: getSize(element, sizeType, zoomContent) },
          })),
        },
      },
    },
  };
};
