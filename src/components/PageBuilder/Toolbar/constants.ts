// assets
import { Icons } from 'assets/svg';

// types
import { MouseMode } from '../../../types/enums/mouseMode';
import { TObject } from 'types';

export const MOUSE_MODE_ICON: TObject<keyof typeof Icons, typeof MouseMode> = {
  [MouseMode.comment]: 'Comment',
  [MouseMode.default]: 'MoveTool',
  [MouseMode.move]: 'MoveHand',
  [MouseMode.toolBeltA]: 'FrameTool',
};
