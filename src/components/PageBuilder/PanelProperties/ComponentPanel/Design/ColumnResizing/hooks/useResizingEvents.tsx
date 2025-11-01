import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';

// utils
import { isPureNumber } from 'utils';
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

type TUseResizingEvents = TUseChangeEvent &
  TUseBlurEvent & {
    aspectRatio: boolean;
    attachedValueHeight: boolean;
    attachedValueWidth: boolean;
    elementHeight: TElement['height'];
    elementWidth: TElement['width'];
    height: string;
    isMixedHeight: boolean;
    isMixedWidth: boolean;
    valueScrubbaleInputHeight: number;
    valueScrubbaleInputWidth: number;
    visibleAspectRatioButton: boolean;
    width: string;
  };

export const useResizingEvents = (): TUseResizingEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isMixedAspectRatio = useSelector(isMixedSelectorCreator('aspectRatio'));
  const isMixedHeight = useSelector(isMixedSelectorCreator('height.value'));
  const isMixedWidth = useSelector(isMixedSelectorCreator('width.value'));
  const aspectRatio = useSelector(elementAttributeSelectorCreator('aspectRatio', firstElementId));
  const elementHeight = useSelector(elementAttributeSelectorCreator('height', firstElementId));
  const elementWidth = useSelector(elementAttributeSelectorCreator('width', firstElementId));
  const { type: typeHeight, unit: unitHeight, value: currentHeight } = elementHeight;
  const { type: typeWidth, unit: unitWidth, value: currentWidth } = elementWidth;
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const isPureHeight = isPureNumber(height);
  const isPureWidth = isPureNumber(width);
  const hasMixedSizes = isMixedHeight || isMixedWidth;
  const hasPureSizes = isPureHeight && isPureWidth;
  const hasNoUnit = unitHeight === undefined && unitWidth === undefined;
  const onBlurEvents = useBlurEvent(elementHeight, elementWidth, height, setHeight, setWidth, width);
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
    aspectRatio,
    attachedValueHeight,
    attachedValueWidth,
    elementHeight,
    elementWidth,
    height,
    isMixedHeight,
    isMixedWidth,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleAspectRatioButton,
    width,
  };
};
