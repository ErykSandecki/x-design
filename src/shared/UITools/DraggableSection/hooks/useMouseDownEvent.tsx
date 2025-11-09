export type TUseMouseDownEvent = TFunc<[number]>;

export const useMouseDownEvent = (
  setDraggableItem: TFunc<[number]>,
  setIsPressing: TFunc<[boolean]>,
  setSelected: TFunc<[boolean]>,
): TUseMouseDownEvent => {
  const handleMouseDown = (index: number): void => {
    setDraggableItem(index);
    setIsPressing(true);
    setSelected(true);
  };

  return handleMouseDown;
};
