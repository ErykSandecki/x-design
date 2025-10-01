import { includes, mapValues } from 'lodash';

// others
import { ZOOM_CONTENT_ID } from 'shared';

// types
import { TPageBuilderState, TSetElementsScoreToCurrentSizeActionPayload } from '../types';

// utils
import { extractObjectValues } from 'utils';
import { TElement } from 'types';

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
        elements: mapValues(currentPage.elements, (element, id) =>
          includes(ids, id)
            ? { ...element, [sizeType]: { ...element[sizeType], [scoreType]: getSize(element, sizeType, zoomContent) } }
            : element,
        ),
      },
    },
  };
};
