import { first, includes, mapValues } from 'lodash';

// types
import { TChangeAlignmentAction, TPageBuilderState } from '../../types';
import { TElement } from 'types';

// utils
import { extractObjectValues } from 'utils';
import { getDefaultCoordinates } from './getDefaultCoordinates';

export const getAlignmentData = (
  element: TElement,
  payload: TChangeAlignmentAction['payload'],
): Pick<TElement, 'alignment' | 'coordinates'> => {
  const { alignment, id, parentId } = element;
  const targetAlignment = { ...alignment, ...payload };
  const coordinates = getDefaultCoordinates(targetAlignment, id, parentId);

  return {
    alignment: targetAlignment,
    coordinates,
  };
};

export const handleChangeAlignment = (
  payload: TChangeAlignmentAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const { parentId } = first(selectedElements);
  const ids = extractObjectValues(selectedElements, ['id']);
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
          ...mapValues(currentPage.elements, (element, id) =>
            includes(ids, id) ? { ...element, ...getAlignmentData(element, payload) } : element,
          ),
          [parentId]: {
            ...currentPage.elements[parentId],
            children: [...elementsInRelativePosition, ...elementsInAbsolutePosition],
          },
        },
        selectedElements: selectedElements.map((selectedElement) => ({
          ...selectedElement,
          position: 'absolute',
        })),
      },
    },
  };
};
