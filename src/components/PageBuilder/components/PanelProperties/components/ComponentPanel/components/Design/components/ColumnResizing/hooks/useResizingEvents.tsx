import { useEffect, useState } from 'react';

// types
import { TElement } from 'types';
import { TFocusElement } from '../types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';
import { TUseFocusEvent, useFocusEvent } from './useFocusEvent';

type TUseResizingEvents = TUseChangeEvent &
  TUseBlurEvent & {
    height: string;
    isFocused: TFocusElement;
    onFocus: TUseFocusEvent;
    unitHeight: TElement['height']['unit'];
    unitWidth: TElement['width']['unit'];
    width: string;
  };

export const useResizingEvents = (
  element: TElement,
  isMixedHeight: boolean,
  isMixedWidth: boolean,
  isMultiple: boolean,
): TUseResizingEvents => {
  const [isFocused, setIsFocused] = useState<TFocusElement>('');
  const {
    height: { unit: unitHeight, value: currentHeight },
    width: { unit: unitWidth, value: currentWidth },
  } = element;
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const onBlurEvents = useBlurEvent(element, height, setHeight, setIsFocused, setWidth, width);
  const onChangeEvents = useChangeEvent(setHeight, setWidth);
  const onFocusEvents = useFocusEvent(setIsFocused);

  useEffect(() => {
    setHeight(isMixedHeight ? 'Mixed' : currentHeight.toString());
    setWidth(isMixedWidth ? 'Mixed' : currentWidth.toString());
  }, [currentHeight, currentWidth, isMultiple]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    height,
    isFocused,
    onFocus: onFocusEvents,
    unitHeight,
    unitWidth,
    width,
  };
};
