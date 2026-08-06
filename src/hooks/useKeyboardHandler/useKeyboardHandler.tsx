import React, { useEffect } from 'react';

// store
// import { drawerIdSelector } from '../../store/drawer/selectors';
// import { modalIdSelector } from '../../store/modal/selectors';

// types
import { KeyboardKeys } from '../../types/enums';
import { TKeysMap } from './types';

// utils
import { triggerActions } from './utils/triggerActions';

export type TUseKeyboardHandler = {
  onKeyDown: TFunc<[KeyboardEvent | React.KeyboardEvent<HTMLElement>]>;
};

export const useKeyboardHandler = (
  attachListener: boolean,
  dependencies: Array<any>,
  keysMap: TKeysMap,
  id?: string,
  lockBrowserEvents?: boolean,
  stopPropagation?: boolean,
): TUseKeyboardHandler => {
  // const drawerId = useSelector(drawerIdSelector);
  // const modalId = useSelector(modalIdSelector);

  const isPrimaryKey = (key: string): boolean =>
    [KeyboardKeys.alt, KeyboardKeys.control, KeyboardKeys.shift].includes(key as KeyboardKeys);

  const handleKeyDown = (
    event: KeyboardEvent | React.KeyboardEvent<HTMLElement> | Event,
  ): void => {
    if (stopPropagation) {
      // Event has stopPropagation
      (event as Event).stopPropagation();
    }

    // Only proceed if event has a keyboard 'key' property
    const maybeKeyboardEvent = event as KeyboardEvent | React.KeyboardEvent<HTMLElement>;
    if ('key' in maybeKeyboardEvent && !isPrimaryKey(maybeKeyboardEvent.key)) {
      triggerActions(maybeKeyboardEvent, keysMap, lockBrowserEvents);
    }
  };

  const updateEventHandler = (
    callback: (event: KeyboardEvent | React.KeyboardEvent<HTMLElement> | Event) => void,
    key: 'addEventListener' | 'removeEventListener',
    type: keyof WindowEventMap,
  ): void => {
    if (id) {
      document.getElementById(id)?.[key](type, callback as EventListener);
    } else {
      window[key](type, callback as EventListener);
    }
  };

  useEffect(() => {
    if (attachListener) {
      // attachListener && !drawerId && !modalId
      updateEventHandler(handleKeyDown, 'addEventListener', 'keydown');
    }

    return (): void => {
      updateEventHandler(handleKeyDown, 'removeEventListener', 'keydown');
    };
  }, [id, ...dependencies]); // drawerId, id, modalId, ...dependencies

  return {
    onKeyDown: handleKeyDown,
  };
};
