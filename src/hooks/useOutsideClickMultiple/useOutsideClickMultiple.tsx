import { RefObject, useEffect, useState } from 'react';

// types
import { KeyboardKeys } from 'types';

export type TUseOutsideClickMultiple = {
  selected: boolean;
  setSelected: (flag: boolean) => void;
};

export const useOutsideClickMultiple = (
  dependencies: Array<any>,
  refs: Array<RefObject<any>>,
  callback?: (event: MouseEvent) => void,
  id?: string,
  ignoreLastCondition = false,
  disabledEscapeKeyDown = true,
): TUseOutsideClickMultiple => {
  const [selected, setSelected] = useState(false);

  const handleClickOutside = (event: Event): void => {
    const mouseEvent = event as MouseEvent;

    if (
      mouseEvent.button === 0 &&
      refs.every((ref) => ref.current) &&
      refs.every((ref) => !ref.current.contains(mouseEvent.target)) &&
      (ignoreLastCondition || selected)
    ) {
      if (callback) {
        callback(mouseEvent);
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

  const updateEventHandler = (key: 'addEventListener' | 'removeEventListener'): void => {
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

    return (): any => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [disabledEscapeKeyDown, selected, ...dependencies]);

  useEffect(() => {
    updateEventHandler('addEventListener');

    return (): any => {
      updateEventHandler('removeEventListener');
    };
  }, [callback, selected, refs, ...dependencies]);

  return { selected, setSelected };
};
