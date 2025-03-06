import { defer } from 'lodash';
import { RefObject, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// store
import { removeSelectedElement } from 'store/pageBuilder/actions';

// types
import { MouseButton } from 'types';

type TUseOutsideClickElement = {
  selected: boolean;
  setSelected: (flag: boolean) => void;
};

export const useOutsideClickElement = (
  elementRef: RefObject<any>,
  id: string,
  isSelected: boolean,
): TUseOutsideClickElement => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      !event.shiftKey &&
      event.buttons === MouseButton.lmb &&
      selected &&
      elementRef.current &&
      !elementRef.current.contains(event.target)
    ) {
      defer(() => {
        setSelected(false);
        dispatch(removeSelectedElement(id));
      });
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selected, elementRef]);

  useEffect(() => {
    if (selected && !isSelected) {
      setSelected(false);
    } else if (!selected && isSelected) {
      setSelected(true);
    }
  }, [isSelected, selected]);

  return { selected, setSelected };
};
