import { includes, mapValues } from 'lodash';

// others
import { ZOOM_CONTENT_ID } from 'shared';

// types
import { TApplyElementsSizeTypeActionPaylad, TPageBuilderState } from '../../types';
import { TElement } from 'types';

// utils
import { applyTypeSize } from './applyTypeSize';
import { extractObjectValues } from 'utils';

export const getSizeData = (
  element: TElement,
  sizeType: TApplyElementsSizeTypeActionPaylad['sizeType'],
  type: TApplyElementsSizeTypeActionPaylad['type'],
  zoomContent: HTMLElement,
): TElement['height'] | TElement['width'] => {
  const elementHTML = zoomContent.querySelector(`#${element.id}`);
  const size = parseInt(getComputedStyle(elementHTML)[sizeType]);

  return applyTypeSize(element, size, sizeType, type);
};

export const handleApplyElementsSizeType = (
  payload: TApplyElementsSizeTypeActionPaylad,
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
        elements: mapValues(currentPage.elements, (element, id) =>
          includes(ids, id) ? { ...element, [sizeType]: getSizeData(element, sizeType, type, zoomContent) } : element,
        ),
      },
    },
  };
};
