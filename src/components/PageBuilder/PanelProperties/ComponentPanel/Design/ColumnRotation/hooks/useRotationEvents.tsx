import { defer, first, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import { elementDataSelectorCreator, elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';
import { TUseMouseDownEvent, useMouseDownEvent } from './useMouseDownEvent';

// utils
import { isMixed } from '../../../../../utils/isMixed';
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

type TUseRotationEvents = {
  angle: string;
  element: TElement;
  isMixedAngle: boolean;
  onBlur: TUseBlurEvent;
  onChange: TUseChangeEvent;
  onMouseDown: TUseMouseDownEvent;
};

export const useRotationEvents = (): TUseRotationEvents => {
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const isMixedAngle = isMixed(elements, firstElement, 'angle', selectedElements);
  const isMultiple = size(selectedElements) > 1;
  const { angle: currentAngle } = element;
  const [angle, setAngle] = useState('');
  const onBlur = useBlurEvent(angle, element, setAngle);
  const onChange = useChangeEvent(setAngle);

  useEffect(() => {
    defer(() => setAngle(normalizeMultipleValue(isMixedAngle, `${currentAngle.toString()}°`)));
  }, [currentAngle, isMultiple]);

  return {
    angle,
    element,
    isMixedAngle,
    onBlur,
    onChange,
    onMouseDown: useMouseDownEvent(),
  };
};
