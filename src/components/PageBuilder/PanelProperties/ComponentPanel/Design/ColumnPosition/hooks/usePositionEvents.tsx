import { first, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useBlurEvent } from './useBlurEvent';
import { useChangeEvent } from './useChangeEvent';
import { useMouseDownEvent } from './useMouseDownEvent';

// store
import {
  areParentsTheSameSelector,
  elementDataSelectorCreator,
  elementsSelector,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { hasSomeAlignment } from '../utils/hasSomeAlignment';
import { isMixed } from '../../utils/isMixed';

type TUsePositionEvents = {
  disabledAll: boolean;
  disabledX: boolean;
  disabledY: boolean;
  firstElement: TSelectedElement;
  hasAlignmentHorizontal: boolean;
  hasAlignmentVertical: boolean;
  isMultiple: boolean;
  onBlurX: TFunc;
  onBlurY: TFunc;
  onChangeX: TFunc<[string, boolean?]>;
  onChangeY: TFunc<[string, boolean?]>;
  onMouseDown: TFunc;
  showConstrains: boolean;
  typeInputX: HTMLInputElement['type'];
  typeInputY: HTMLInputElement['type'];
  x: string;
  y: string;
};

export const usePositionEvents = (): TUsePositionEvents => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const { alignment, coordinates, parentId, position } = element;
  const areParentsTheSame = useSelector(areParentsTheSameSelector);
  const elements = useSelector(elementsSelector);
  const hasAlignmentHorizontal = hasSomeAlignment('horizontal', elements, selectedElements);
  const hasAlignmentVertical = hasSomeAlignment('vertical', elements, selectedElements);
  const isRelative = selectedElements.some(({ position }) => position === 'relative');
  const isMixedX = isMixed(elements, firstElement, 'coordinates.x', selectedElements);
  const isMixedY = isMixed(elements, firstElement, 'coordinates.y', selectedElements);
  const isMultiple = size(selectedElements) > 1;
  const onBlurEvents = useBlurEvent(element, setX, setY, x, y);
  const onChangeEvents = useChangeEvent(isMultiple, isMixedX, isMixedY, setX, setY);
  const disabledAll = (hasAlignmentHorizontal || hasAlignmentVertical) && isMultiple;
  const disabledX = hasAlignmentHorizontal || isRelative || disabledAll;
  const disabledY = hasAlignmentVertical || isRelative || disabledAll;
  const typeInputX = isMixedX || hasAlignmentHorizontal ? 'text' : 'number';
  const typeInputY = isMixedY || hasAlignmentVertical ? 'text' : 'number';
  const showConstrains = (hasAlignmentHorizontal || hasAlignmentVertical) && areParentsTheSame;

  useEffect(() => {
    if (!isRelative) {
      const { x, y } = element.coordinates;

      setX(isMixedX ? 'Mixed' : x.toString());
      setY(isMixedY ? 'Mixed' : y.toString());
    } else {
      setX('0');
      setY('0');
    }
  }, [alignment, coordinates, parentId, position, isMultiple, isRelative]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    disabledAll,
    disabledX,
    disabledY,
    firstElement,
    hasAlignmentHorizontal,
    hasAlignmentVertical,
    isMultiple,
    onMouseDown: useMouseDownEvent(),
    showConstrains,
    typeInputX,
    typeInputY,
    x,
    y,
  };
};
