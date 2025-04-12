// hooks
import { useMouseEnterEvent } from './useMouseEnterEvent';
import { useMouseLeaveEvent } from './useMouseLeaveEvent';

// types
import { DropAreaPosition } from '../enums';
import { MouseMode } from 'components/PageBuilder/enums';

export type TUseElementEvents = {
  onMouseEnter: (dropAreaPosition: DropAreaPosition) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useDropAreaEvents = (
  index: number,
  mouseMode: MouseMode,
): TUseElementEvents => ({
  onMouseEnter: useMouseEnterEvent(index, mouseMode),
  onMouseLeave: useMouseLeaveEvent(mouseMode),
});
