import { cloneDeep } from 'lodash';

// others
import { ZOOM_CONTENT_ID } from 'shared';

// types
import { TApplyElementsSizeTypeActionPaylad, TPageBuilderState } from '../../types';

// utils
import { applyTypeSize } from './applyTypeSize';

export const handleApplyElementSizeType = (
  payload: TApplyElementsSizeTypeActionPaylad,
  state: TPageBuilderState,
): TPageBuilderState => {
  const { sizeType, type } = payload;
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const clonedElements = cloneDeep(elements);
  const zoomContent = document.getElementById(ZOOM_CONTENT_ID);

  selectedElements.forEach(({ id }) => {
    const element = zoomContent.querySelector(`#${id}`);
    const size = parseInt(getComputedStyle(element)[sizeType]);

    applyTypeSize(clonedElements, id, size, sizeType, type);
  });

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          allData: {
            ...currentPage.elements.allData,
            ...clonedElements.allData,
          },
          dynamicData: {
            ...currentPage.elements.dynamicData,
            ...clonedElements.dynamicData,
          },
        },
      },
    },
  };
};
