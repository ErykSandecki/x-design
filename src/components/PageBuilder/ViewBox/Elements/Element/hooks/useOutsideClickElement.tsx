import { defer } from 'lodash';
import { RefObject, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from 'store';

// store
import { multipleSelectedElementsSelector } from 'store/pageBuilder/selectors';
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
      !elementRef.current.contains(event.target) &&
      !multipleSelectedElementsSelector(store.getState())
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
