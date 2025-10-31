import { first, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import { elementDataSelectorCreator, selectedElementsSelector } from 'store/pageBuilder/selectors';

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
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const isMultiple = size(selectedElements) > 1;
  const { [score]: currentHeightScore } = element.height;
  const { [score]: currentWidthScore } = element.width;
  const { type: typeHeight, unit: unitHeight } = currentHeightScore || {};
  const { type: typeWidth, unit: unitWidth } = currentWidthScore || {};
  const [heightScore, setHeightScore] = useState('');
  const [widthScore, setWidthScore] = useState('');
  const attachedValueHeight = typeHeight !== 'fixed';
  const attachedValueWidth = typeWidth !== 'fixed';
  const onBlurEvents = useBlurEvent(element, heightScore, score, setHeightScore, setWidthScore, widthScore);
  const onChangeEvents = useChangeEvent(score, setHeightScore, setWidthScore);
  const valueScrubbaleInputHeight = parseFloat(heightScore);
  const valueScrubbaleInputWidth = parseFloat(widthScore);
  const visibleHeight = currentHeightScore !== undefined;
  const visibleWidth = currentWidthScore !== undefined;

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
