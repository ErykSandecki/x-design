import { debounce, throttle } from 'lodash';
import { RefObject, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// others
import { DEBOUNCE_TIME } from 'constant/constants';
import { THROTTLE_WAIT } from '../constants';

// store
import { setElementCoordinates } from 'store/pageBuilder/actions';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { updateElementPosition } from '../utils/updateElementPosition';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  id: TSelectedElement['id'],
  isMoving: boolean,
  isPressing: boolean,
  mouseMode: MouseMode,
  position: T2DCoordinates,
  setIsMoving: (isMoving: boolean) => void,
  setPosition: (position: T2DCoordinates) => void,
): TUseMouseMoveEvent => {
  const dispatch = useDispatch();
  const onUpdateCoordinatesDelay = useCallback(
    debounce((coordinates: T2DCoordinates) => {
      dispatch(setElementCoordinates(id, coordinates));
    }, DEBOUNCE_TIME),
    [],
  );

  const handleMouseMove = throttle((event: MouseEvent): void => {
    if (isPressing && mouseMode === MouseMode.default) {
      setIsMoving(true);
      updateElementPosition(
        cursorPosition,
        event,
        onUpdateCoordinatesDelay,
        setPosition,
      );
    }
  }, THROTTLE_WAIT);

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMoving, isPressing, mouseMode, position.x, position.y]);
};
