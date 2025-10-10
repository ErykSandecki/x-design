import { defer } from 'lodash';
import { RefObject, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// store
import { unselectElement } from 'store/pageBuilder/actions';

// types
import { MouseButton } from 'types';

type TUseOutsideClickElement = void;

export const useOutsideClickElement = (
  elementRef: RefObject<any>,
  id: string,
  isSelected: boolean,
): TUseOutsideClickElement => {
  const dispatch = useDispatch();

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      !event.shiftKey &&
      event.buttons === MouseButton.lmb &&
      isSelected &&
      elementRef.current &&
      !elementRef.current.contains(event.target)
    ) {
      defer(() => {
        dispatch(unselectElement(id));
      });
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementRef, isSelected]);
};
