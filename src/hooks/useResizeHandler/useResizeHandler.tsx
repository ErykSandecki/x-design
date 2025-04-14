import { useState, useEffect, RefObject } from 'react';

// utils
import { handleMouseDown } from './utils/handleMouseDown';

type TUseResizeHandler = {
  height: number;
  isPressingX: boolean;
  isPressingY: boolean;
  onMouseDownX: (
    event: React.MouseEvent<HTMLElement>,
    isInverted: boolean,
  ) => void;
  onMouseDownY: (
    event: React.MouseEvent<HTMLElement>,
    isInverted: boolean,
  ) => void;
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
  width: number;
};

export const useResizeHandler = (
  initialHeight: number,
  initialWidth: number,
  maxHeight,
  maxWidth: number,
  minHeight: number,
  minWidth: number,
  ref: RefObject<HTMLElement>,
): TUseResizeHandler => {
  const [height, setHeight] = useState(initialHeight);
  const [isInvertedX, setIsInvertedX] = useState(false);
  const [isPressingX, setIsPressingX] = useState(false);
  const [isPressingY, setIsPressingY] = useState(false);
  const [isInvertedY, setIsInvertedY] = useState(false);
  const [width, setWidth] = useState(initialWidth);

  const handleMouseDownX = (
    event: React.MouseEvent<HTMLElement>,
    isInverted: boolean,
  ): void => {
    handleMouseDown(event, isInverted, setIsInvertedX, setIsPressingX);
  };

  const handleMouseDownY = (
    event: React.MouseEvent<HTMLElement>,
    isInverted: boolean,
  ): void => {
    handleMouseDown(event, isInverted, setIsInvertedY, setIsPressingY);
  };

  const handleMouseMoveX = (event: MouseEvent): void => {
    if (isPressingX) {
      const { left, right } = ref.current.getBoundingClientRect();

      const position = isInvertedX
        ? Math.abs(event.clientX - right)
        : event.clientX - left;

      switch (true) {
        case position < minWidth:
          setWidth(minWidth);
          break;
        case position > maxWidth:
          setWidth(maxWidth);
          break;
        default:
          setWidth(position);
          break;
      }
    }
  };

  const handleMouseMoveY = (event: MouseEvent): void => {
    if (isPressingY) {
      const { top, bottom } = ref.current.getBoundingClientRect();

      const position = isInvertedY
        ? event.clientY - bottom
        : event.clientY - top;

      switch (true) {
        case position < minHeight:
          setHeight(minHeight);
          break;
        case position > maxHeight:
          setHeight(maxHeight);
          break;
        default:
          setHeight(position);
          break;
      }
    }
  };

  const handleMouseUp = (): void => {
    setIsPressingX(false);
    setIsPressingY(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMoveX);
    document.addEventListener('mousemove', handleMouseMoveY);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveX);
      document.removeEventListener('mousemove', handleMouseMoveY);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [height, isInvertedX, isPressingX, isPressingY, isInvertedY, width]);

  useEffect(() => {
    if (isPressingX) {
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none !important';
    }

    return () => {
      document.body.style.cursor = 'initial';
      document.body.style.userSelect = 'initial';
    };
  }, [isPressingX]);

  useEffect(() => {
    if (isPressingY) {
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none !important';
    }

    return () => {
      document.body.style.cursor = 'initial';
      document.body.style.userSelect = 'initial';
    };
  }, [isPressingY]);

  return {
    height,
    isPressingX,
    isPressingY,
    onMouseDownX: handleMouseDownX,
    onMouseDownY: handleMouseDownY,
    setHeight,
    setWidth,
    width,
  };
};
