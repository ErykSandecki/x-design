import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useBlurEvent } from './useBlurEvent';
import { useChangeEvent } from './useChangeEvent';
import { useMouseDownEvent } from './useMouseDownEvent';

// store
import { mainParentIdSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';

// utils
import { getCoordinates } from '../utils/getCoordinates';

type TUsePositionEvents = {
  onBlurX: () => void;
  onBlurY: () => void;
  onChangeX: (value: string, isScrubbableInput?: boolean) => void;
  onChangeY: (value: string, isScrubbableInput?: boolean) => void;
  onMouseDown: () => void;
  x: string;
  y: string;
};

export const usePositionEvents = (
  element: TElement,
  isMixedX: boolean,
  isMixedY: boolean,
  isMultiple: boolean,
  isRelative: boolean,
): TUsePositionEvents => {
  const { alignment, coordinates, parentId, position } = element;
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const mainParentId = useSelector(mainParentIdSelectorCreator(parentId));
  const onBlurEvents = useBlurEvent(element, isMultiple, setX, setY, x, y);
  const onChangeEvents = useChangeEvent(
    element,
    isMultiple,
    isMixedX,
    isMixedY,
    setX,
    setY,
    x,
    y,
  );

  useEffect(() => {
    if (!isRelative) {
      const { x, y } = getCoordinates(element, mainParentId);

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
    onMouseDown: useMouseDownEvent(),
    x,
    y,
  };
};
