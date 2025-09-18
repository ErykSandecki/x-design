import { useEffect, useState } from 'react';

// hooks
import { useBlurEvent } from './useBlurEvent';
import { useChangeEvent } from './useChangeEvent';
import { useMouseDownEvent } from './useMouseDownEvent';

// types
import { TElement } from 'types';

type TUsePositionEvents = {
  onBlurX: () => void;
  onBlurY: () => void;
  onChangeX: (value: string, isScrubbableInput?: boolean) => void;
  onChangeY: (value: string, isScrubbableInput?: boolean) => void;
  onMouseDown: () => void;
  x: string;
  y: string;
};

export const usePositionEvents = (
  element: TElement,
  isMixedX: boolean,
  isMixedY: boolean,
  isMultiple: boolean,
  isRelative: boolean,
): TUsePositionEvents => {
  const { alignment, coordinates, parentId, position } = element;
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const onBlurEvents = useBlurEvent(element, isMultiple, setX, setY, x, y);
  const onChangeEvents = useChangeEvent(
    isMultiple,
    isMixedX,
    isMixedY,
    setX,
    setY,
  );

  useEffect(() => {
    if (!isRelative) {
      const { x, y } = element.coordinates;

      setX(isMixedX ? 'Mixed' : x.toString());
      setY(isMixedY ? 'Mixed' : y.toString());
    } else {
      setX('0');
      setY('0');
    }
  }, [alignment, coordinates, parentId, position, isMultiple, isRelative]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    onMouseDown: useMouseDownEvent(),
    x,
    y,
  };
};
