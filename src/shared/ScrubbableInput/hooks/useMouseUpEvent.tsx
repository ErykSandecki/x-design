// types

export type TUseMouseUpEvent = TFunc;

export const useMouseUpEvent = (
  onMouseUp: () => void,
  setMousePosition: (mousePosition: T2DCoordinates) => void,
): TUseMouseUpEvent => {
  const handleMouseUp = (): void => {
    setMousePosition(null);
    onMouseUp();
    document.exitPointerLock?.();
  };

  return handleMouseUp;
};
