// types
import { TElements, TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';
import { findAllChildren } from '../findAllChildren';
import { negateValue } from 'utils/math/negateValue';
import { reverseAligment } from './reverseAligment';
import { reverseChildren } from './reverseChildren';

export const getFlippedElements = (axis: keyof T2DCoordinates, state: TPageBuilderState): TElements => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const childrenData = ids.map((id) => findAllChildren(elements, elements[id].children)).flat();
  const childrenIds = extractObjectValues(childrenData, ['id']);

  return {
    ...currentPage.elements,
    ...mapFilteredValues(currentPage.elements, ids, (element) => ({
      ...element,
      angle: negateValue(element.angle),
      children: reverseChildren(axis, element.children, element.layout),
      flip: { ...element.flip, [axis]: !element.flip[axis] },
    })),
    ...mapFilteredValues(currentPage.elements, childrenIds, (element) => ({
      ...element,
      alignment: reverseAligment(element.alignment, axis),
      children: reverseChildren(axis, element.children, element.layout),
    })),
  };
};
