// types
import { TElement } from 'types';
import { TElements } from '../types';

export const getParentsAngles = (
  angles: Array<TElement['angle']>,
  elements: TElements,
  parentId: TElement['id'],
): Array<TElement['angle']> => {
  if (parentId !== '-1') {
    const parent = elements[parentId];

    return getParentsAngles([...angles, parent.angle], elements, parent.parentId);
  }

  return angles;
};
