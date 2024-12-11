import React from 'react';

// types
import { KeyboardKeys } from 'types/enums';

export const handleLockBrowserEvents = (
  ctrlKey: boolean,
  event: KeyboardEvent | React.KeyboardEvent<HTMLElement>,
  secondaryKey: string,
): void => {
  if (
    ctrlKey &&
    (secondaryKey === KeyboardKeys['+'] ||
      secondaryKey === KeyboardKeys['-'] ||
      secondaryKey === KeyboardKeys.D ||
      secondaryKey === KeyboardKeys.d ||
      secondaryKey === KeyboardKeys.F ||
      secondaryKey === KeyboardKeys.f ||
      secondaryKey === KeyboardKeys.R ||
      secondaryKey === KeyboardKeys.r ||
      secondaryKey === KeyboardKeys.S ||
      secondaryKey === KeyboardKeys.s)
  ) {
    event.preventDefault();
  }
};
