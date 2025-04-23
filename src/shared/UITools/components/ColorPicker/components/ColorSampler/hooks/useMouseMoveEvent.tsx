import { throttle } from 'lodash';
import { useEffect } from 'react';

// types
import { T2DCoordinates, TRGBA } from 'types';

// utils
import { extractColors } from '../utils/extractColors';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  initialMousePosition: T2DCoordinates,
  setColors: (colors: Array<TRGBA>) => void,
  setMousePosition: (mousePosition: T2DCoordinates) => void,
  setIsPending: (isPending: boolean) => void,
): TUseMouseMoveEvent => {
  let timeout: NodeJS.Timeout;

  const updateColor = (x: number, y: number): void => {
    timeout = setTimeout(async () => {
      const colors = await extractColors(x, y);

      setColors(colors);
      setIsPending(false);
    }, 100);
  };

  const handleMouseMove = throttle(async (event: MouseEvent): Promise<void> => {
    clearTimeout(timeout);
    setMousePosition({ x: event.clientX, y: event.clientY });
    setIsPending(true);
    updateColor(event.clientX, event.clientY);
  }, 20);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    updateColor(initialMousePosition.x, initialMousePosition.y);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
};
