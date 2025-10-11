import { first } from 'lodash';

// others
import { BASE_2D } from 'shared';

// types
import { TPageBuilderState } from '../types';

// utils
import { calculateCoordinatesAbsoluteToParent } from './calculateCoordinatesAbsoluteToParent';
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleChangePosition = (state: TPageBuilderState): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const { id, parentId } = first(selectedElements);
  const currentPosition = elements[id].position;
  const reversePosition = currentPosition === 'relative' ? 'absolute' : 'relative';
  const elementsInAbsolutePosition = extractObjectValues(selectedElements, ['id', 'type']);
  const elementsInRelativePosition = elements[parentId].children.filter((children) => !ids.includes(children.id));

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
            alignment: {},
            coordinates:
              reversePosition === 'absolute'
                ? calculateCoordinatesAbsoluteToParent(currentPage, element.id, element.parentId)
                : BASE_2D,
            position: reversePosition,
          })),
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
