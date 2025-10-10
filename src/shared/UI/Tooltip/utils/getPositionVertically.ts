import { MouseEvent } from 'react';

// types
import { MousePosition } from '../../../../types';
import { TCarrotPlacement } from '../types';
import { TooltipPosition } from '../enums';

// utils
import { getMousePositionRelativeToScreen } from 'utils';

export const getPositionVertically = (
  event: MouseEvent | WheelEvent,
  carrotPlacement?: TCarrotPlacement,
): TooltipPosition => {
  const mousePosition = getMousePositionRelativeToScreen(event);

  switch (mousePosition) {
    case MousePosition.northWest:
      return TooltipPosition[`bottom${carrotPlacement || 'Start'}`];
    case MousePosition.southWest:
      return TooltipPosition[`top${carrotPlacement || 'Start'}`];
    case MousePosition.northEast:
      return TooltipPosition[`bottom${carrotPlacement || 'End'}`];
    default:
      return TooltipPosition[`top${carrotPlacement || 'End'}`];
  }
};
