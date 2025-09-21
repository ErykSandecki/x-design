import { useEffect, useState } from 'react';

// hooks
import { useBlurEvent } from './useBlurEvent';
import { useChangeEvent } from './useChangeEvent';
import { useMouseDownEvent } from './useMouseDownEvent';

// types
import { TElement } from 'types';

type TUseRotationEvents = {
  angle: string;
  onBlur: () => void;
  onChange: (value: string, isScrubbableInput?: boolean) => void;
  onMouseDown: () => void;
};

export const useRotationEvents = (
  element: TElement,
  isMixed: boolean,
  isMultiple: boolean,
): TUseRotationEvents => {
  const { angle: currentAngle } = element;
  const [angle, setAngle] = useState('');
  const onBlur = useBlurEvent(angle, element, setAngle);
  const onChange = useChangeEvent(setAngle);

  useEffect(() => {
    setAngle(isMixed ? 'Mixed' : currentAngle.toString());
  }, [currentAngle, isMultiple]);

  return {
    angle,
    onBlur,
    onChange,
    onMouseDown: useMouseDownEvent(),
  };
};
