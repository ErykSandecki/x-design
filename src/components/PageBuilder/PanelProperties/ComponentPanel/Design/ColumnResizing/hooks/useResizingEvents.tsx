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
import { TElement, TValueExtended } from 'types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';

// utils
import { isPureNumber } from 'utils';
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

type TUseResizingEvents = TUseChangeEvent &
  TUseBlurEvent & {
    aspectRatio: boolean;
    elementHeight: TElement['height'];
    elementWidth: TElement['width'];
    height: string;
    heightMode: TValueExtended['mode'];
    isMixedHeightMode: boolean;
    isMixedWidthMode: boolean;
    valueScrubbaleInputHeight: number;
    valueScrubbaleInputWidth: number;
    visibleAspectRatioButton: boolean;
    width: string;
    widthMode: TValueExtended['mode'];
  };

export const useResizingEvents = (): TUseResizingEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isMixedAspectRatio = useSelector(isMixedSelectorCreator('aspectRatio'));
  const isMixedHeightMode = useSelector(isMixedSelectorCreator('height.mode'));
  const isMixedHeightValue = useSelector(isMixedSelectorCreator('height.value'));
  const isMixedWidthMode = useSelector(isMixedSelectorCreator('width.mode'));
  const isMixedWidthValue = useSelector(isMixedSelectorCreator('width.value'));
  const aspectRatio = useSelector(elementAttributeSelectorCreator('aspectRatio', firstElementId));
  const elementHeight = useSelector(elementAttributeSelectorCreator('height', firstElementId));
  const elementWidth = useSelector(elementAttributeSelectorCreator('width', firstElementId));
  const { mode: heightMode, unit: unitHeight, value: currentHeight } = elementHeight;
  const { mode: widthMode, unit: unitWidth, value: currentWidth } = elementWidth;
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const isPureHeight = isPureNumber(height);
  const isPureWidth = isPureNumber(width);
  const hasMixedSizes = isMixedHeightValue || isMixedWidthValue;
  const hasPureSizes = isPureHeight && isPureWidth;
  const hasNoUnit = unitHeight === undefined && unitWidth === undefined;
  const onBlurEvents = useBlurEvent(elementHeight, elementWidth, height, setHeight, setWidth, width);
  const onChangeEvents = useChangeEvent(setHeight, setWidth, unitHeight, unitWidth);
  const valueScrubbaleInputHeight = isMultiple ? 0 : parseFloat(height);
  const valueScrubbaleInputWidth = isMultiple ? 0 : parseFloat(width);
  const visibleAspectRatioButton = !isMixedAspectRatio && !hasMixedSizes && hasPureSizes && hasNoUnit;

  useEffect(() => {
    setHeight(normalizeMultipleValue(isMixedHeightValue, currentHeight, unitHeight));
    setWidth(normalizeMultipleValue(isMixedWidthValue, currentWidth, unitWidth));
  }, [currentHeight, currentWidth, isMixedHeightValue, isMixedWidthValue, isMultiple, unitHeight, unitWidth]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    aspectRatio,
    elementHeight,
    elementWidth,
    height,
    heightMode,
    isMixedHeightMode,
    isMixedWidthMode,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleAspectRatioButton,
    width,
    widthMode,
  };
};
