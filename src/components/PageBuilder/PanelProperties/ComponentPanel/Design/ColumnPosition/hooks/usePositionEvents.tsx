import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useBlurEvent } from './useBlurEvent';
import { useChangeEvent } from './useChangeEvent';
import { useMouseDownEvent } from './useMouseDownEvent';

// store
import {
  areParentsTheSameSelector,
  elementAttributeNestedSelectorCreator,
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  hasSomeAlignmentSelectorCreator,
  hasSomeRelativePositionSelector,
  isMixedSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// utils
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

type TUsePositionEvents = {
  disabledAll: boolean;
  disabledX: boolean;
  disabledY: boolean;
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
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const alignment = useSelector(elementAttributeSelectorCreator('alignment', firstElementId));
  const currentX = useSelector(elementAttributeNestedSelectorCreator<number>('coordinates.x', firstElementId));
  const currentY = useSelector(elementAttributeNestedSelectorCreator<number>('coordinates.y', firstElementId));
  const parentId = useSelector(elementAttributeSelectorCreator('parentId', firstElementId));
  const position = useSelector(elementAttributeSelectorCreator('position', firstElementId));
  const areParentsTheSame = useSelector(areParentsTheSameSelector);
  const hasAlignmentHorizontal = useSelector(hasSomeAlignmentSelectorCreator('horizontal'));
  const hasAlignmentVertical = useSelector(hasSomeAlignmentSelectorCreator('vertical'));
  const isRelative = useSelector(hasSomeRelativePositionSelector);
  const isMixedX = useSelector(isMixedSelectorCreator('coordinates.x'));
  const isMixedY = useSelector(isMixedSelectorCreator('coordinates.y'));
  const onBlurEvents = useBlurEvent(currentX, currentY, setX, setY, x, y);
  const onChangeEvents = useChangeEvent(isMultiple, isMixedX, isMixedY, setX, setY);
  const disabledAll = (hasAlignmentHorizontal || hasAlignmentVertical) && isMultiple;
  const disabledX = hasAlignmentHorizontal || isRelative || disabledAll;
  const disabledY = hasAlignmentVertical || isRelative || disabledAll;
  const typeInputX = isMixedX || hasAlignmentHorizontal ? 'text' : 'number';
  const typeInputY = isMixedY || hasAlignmentVertical ? 'text' : 'number';
  const showConstrains = (hasAlignmentHorizontal || hasAlignmentVertical) && areParentsTheSame;

  useEffect(() => {
    if (!isRelative) {
      setX(normalizeMultipleValue(isMixedX, currentX));
      setY(normalizeMultipleValue(isMixedY, currentY));
    } else {
      setX('0');
      setY('0');
    }
  }, [alignment, currentX, currentY, parentId, position, isMultiple, isRelative]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    disabledAll,
    disabledX,
    disabledY,
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
