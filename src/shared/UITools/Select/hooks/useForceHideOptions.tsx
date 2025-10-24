import { useEffect } from 'react';

// core
import { usePopoverRoot } from '../../Popover/PopoverRoot/core/PopoverRootProvider';

export type TUseForceHideOptions = void;

export const useForceHideOptions = (selected: boolean, setSelected: TFunc<[boolean]>): TUseForceHideOptions => {
  const { selected: selectedPopover } = usePopoverRoot() || {};

  useEffect(() => {
    if (selectedPopover === false && selected) {
      setSelected(false);
    }
  }, [selectedPopover]);
};
