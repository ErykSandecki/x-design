import { RefObject, useEffect, useState } from 'react';

// types
import { KeyboardKeys } from '../../types';

export type TUseOutsideClick = {
  selected: boolean;
  setSelected: (flag: boolean) => void;
};

export const useOutsideClick = (
  dependencies: Array<any>,
  ref?: RefObject<any>,
  callback?: (event: MouseEvent) => void,
  id?: string,
  ignoreLastCondition = false,
  disabledEscapeKeyDown = true,
): TUseOutsideClick => {
  const [selected, setSelected] = useState(false);

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      event.button === 0 &&
      ref &&
      ref.current &&
      !ref.current.contains(event.target) &&
      (ignoreLastCondition || selected)
    ) {
      if (callback) {
        callback(event);
      }

      setSelected(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (key === KeyboardKeys.escape) {
      setSelected(false);
    }
  };

  const updateEventHandler = (
    key: 'addEventListener' | 'removeEventListener',
  ): void => {
    if (id) {
      document.getElementById(id)?.[key]('mousedown', handleClickOutside);
    } else {
      document[key]('mousedown', handleClickOutside);
    }
  };

  useEffect(() => {
    if (!disabledEscapeKeyDown) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [disabledEscapeKeyDown, selected, ...dependencies]);

  useEffect(() => {
    updateEventHandler('addEventListener');

    return (): void => {
      updateEventHandler('removeEventListener');
    };
  }, [callback, selected, ref, ...dependencies]);

  return { selected, setSelected };
};
