// hooks
import { useKeyboardHandler } from 'hooks';

// types
import { KeyboardKeys } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

type TUseKeyDown = void;

export const useKeyDown = (
  setMouseMode: (mouseMode: MouseMode) => void,
): TUseKeyDown => {
  useKeyboardHandler(
    true,
    [],
    [
      {
        action: () => setMouseMode(MouseMode.comment),
        secondaryKey: KeyboardKeys.e,
      },
      {
        action: () => setMouseMode(MouseMode.default),
        secondaryKey: KeyboardKeys.escape,
      },
      {
        action: () => setMouseMode(MouseMode.default),
        secondaryKey: KeyboardKeys.q,
      },
      {
        action: () => setMouseMode(MouseMode.move),
        secondaryKey: KeyboardKeys.w,
      },
      {
        action: () => setMouseMode(MouseMode.toolBeltA),
        secondaryKey: KeyboardKeys.f,
      },
    ],
    '',
    true,
  );
};
