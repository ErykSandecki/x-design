// types
import { TElement } from 'types';

// utils
import { isBaseParent } from 'utils';
import { mousePositionRelative } from 'shared';

export const getElementAreaMouseCoordinates = (
  coordinates: T3DCoordinates,
  event: MouseEvent | React.MouseEvent,
  parentId: TElement['parentId'],
): T2DCoordinates => {
  if (!isBaseParent(parentId)) {
    const { z } = coordinates;
    const { left, top } = document.getElementById(parentId).getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    return { x: x / z, y: y / z };
  }

  return mousePositionRelative(coordinates, event);
};
