// types
import { TApplyElementsInsetTypeActionPayload, TPageBuilderState } from '../../types';

// utils
import { applyInsetType } from './applyInsetType';
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleApplyElementsInsetType = (
  payload: TApplyElementsInsetTypeActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { insets, name, type } = payload;
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
            [name]: {
              ...element[name],
              ...insets
                .map((key) => ({
                  [key]: applyInsetType(element, key, element[name][key].value, name, type),
                }))
                .reduce((prev, next) => ({ ...prev, ...next }), {}),
            },
          })),
        },
      },
    },
  };
};
