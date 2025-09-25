import { useEffect, useState } from 'react';

// types
import { TElement } from 'types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';

type TUseResizingEvents = TUseChangeEvent &
  TUseBlurEvent & {
    height: string;
    width: string;
  };

export const useResizingEvents = (
  element: TElement,
  isMixedHeight: boolean,
  isMixedWidth: boolean,
  isMultiple: boolean,
): TUseResizingEvents => {
  const { height: currentHeight, width: currentWidth } = element;
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const onBlurEvents = useBlurEvent(
    element,
    height,
    setHeight,
    setWidth,
    width,
  );
  const onChangeEvents = useChangeEvent(setHeight, setWidth);

  useEffect(() => {
    setHeight(isMixedHeight ? 'Mixed' : currentHeight.toString());
    setWidth(isMixedWidth ? 'Mixed' : currentWidth.toString());
  }, [currentHeight, currentWidth, isMultiple]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    height,
    width,
  };
};
