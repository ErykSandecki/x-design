// others
import { ZOOM_CONTENT_ID } from 'shared';

// types
import { TApplyElementsSizeTypeActionPayload, TPageBuilderState } from '../../types';
import { TElement } from 'types';

// utils
import { applyTypeSize } from './applyTypeSize';
import { extractObjectValues, mapFilteredValues } from 'utils';

export const getSizeData = (
  element: TElement,
  sizeType: TApplyElementsSizeTypeActionPayload['sizeType'],
  type: TApplyElementsSizeTypeActionPayload['type'],
  zoomContent: HTMLElement,
): TElement['height'] | TElement['width'] => {
  const elementHTML = zoomContent.querySelector(`#${element.id}`);
  const size = parseInt(getComputedStyle(elementHTML)[sizeType]);

  return applyTypeSize(element, size, sizeType, type);
};

export const handleApplyElementsSizeType = (
  payload: TApplyElementsSizeTypeActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { sizeType, type } = payload;
  const { selectedElements } = currentPage;
  const zoomContent = document.getElementById(ZOOM_CONTENT_ID);
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
            [sizeType]: getSizeData(element, sizeType, type, zoomContent),
          })),
        },
      },
    },
  };
};
