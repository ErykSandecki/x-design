import { includes, mapValues } from 'lodash';

// types
import { TChangeLayoutAction, TPageBuilderState } from '../types';

// utils
import { extractObjectValues } from 'utils';

export const handleChangeLayout = (
  layoutType: TChangeLayoutAction['payload'],
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
        elements: mapValues(currentPage.elements, (element, id) =>
          includes(ids, id) ? { ...element, layout: { ...element.layout, type: layoutType } } : element,
        ),
      },
    },
  };
};
