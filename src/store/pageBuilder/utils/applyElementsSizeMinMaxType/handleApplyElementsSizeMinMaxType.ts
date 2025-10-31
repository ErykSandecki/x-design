// others
import { ZOOM_CONTENT_ID } from 'shared';

// types
import { TElement } from 'types';
import { TApplyElementsSizeMinMaxTypeActionPayload, TPageBuilderState } from '../../types';

// utils
import { applyTypeSizeMinMax } from './applyTypeSizeMinMax';
import { extractObjectValues, mapFilteredValues } from 'utils';

export const getSizeData = (
  element: TElement,
  sizeType: TApplyElementsSizeMinMaxTypeActionPayload['sizeType'],
  scoreType: TApplyElementsSizeMinMaxTypeActionPayload['scoreType'],
  type: TApplyElementsSizeMinMaxTypeActionPayload['type'],
  zoomContent: HTMLElement,
): TElement['height'] | TElement['width'] => {
  const elementHTML = zoomContent.querySelector(`#${element.id}`);
  const size = parseInt(getComputedStyle(elementHTML)[sizeType]);

  return applyTypeSizeMinMax(element, scoreType, size, sizeType, type);
};

export const handleApplyElementsSizeMinMaxType = (
  payload: TApplyElementsSizeMinMaxTypeActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { scoreType, sizeType, type } = payload;
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
            [sizeType]: {
              ...element[sizeType],
              [scoreType]: getSizeData(element, sizeType, scoreType, type, zoomContent),
            },
          })),
        },
      },
    },
  };
};
