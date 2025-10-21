// others
import { BASE_2D } from 'shared';

// types
import { AlignmentFlow, LayoutType } from 'types';
import { TChangeLayoutAction, TPageBuilderState } from '../types';

// utils
import { calculateCoordinatesAbsoluteToParent } from './calculateCoordinatesAbsoluteToParent';
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleChangeLayout = (
  layoutType: TChangeLayoutAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const children = selectedElements.map(({ id }) => elements[id].children).flat();
  const childrenIds = extractObjectValues(children, ['id']);
  const isFreeForm = layoutType === LayoutType.freeForm;

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
            layout: {
              ...element.layout,
              alignment: isFreeForm ? AlignmentFlow.none : AlignmentFlow.topLeft,
              type: layoutType,
            },
          })),
          ...mapFilteredValues(currentPage.elements, childrenIds, (element) => ({
            ...element,
            alignment: {},
            coordinates: isFreeForm
              ? calculateCoordinatesAbsoluteToParent(currentPage, element.id, element.parentId)
              : BASE_2D,
            position: isFreeForm ? 'absolute' : 'relative',
          })),
        },
      },
    },
  };
};
