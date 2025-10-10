import { first, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import { elementDataSelectorCreator, elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { TScore } from 'types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';

// utils
import { isMixed } from '../../utils/isMixed';

type TUseMinMaxSizeEvents = TUseChangeEvent &
  TUseBlurEvent & {
    height: string;
    isMixedHeight: boolean;
    isMixedWidth: boolean;
    valueScrubbaleInputHeight: number;
    valueScrubbaleInputWidth: number;
    visibleHeight: boolean;
    visibleWidth: boolean;
    width: string;
  };

export const useMinMaxSizeEvents = (score: keyof TScore): TUseMinMaxSizeEvents => {
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const isMultiple = size(selectedElements) > 1;
  const isMixedHeight = isMixed(elements, firstElement, `height.${score}`, selectedElements);
  const isMixedWidth = isMixed(elements, firstElement, `width.${score}`, selectedElements);
  const { [score]: currentHeightScore } = element.height;
  const { [score]: currentWidthScore } = element.width;
  const [heightScore, setHeightScore] = useState('');
  const [widthScore, setWidthScore] = useState('');
  const onBlurEvents = useBlurEvent(element, heightScore, score, setHeightScore, setWidthScore, widthScore);
  const onChangeEvents = useChangeEvent(score, setHeightScore, setWidthScore);
  const valueScrubbaleInputHeight = parseFloat(heightScore);
  const valueScrubbaleInputWidth = parseFloat(widthScore);
  const visibleHeight = heightScore !== undefined && !isMixedHeight;
  const visibleWidth = widthScore !== undefined && !isMixedWidth;

  useEffect(() => {
    setHeightScore(currentHeightScore?.toString());
    setWidthScore(currentWidthScore?.toString());
  }, [currentHeightScore, currentWidthScore, isMultiple]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    height: heightScore,
    isMixedHeight,
    isMixedWidth,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleHeight,
    visibleWidth,
    width: widthScore,
  };
};
