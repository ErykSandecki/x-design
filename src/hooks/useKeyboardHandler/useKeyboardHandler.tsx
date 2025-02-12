import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// store
// import { drawerIdSelector } from '../../store/drawer/selectors';
// import { modalIdSelector } from '../../store/modal/selectors';

// types
import { KeyboardKeys } from '../../types/enums';
import { TKeysMap } from './types';

// utils
import { triggerActions } from './utils/triggerActions';

export type TUseKeyboardHandler = {
  onKeyDown: (event: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void;
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
    [KeyboardKeys.alt, KeyboardKeys.control, KeyboardKeys.shift].includes(
      key as KeyboardKeys,
    );

  const handleKeyDown = (
    event: KeyboardEvent | React.KeyboardEvent<HTMLElement>,
  ): void => {
    if (stopPropagation) {
      event.stopPropagation();
    }

    if (!isPrimaryKey(event.key)) {
      triggerActions(event, keysMap, lockBrowserEvents);
    }
  };

  const updateEventHandler = (
    callback: (event: KeyboardEvent) => void,
    key: 'addEventListener' | 'removeEventListener',
    type: keyof WindowEventMap,
  ): void => {
    if (id) {
      document.getElementById(id)?.[key](type, callback);
    } else {
      window[key](type, callback);
    }
  };

  useEffect(() => {
    if (attachListener) {
      // attachListener && !drawerId && !modalId
      updateEventHandler(handleKeyDown, 'addEventListener', 'keydown');
    }

    return () => {
      updateEventHandler(handleKeyDown, 'removeEventListener', 'keydown');
    };
  }, [id, ...dependencies]); // drawerId, id, modalId, ...dependencies

  return {
    onKeyDown: handleKeyDown,
  };
};
