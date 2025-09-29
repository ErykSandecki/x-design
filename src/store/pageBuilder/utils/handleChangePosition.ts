import { first, includes, mapValues } from 'lodash';

// others
import { BASE_2D } from 'shared';

// types
import { TElements, TPageBuilderState } from '../types';

// utils
import { extractObjectValues } from 'utils';

export const handleChangePosition = (state: TPageBuilderState): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const { id, parentId } = first(selectedElements);
  const currentPosition = elements[id].position;
  const reversePosition = currentPosition === 'relative' ? 'absolute' : 'relative';
  const elementsInAbsolutePosition = extractObjectValues(selectedElements, ['id', 'type']);
  const elementsInRelativePosition = elements[parentId].children.filter((children) => !ids.includes(children.id));
  const targetCoordinates = BASE_2D;

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...(mapValues(currentPage.elements, (element, id) =>
            includes(ids, id)
              ? { ...element, alignment: {}, coordinates: targetCoordinates, position: reversePosition }
              : element,
          ) as TElements),
          [parentId]: {
            ...currentPage.elements[parentId],
            children: [...elementsInRelativePosition, ...elementsInAbsolutePosition],
          },
        },
        selectedElements: selectedElements.map((selectedElement) => ({
          ...selectedElement,
          position: reversePosition,
        })),
      },
    },
  };
};
