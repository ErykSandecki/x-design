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
      secondaryKey === KeyboardKeys.d ||
      secondaryKey === KeyboardKeys.f ||
      secondaryKey === KeyboardKeys.r ||
      secondaryKey === KeyboardKeys.s)
  ) {
    event.preventDefault();
  }
};
