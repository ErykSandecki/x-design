import { useEffect, useState } from 'react';

// types
import { TElement } from 'types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';
import { TUseMouseDownEvent, useMouseDownEvent } from './useMouseDownEvent';

type TUseRotationEvents = {
  angle: string;
  onBlur: TUseBlurEvent;
  onChange: TUseChangeEvent;
  onMouseDown: TUseMouseDownEvent;
};

export const useRotationEvents = (element: TElement, isMixed: boolean, isMultiple: boolean): TUseRotationEvents => {
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
