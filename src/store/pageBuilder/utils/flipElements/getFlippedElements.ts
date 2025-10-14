// types
import { TElements, TSelectedElements, TStrictAxis } from 'store/pageBuilder/types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';
import { findAllChildren } from '../findAllChildren';
import { handleReverseAlignment } from './handleReverseAlignment';
import { handleReverseChildren } from './handleReverseChildren';
import { negateValue } from 'utils/math/negateValue';

export const getFlippedElements = (
  axis: TStrictAxis,
  elements: TElements,
  invertAngle: boolean,
  selectedElements: TSelectedElements,
): TElements => {
  if (axis.length) {
    const ids = extractObjectValues(selectedElements, ['id']);
    const childrenData = ids.map((id) => findAllChildren(elements, elements[id].children)).flat();
    const childrenIds = extractObjectValues(childrenData, ['id']);

    return {
      ...mapFilteredValues(elements, ids, (element) => ({
        ...element,
        angle: invertAngle ? negateValue(element.angle) : element.angle,
        children: handleReverseChildren(axis, element),
        flip: { ...element.flip, ...axis.reduce((obj, key) => ({ ...obj, [key]: !element.flip[key] }), {}) },
      })),
      ...mapFilteredValues(elements, childrenIds, (element) => ({
        ...element,
        alignment: handleReverseAlignment(axis, element),
        children: handleReverseChildren(axis, element),
      })),
    };
  }

  return elements;
};
