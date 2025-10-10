import { first, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import { elementDataSelectorCreator, elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';
import { TFocusElement } from '../types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';
import { TUseFocusEvent, useFocusEvent } from './useFocusEvent';

// utils
import { isMixed } from '../../../utils/isMixed';
import { isPureNumber } from 'utils';

type TUseResizingEvents = TUseChangeEvent &
  TUseBlurEvent & {
    aspectRatio: boolean;
    height: string;
    inputHeightType: HTMLInputElement['type'];
    inputWidthType: HTMLInputElement['type'];
    isMixedHeight: boolean;
    isMixedWidth: boolean;
    isPureHeight: boolean;
    isPureWidth: boolean;
    onFocus: TUseFocusEvent;
    showHeightChip: boolean;
    showWidthChip: boolean;
    unitHeight: TElement['height']['unit'];
    unitWidth: TElement['width']['unit'];
    valueInputHeight: string;
    valueInputWidth: string;
    valueScrubbaleInputHeight: number;
    valueScrubbaleInputWidth: number;
    visibleAspectRatioButton: boolean;
    width: string;
  };

export const useResizingEvents = (): TUseResizingEvents => {
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const isMultiple = size(selectedElements) > 1;
  const isMixedAspectRatio = isMixed(elements, firstElement, 'aspectRatio', selectedElements);
  const isMixedHeight = isMixed(elements, firstElement, 'height.value', selectedElements);
  const isMixedWidth = isMixed(elements, firstElement, 'width.value', selectedElements);
  const [isFocused, setIsFocused] = useState<TFocusElement>('');
  const { unit: unitHeight, value: currentHeight } = element.height;
  const { unit: unitWidth, value: currentWidth } = element.width;
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const isPureHeight = isPureNumber(height);
  const isPureWidth = isPureNumber(width);
  const hasMixedSizes = isMixedHeight || isMixedWidth;
  const hasPureSizes = isPureHeight && isPureWidth;
  const hasNoUnit = unitHeight === undefined && unitWidth === undefined;
  const onBlurEvents = useBlurEvent(element, height, setHeight, setIsFocused, setWidth, width);
  const onChangeEvents = useChangeEvent(setHeight, setWidth);
  const onFocusEvents = useFocusEvent(setIsFocused);
  const inputHeightType = isMixedHeight || !isPureHeight ? 'text' : 'number';
  const inputWidthType = isMixedWidth || !isPureWidth ? 'text' : 'number';
  const showHeightChip = isFocused !== 'height' && (!isPureHeight || unitHeight) && !isMixedHeight;
  const showWidthChip = isFocused !== 'width' && (!isPureWidth || unitWidth) && !isMixedWidth;
  const valueInputHeight = (isPureHeight && (!unitHeight || isFocused === 'height')) || isMixedHeight ? height : '';
  const valueInputWidth = (isPureWidth && (!unitWidth || isFocused === 'width')) || isMixedWidth ? width : '';
  const valueScrubbaleInputHeight = isMultiple ? 0 : parseFloat(height);
  const valueScrubbaleInputWidth = isMultiple ? 0 : parseFloat(width);
  const visibleAspectRatioButton = !isMixedAspectRatio && !hasMixedSizes && hasPureSizes && hasNoUnit;

  useEffect(() => {
    setHeight(isMixedHeight ? 'Mixed' : currentHeight.toString());
    setWidth(isMixedWidth ? 'Mixed' : currentWidth.toString());
  }, [currentHeight, currentWidth, isMultiple]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    aspectRatio: element.aspectRatio,
    height,
    inputHeightType,
    inputWidthType,
    isMixedHeight,
    isMixedWidth,
    isPureHeight,
    isPureWidth,
    onFocus: onFocusEvents,
    showHeightChip,
    showWidthChip,
    unitHeight,
    unitWidth,
    valueInputHeight,
    valueInputWidth,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleAspectRatioButton,
    width,
  };
};
