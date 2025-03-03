// types
import { MouseMode } from 'components/PageBuilder/enums';

export type TUseMouseDownEvent = (
  event: React.MouseEvent<HTMLElement, MouseEvent>,
) => void;

export const useMouseDownEvent = (
  mouseMode: MouseMode,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    if (event.button === 0 && mouseMode !== MouseMode.comment) {
      setIsPressing(true);

      if (handleMouseDown) {
        handleMouseDown(event);
      }
    }
  };

  return handleMouseDown;
};
