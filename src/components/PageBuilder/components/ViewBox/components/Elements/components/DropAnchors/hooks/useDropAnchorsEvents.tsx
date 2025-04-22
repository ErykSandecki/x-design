// hooks
import { useMouseEnterEvent } from './useMouseEnterEvent';
import { useMouseLeaveEvent } from './useMouseLeaveEvent';

// types
import { DropAnchorsPosition } from '../enums';
import { MouseMode } from 'types/enums/mouseMode';

export type TUseDropAnchorsEvents = {
  onMouseEnter: (dropAreaPosition: DropAnchorsPosition) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useDropAnchorsEvents = (
  index: number,
  mouseMode: MouseMode,
): TUseDropAnchorsEvents => ({
  onMouseEnter: useMouseEnterEvent(index, mouseMode),
  onMouseLeave: useMouseLeaveEvent(mouseMode),
});
