import { RefObject, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// store
import {
  areaAxisSelectorCreator,
  eventSelectorCreator,
} from 'store/pageBuilder/selectors';
import { store } from 'store';
import { setElementSizes } from 'store/pageBuilder/actions';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { T2DCoordinates, TElement } from 'types';
import { handleResizeElement } from '../utils/handleResizeElement';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  height: TElement['height'],
  id: TElement['id'],
  width: TElement['width'],
  x: TElement['positionAbsolute']['x'],
  y: TElement['positionAbsolute']['y'],
): TUseMouseMoveEvent => {
  const anchor = useSelector(eventSelectorCreator('selectedAnchor'));
  const dispatch = useDispatch();

  const handleMouseMove = (event: MouseEvent): void => {
    event.stopPropagation();
    handleResizeElement(
      cursorPosition,
      dispatch,
      event,
      height,
      id,
      width,
      x,
      y,
    );
  };

  useEffect(() => {
    if (anchor !== Anchor.none) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [anchor, cursorPosition.current.x, cursorPosition.current.y]);
};
