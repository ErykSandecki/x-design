import { throttle } from 'lodash';
import { useEffect } from 'react';

// types
import { T2DCoordinates, TRGBA } from 'types';

// utils
import { extractColors } from '../utils/extractColors';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  setColors: (colors: Array<TRGBA>) => void,
  setMousePosition: (mousePosition: T2DCoordinates) => void,
  setIsPending: (isPending: boolean) => void,
): TUseMouseMoveEvent => {
  let timeout: NodeJS.Timeout;

  const handleMouseMove = throttle(async (event: MouseEvent): Promise<void> => {
    clearTimeout(timeout);
    setMousePosition({ x: event.clientX, y: event.clientY });
    setIsPending(true);

    timeout = setTimeout(async () => {
      const colors = await extractColors(event);

      setColors(colors);
      setIsPending(false);
    }, 100);
  }, 20);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};
