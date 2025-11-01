import { defer } from 'lodash';
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
import { TUseMouseDownEvent, useMouseDownEvent } from './useMouseDownEvent';

// utils
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

type TUseRotationEvents = {
  angle: string;
  currentAngle: TElement['angle'];
  isMixedAngle: boolean;
  onBlur: TUseBlurEvent;
  onChange: TUseChangeEvent;
  onMouseDown: TUseMouseDownEvent;
};

export const useRotationEvents = (): TUseRotationEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const currentAngle = useSelector(elementAttributeSelectorCreator('angle', firstElementId));
  const isMixedAngle = useSelector(isMixedSelectorCreator('angle'));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const [angle, setAngle] = useState('');
  const onBlur = useBlurEvent(angle, currentAngle, setAngle);
  const onChange = useChangeEvent(setAngle);

  useEffect(() => {
    defer(() => setAngle(normalizeMultipleValue(isMixedAngle, `${currentAngle.toString()}°`)));
  }, [currentAngle, isMultiple]);

  return {
    angle,
    currentAngle,
    isMixedAngle,
    onBlur,
    onChange,
    onMouseDown: useMouseDownEvent(),
  };
};
