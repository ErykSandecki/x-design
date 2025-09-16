import { RefObject, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';
import { T2DCoordinates, TElement } from 'types';

// utils
import { handleResizeElement } from '../utils/handleResizeElement';
import { handleRotateElement } from '../utils/handleRotateElement';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  cursorBaseAngle: RefObject<number>,
  cursorPosition: RefObject<T2DCoordinates>,
  elementRef: RefObject<HTMLDivElement>,
  height: TElement['height'],
  id: TElement['id'],
  rotate: TElement['rotate'],
  width: TElement['width'],
  x: TElement['coordinates']['x'],
  y: TElement['coordinates']['y'],
): TUseMouseMoveEvent => {
  const anchorResize = useSelector(
    eventSelectorCreator('selectedAnchorResize'),
  );
  const anchorRotate = useSelector(
    eventSelectorCreator('selectedAnchorRotate'),
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

  const handleMouseMoveAnchorRotate = (event: MouseEvent): void => {
    event.stopPropagation();

    handleRotateElement(
      cursorBaseAngle,
      dispatch,
      elementRef,
      event,
      id,
      rotate,
    );
  };

  useEffect(() => {
    if (anchorResize !== AnchorResize.none) {
      window.addEventListener('mousemove', handleMouseMoveAnchorResize);
    }

    if (anchorRotate !== AnchorRotate.none) {
      window.addEventListener('mousemove', handleMouseMoveAnchorRotate);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveAnchorResize);
      window.removeEventListener('mousemove', handleMouseMoveAnchorRotate);
    };
  }, [
    anchorResize,
    anchorRotate,
    cursorBaseAngle,
    cursorPosition.current.x,
    cursorPosition.current.y,
  ]);
};
