import { CSSProperties, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';

// types
import { TCarrotPlacement } from '../types';
import { TooltipPosition } from '../enums';

// utils
import { getPositionHorizontally } from '../utils/getPositionHorizontally';
import { getPositionVertically } from '../utils/getPositionVertically';
import { getTooltipPosition } from '../utils/getTooltipPosition';

type TUseUpdatePosition = {
  onMouseEnter: TFunc<[MouseEvent]>;
  onMouseLeave: TFunc<[MouseEvent]>;
  position: TooltipPosition;
  styles: CSSProperties;
  visible: boolean;
};

export const useUpdatePosition = (
  autoPositioning: boolean,
  autoPositioningCarrotPlacement: TCarrotPlacement,
  autoPositioningHorizontal: boolean,
  elementRef: RefObject<HTMLDivElement>,
  initialVisible: boolean,
  initialPosition: TooltipPosition,
  tooltipRef: RefObject<HTMLDivElement>,
): TUseUpdatePosition => {
  const refTimeout = useRef(null);
  const [position, setPosition] = useState(initialPosition);
  const [styles, setStyles] = useState<CSSProperties>({});
  const [visible, setVisible] = useState(initialVisible);

  const updatePosition = (event: MouseEvent | WheelEvent): void => {
    let targetPosition = position;

    if (autoPositioning) {
      targetPosition = autoPositioningHorizontal
        ? getPositionHorizontally(event, autoPositioningCarrotPlacement)
        : getPositionVertically(event, autoPositioningCarrotPlacement);

      setPosition(targetPosition);
    }

    setStyles(getTooltipPosition(elementRef, targetPosition, tooltipRef));
  };

  const handleMouseEnter = (event: MouseEvent): void => {
    refTimeout.current = setTimeout(() => {
      updatePosition(event);
      setVisible(true);
    }, 1000);
  };

  const handleMouseLeave = (): void => {
    clearTimeout(refTimeout.current);
    setVisible(false);
  };

  const handleMouseWheel = (event: WheelEvent): void => {
    updatePosition(event);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleMouseWheel);

    return (): void => {
      window.removeEventListener('wheel', handleMouseWheel);
    };
  });

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    position,
    styles,
    visible,
  };
};
