import { cloneDeep, first } from 'lodash';

// types
import { TChangeAlignmentAction, TPageBuilderState } from '../../types';

// utils
import { extracObjectValues } from 'utils';
import { getDefaultCoordinates } from './getDefaultCoordinates';

export const handleChangeAlignment = (
  payload: TChangeAlignmentAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const { allData } = elements;
  const { parentId } = first(selectedElements);
  const clonedElements = cloneDeep(elements);
  const ids = extracObjectValues(selectedElements, ['id']);
  const elementsInAbsolutePosition = extracObjectValues(selectedElements, ['id', 'type']);
  const elementsInRelativePosition = allData[parentId].children.filter((children) => !ids.includes(children.id));

  selectedElements.forEach(({ id, parentId }) => {
    const { alignment } = currentPage.elements.allData[id];
    const targetAlignment = { ...alignment, ...payload };
    const coordinates = getDefaultCoordinates(targetAlignment, id, parentId);

    clonedElements.allData[id].alignment = targetAlignment;
    clonedElements.allData[id].position = 'absolute';
    clonedElements.allData[id].coordinates = coordinates;
    clonedElements.dynamicData[id].alignment = targetAlignment;
    clonedElements.dynamicData[id].position = 'absolute';
    clonedElements.dynamicData[id].coordinates = coordinates;
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
            [parentId]: {
              ...currentPage.elements.allData[parentId],
              children: [...elementsInRelativePosition, ...elementsInAbsolutePosition],
            },
          },
          dynamicData: {
            ...currentPage.elements.dynamicData,
            ...clonedElements.dynamicData,
          },
          staticData: {
            ...currentPage.elements.staticData,
            [parentId]: {
              ...currentPage.elements.staticData[parentId],
              children: [...elementsInRelativePosition, ...elementsInAbsolutePosition],
            },
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
