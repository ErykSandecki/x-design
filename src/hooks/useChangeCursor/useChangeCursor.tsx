import { RefObject, useEffect, useState } from 'react';

// utils
import { resetCursor, updateCursor } from './utils';

export type TUseChangeCursor = {
  isPressing: boolean;
  onMouseDown: () => void;
  onMouseEnter: (angle: number, counterAngle: number) => void;
  onMouseLeave: () => void;
};

export const useChangeCursor = (
  currentAngle: number,
  contentRef: RefObject<HTMLElement>,
  cursor: string,
  cursorDefault: string,
): TUseChangeCursor => {
  const [counterAngle, setCounterAngle] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  const handleMouseDown = (): void => {
    setIsPressing(true);
  };

  const handleMouseEnter = (angle: number, counterAngle: number): void => {
    if (!isPressing) {
      updateCursor(angle, contentRef, cursor);
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
      updateCursor(counterAngle + currentAngle, contentRef, cursor);
    }
  }, [currentAngle]);

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mouseup', handleMouseUp);
    }

    return (): void => {
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
