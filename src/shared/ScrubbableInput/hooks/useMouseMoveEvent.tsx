import { useEffect } from 'react';

// utils
import { handleUpdateMousePosition } from '../utils/handleUpdateMousePosition';
import { getRevertValue } from '../utils/getRevertValue';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  max: number,
  min: number,
  loop: boolean,
  mousePosition: T2DCoordinates | null,
  onChange: TFunc<[number]>,
  setMousePosition: TFunc<[T2DCoordinates]>,
  value: number,
): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    const speed = event.shiftKey ? 2 : 0.5;
    const convertedValue = Math.round(Math.max(min, Math.min(max, value + event.movementX * speed)));

    const shouldUseRevertValue = convertedValue === value && loop;
    const targetValue = shouldUseRevertValue ? getRevertValue(convertedValue, max, min, value) : convertedValue;

    handleUpdateMousePosition(event, mousePosition, setMousePosition);
    onChange(targetValue);
  };

  useEffect(() => {
    if (mousePosition) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);
};
