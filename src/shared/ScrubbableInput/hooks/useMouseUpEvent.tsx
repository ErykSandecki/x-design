// types
import { T2DCoordinates } from 'types';

export type TUseMouseUpEvent = () => void;

export const useMouseUpEvent = (
  setMousePosition: (mousePosition: T2DCoordinates) => void,
): TUseMouseUpEvent => {
  const handleMouseUp = (): void => {
    setMousePosition(null);
    document.exitPointerLock?.();
  };

  return handleMouseUp;
};
