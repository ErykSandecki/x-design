// others
import { BASE_2D } from 'shared';

// types
import { AlignmentLayout, ElementType, LayoutType } from 'types';
import { TChangeLayoutAction, TPageBuilderState } from '../../types';

// utils
import { calculateCoordinatesAbsoluteToParent } from '../calculateCoordinatesAbsoluteToParent';
import { extractObjectValues, mapFilteredValues } from 'utils';
import { getGridLayout } from './getGridLayout';

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
  const isGrid = layoutType === LayoutType.grid;
  const allowedAbsolute = isFreeForm && !isGrid;

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
            children: element.children.filter(({ type }) => type !== ElementType.grid),
            layout: {
              ...element.layout,
              alignment: allowedAbsolute ? AlignmentLayout.none : AlignmentLayout.topLeft,
              gap: { column: { mode: 'fixed', value: 0 }, row: { mode: 'fixed', value: 0 } },
              grid: getGridLayout(element, layoutType),
              type: layoutType,
            },
          })),
          ...mapFilteredValues(currentPage.elements, childrenIds, (element) => {
            const elementHtml = document.getElementById(element.id);
            const valueHeight = parseInt(getComputedStyle(elementHtml).height);
            const valueWidth = parseInt(getComputedStyle(elementHtml).width);

            return {
              ...element,
              alignment: {},
              coordinates: allowedAbsolute
                ? calculateCoordinatesAbsoluteToParent(currentPage, element.id, element.parentId)
                : BASE_2D,
              height: isGrid
                ? { ...element.height, mode: 'auto', unit: undefined, value: valueHeight }
                : { ...element.height, value: valueHeight },
              position: allowedAbsolute ? 'absolute' : 'relative',
              width: isGrid
                ? { ...element.width, mode: 'auto', unit: undefined, value: valueWidth }
                : { ...element.width, value: valueWidth },
            };
          }),
        },
      },
    },
  };
};
