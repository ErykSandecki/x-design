import { cloneDeep, set } from 'lodash';

// types
import { TApplyElementsTypeActionPayload, TPageBuilderState } from '../../types';
import { TElement } from 'types';

// utils
import { applyMode } from './applyMode';
import { extractObjectValues, mapFilteredValues } from 'utils';

export const applyElementPropertyMode = (
  element: TElement,
  mode: TApplyElementsTypeActionPayload['mode'],
  properties: TApplyElementsTypeActionPayload['properties'],
): TElement => {
  properties.forEach((property) => {
    set(element, property, applyMode(element, mode, property));
  });

  return element;
};

export const handleApplyElementsType = (
  { mode, properties }: TApplyElementsTypeActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = state.pages[state.currentPage];
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
            ...applyElementPropertyMode(cloneDeep(element), mode, properties),
          })),
        },
      },
    },
  };
};
