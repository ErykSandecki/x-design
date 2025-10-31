import { first, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import { elementDataSelectorCreator, elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';

// utils
import { isMixed } from '../../../../../utils/isMixed';
import { isPureNumber } from 'utils';
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

type TUseResizingEvents = TUseChangeEvent &
  TUseBlurEvent & {
    aspectRatio: boolean;
    attachedValueHeight: boolean;
    attachedValueWidth: boolean;
    element: TElement;
    height: string;
    isMixedHeight: boolean;
    isMixedWidth: boolean;
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
  const { type: typeHeight, unit: unitHeight, value: currentHeight } = element.height;
  const { type: typeWidth, unit: unitWidth, value: currentWidth } = element.width;
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const isPureHeight = isPureNumber(height);
  const isPureWidth = isPureNumber(width);
  const hasMixedSizes = isMixedHeight || isMixedWidth;
  const hasPureSizes = isPureHeight && isPureWidth;
  const hasNoUnit = unitHeight === undefined && unitWidth === undefined;
  const onBlurEvents = useBlurEvent(element, height, setHeight, setWidth, width);
  const onChangeEvents = useChangeEvent(setHeight, setWidth, unitHeight, unitWidth);
  const attachedValueHeight = typeHeight !== 'fixed' && !isMixedHeight;
  const attachedValueWidth = typeWidth !== 'fixed' && !isMixedWidth;
  const valueScrubbaleInputHeight = isMultiple ? 0 : parseFloat(height);
  const valueScrubbaleInputWidth = isMultiple ? 0 : parseFloat(width);
  const visibleAspectRatioButton = !isMixedAspectRatio && !hasMixedSizes && hasPureSizes && hasNoUnit;

  useEffect(() => {
    setHeight(normalizeMultipleValue(isMixedHeight, currentHeight, unitHeight));
    setWidth(normalizeMultipleValue(isMixedWidth, currentWidth, unitWidth));
  }, [currentHeight, currentWidth, isMultiple, unitHeight, unitWidth]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    aspectRatio: element.aspectRatio,
    attachedValueHeight,
    attachedValueWidth,
    element,
    height,
    isMixedHeight,
    isMixedWidth,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleAspectRatioButton,
    width,
  };
};
