import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { TValueExtended, TValueScore } from 'types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';

// utils
import { normalizeMultipleValue } from 'components/PageBuilder/utils/normalizeMultipleValue';

type TUseMinMaxSizeEvents = TUseChangeEvent &
  TUseBlurEvent & {
    height: string;
    heightMode: TValueExtended['mode'];
    heightScore: TValueExtended;
    valueScrubbaleInputHeight: number;
    valueScrubbaleInputWidth: number;
    visibleHeight: boolean;
    visibleWidth: boolean;
    width: string;
    widthMode: TValueExtended['mode'];
    widthScore: TValueExtended;
  };

export const useMinMaxSizeEvents = (score: keyof TValueScore): TUseMinMaxSizeEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const elementHeight = useSelector(elementAttributeSelectorCreator('height', firstElementId));
  const elementWidth = useSelector(elementAttributeSelectorCreator('width', firstElementId));
  const { [score]: currentHeightScore } = elementHeight;
  const { [score]: currentWidthScore } = elementWidth;
  const { mode: heightMode, unit: unitHeight } = currentHeightScore || {};
  const { mode: widthMode, unit: unitWidth } = currentWidthScore || {};
  const [heightScore, setHeightScore] = useState('');
  const [widthScore, setWidthScore] = useState('');
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
    height: heightScore,
    heightMode,
    heightScore: currentHeightScore,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleHeight,
    visibleWidth,
    width: widthScore,
    widthMode,
    widthScore: currentWidthScore,
  };
};
