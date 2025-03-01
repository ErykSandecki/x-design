// assets
import { Icons } from 'assets/svg';

// types
import { MouseMode } from '../../../PageBuilder/enums';
import { TObject } from 'types';

export const MOUSE_MODE_ICON: TObject<keyof typeof Icons, typeof MouseMode> = {
  [MouseMode.comment]: 'Comment',
  [MouseMode.default]: 'MoveTool',
  [MouseMode.menu]: 'Logo',
  [MouseMode.move]: 'MoveHand',
  [MouseMode.toolBeltA]: 'FrameTool',
};
