import { MouseEvent } from 'react';

// types
import { MousePosition } from '../../../../types';
import { TCarrotPlacement } from '../types';
import { TooltipPosition } from '../enums';

// utils
import { getMousePositionRelativeToScreen } from 'utils';

export const getPositionHorizontally = (
  event: MouseEvent | WheelEvent,
  carrotPlacement?: TCarrotPlacement,
): TooltipPosition => {
  const mousePosition = getMousePositionRelativeToScreen(event);

  switch (mousePosition) {
    case MousePosition.northWest:
      return TooltipPosition[`right${carrotPlacement || 'Start'}`];
    case MousePosition.southWest:
      return TooltipPosition[`right${carrotPlacement || 'End'}`];
    case MousePosition.northEast:
      return TooltipPosition[`left${carrotPlacement || 'Start'}`];
    default:
      return TooltipPosition[`left${carrotPlacement || 'End'}`];
  }
};
