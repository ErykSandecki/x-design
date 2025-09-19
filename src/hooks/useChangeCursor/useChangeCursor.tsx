import { RefObject, useEffect, useState } from 'react';

// utils
import { resetCursor, updateCursor } from './utils';

export type TUseChangeCursor = {
  isPressing: boolean;
  onMouseDown: () => void;
  onMouseEnter: (rotate: number, counterAngle: number) => void;
  onMouseLeave: () => void;
};

export const useChangeCursor = (
  contentRef: RefObject<HTMLElement>,
  currentRotate: number,
  cursor: string,
  cursorDefault: string,
): TUseChangeCursor => {
  const [counterAngle, setCounterAngle] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  const handleMouseDown = (): void => {
    setIsPressing(true);
  };

  const handleMouseEnter = (rotate: number, counterAngle: number): void => {
    if (!isPressing) {
      updateCursor(contentRef, cursor, rotate);
      setCounterAngle(counterAngle);
    }
  };

  const handleMouseLeave = (): void => {
    if (!isPressing) {
      resetCursor(contentRef, cursorDefault);
    }
  };

  const handleMouseUp = (): void => {
    setIsPressing(false);
    resetCursor(contentRef, cursorDefault);
  };

  useEffect(() => {
    if (isPressing) {
      updateCursor(contentRef, cursor, counterAngle + currentRotate);
    }
  }, [currentRotate]);

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPressing]);

  return {
    isPressing,
    onMouseDown: handleMouseDown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};
