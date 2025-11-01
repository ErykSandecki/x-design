import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { TScore, TSize } from 'types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';

// utils
import { normalizeMultipleValue } from 'components/PageBuilder/utils/normalizeMultipleValue';

type TUseMinMaxSizeEvents = TUseChangeEvent &
  TUseBlurEvent & {
    attachedValueHeight: boolean;
    attachedValueWidth: boolean;
    height: string;
    heightScore: TSize;
    valueScrubbaleInputHeight: number;
    valueScrubbaleInputWidth: number;
    visibleHeight: boolean;
    visibleWidth: boolean;
    width: string;
    widthScore: TSize;
  };

export const useMinMaxSizeEvents = (score: keyof TScore): TUseMinMaxSizeEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const elementHeight = useSelector(elementAttributeSelectorCreator('height', firstElementId));
  const elementWidth = useSelector(elementAttributeSelectorCreator('width', firstElementId));
  const { [score]: currentHeightScore } = elementHeight;
  const { [score]: currentWidthScore } = elementWidth;
  const { type: typeHeight, unit: unitHeight } = currentHeightScore || {};
  const { type: typeWidth, unit: unitWidth } = currentWidthScore || {};
  const [heightScore, setHeightScore] = useState('');
  const [widthScore, setWidthScore] = useState('');
  const attachedValueHeight = typeHeight !== 'fixed';
  const attachedValueWidth = typeWidth !== 'fixed';
  const onChangeEvents = useChangeEvent(score, setHeightScore, setWidthScore);
  const valueScrubbaleInputHeight = parseFloat(heightScore);
  const valueScrubbaleInputWidth = parseFloat(widthScore);
  const visibleHeight = currentHeightScore !== undefined;
  const visibleWidth = currentWidthScore !== undefined;
  const onBlurEvents = useBlurEvent(
    elementHeight,
    elementWidth,
    heightScore,
    score,
    setHeightScore,
    setWidthScore,
    widthScore,
  );

  useEffect(() => {
    setHeightScore(normalizeMultipleValue(false, currentHeightScore?.value ?? '', unitHeight));
    setWidthScore(normalizeMultipleValue(false, currentWidthScore?.value ?? '', unitWidth));
  }, [currentHeightScore, currentWidthScore, isMultiple, unitHeight, unitWidth]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    attachedValueHeight,
    attachedValueWidth,
    height: heightScore,
    heightScore: currentHeightScore,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleHeight,
    visibleWidth,
    width: widthScore,
    widthScore: currentWidthScore,
  };
};
