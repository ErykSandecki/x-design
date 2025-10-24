import { CSSProperties, RefObject } from 'react';

// types
import { TooltipPosition } from '../enums';

const getCoordinates = (
  elementHeight: number,
  elementWidth: number,
  position: TooltipPosition,
  tooltipHeight: number,
  tooltipWidth: number,
  x: number,
  y: number,
): CSSProperties => {
  switch (position) {
    case TooltipPosition.topStart:
      return {
        left: `calc(${x}px - 17px + ${elementWidth / 2}px)`,
        top: `calc(${y}px - ${tooltipHeight}px - 7px)`,
      };
    case TooltipPosition.topCenter:
      return {
        left: `calc(${x}px - ${tooltipWidth / 2}px + ${elementWidth / 2}px)`,
        top: `calc(${y}px - ${tooltipHeight}px - 7px)`,
      };
    case TooltipPosition.topEnd:
      return {
        left: `calc(${x}px + 17px - ${tooltipWidth}px + ${elementWidth / 2}px)`,
        top: `calc(${y}px - ${tooltipHeight}px - 7px)`,
      };
    case TooltipPosition.bottomStart:
      return {
        left: `calc(${x}px - 14px + ${elementWidth / 2}px)`,
        top: `calc(${y}px + ${elementHeight}px + 7px)`,
      };
    case TooltipPosition.bottomCenter:
      return {
        left: `calc(${x}px - ${tooltipWidth / 2}px + ${elementWidth / 2}px)`,
        top: `calc(${y}px + ${elementHeight}px + 7px)`,
      };
    case TooltipPosition.bottomEnd:
      return {
        left: `calc(${x}px + 14px - ${tooltipWidth}px + ${elementWidth / 2}px)`,
        top: `calc(${y}px + ${elementHeight}px + 7px)`,
      };
    case TooltipPosition.leftStart:
      return {
        left: `calc(${x}px - ${tooltipWidth + 7}px)`,
        top: `calc(${y}px + ${elementHeight / 2}px - 14px)`,
      };
    case TooltipPosition.leftCenter:
      return {
        left: `calc(${x}px - ${tooltipWidth + 7}px)`,
        top: `calc(${y}px + ${elementHeight / 2}px - ${tooltipHeight / 2}px)`,
      };
    case TooltipPosition.leftEnd:
      return {
        left: `calc(${x}px - ${tooltipWidth + 7}px)`,
        top: `calc(${y}px + ${elementHeight / 2}px - ${tooltipHeight}px + 14px)`,
      };
    case TooltipPosition.rightStart:
      return {
        left: `calc(${x}px + ${elementWidth + 7}px)`,
        top: `calc(${y}px + ${elementHeight / 2}px - 14px)`,
      };
    case TooltipPosition.rightCenter:
      return {
        left: `calc(${x}px + ${elementWidth + 7}px)`,
        top: `calc(${y}px + ${elementHeight / 2}px - ${tooltipHeight / 2}px)`,
      };
    default:
      return {
        left: `calc(${x}px + ${elementWidth + 7}px)`,
        top: `calc(${y}px + ${elementHeight / 2}px - ${tooltipHeight}px + 14px)`,
      };
  }
};

export const getTooltipPosition = (
  elementRef: RefObject<HTMLElement>,
  position: TooltipPosition,
  tooltipRef: RefObject<HTMLDivElement>,
): CSSProperties => {
  if (tooltipRef.current && elementRef.current) {
    const { height: elementHeight, width: elementWidth, x, y } = elementRef.current.getBoundingClientRect();
    const { height: tooltipHeight, width: tooltipWidth } = tooltipRef.current.getBoundingClientRect();

    return getCoordinates(elementHeight, elementWidth, position, tooltipHeight, tooltipWidth, x, y);
  }

  return {};
};
