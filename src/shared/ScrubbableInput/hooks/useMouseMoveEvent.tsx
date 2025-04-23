import { useEffect } from 'react';

// types
import { T2DCoordinates } from 'types';

// utils
import { handleUpdateMousePosition } from '../utils/handleUpdateMousePosition';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  max: number,
  min: number,
  mousePosition: T2DCoordinates | null,
  onChange: (value: number) => void,
  setMousePosition: (mousePosition: T2DCoordinates) => void,
  value: number,
): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    const speed = event.shiftKey ? 2 : 0.5;
    const targetValue = Math.round(
      Math.max(min, Math.min(max, value + event.movementX * speed)),
    );

    handleUpdateMousePosition(event, mousePosition, setMousePosition);
    onChange(targetValue);
  };

  useEffect(() => {
    if (mousePosition) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);
};
