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
    const z = areaAxisSelectorCreator('z')(store.getState());
    const { current } = cursorPosition;
    const baseCoordinates = {
      x1: x,
      x2: x + width,
      y1: y,
      y2: y + height,
    };
    const mousePosition = {
      x: Math.round(event.clientX / z - current.x / z),
      y: Math.round(event.clientY / z - current.y / z),
    };

    dispatch(
      setElementSizes(baseCoordinates, height, id, mousePosition, width),
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
