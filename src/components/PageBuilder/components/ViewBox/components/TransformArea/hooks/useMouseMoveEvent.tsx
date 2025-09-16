import { RefObject, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { AnchorResize } from 'store/pageBuilder/enums';
import { T2DCoordinates, TElement } from 'types';

// utils
import { handleResizeElement } from '../utils/handleResizeElement';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  height: TElement['height'],
  id: TElement['id'],
  width: TElement['width'],
  x: TElement['coordinates']['x'],
  y: TElement['coordinates']['y'],
): TUseMouseMoveEvent => {
  const anchorResize = useSelector(
    eventSelectorCreator('selectedAnchorResize'),
  );
  const dispatch = useDispatch();

  const handleMouseMoveAnchorResize = (event: MouseEvent): void => {
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
    if (anchorResize !== AnchorResize.none) {
      window.addEventListener('mousemove', handleMouseMoveAnchorResize);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveAnchorResize);
    };
  }, [anchorResize, cursorPosition.current.x, cursorPosition.current.y]);
};
