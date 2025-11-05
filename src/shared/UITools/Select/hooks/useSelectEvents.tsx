import { RefObject } from 'react';

// hooks
import { useForceHideOptions } from './useForceHideOptions';
import { useOutsideClickMultiple } from 'hooks';

// types
import { TUseClickEvents, useClickEvents } from './useClickEvents';

export type TUseSelectEvents = TUseClickEvents & {
  selected: boolean;
};

export const useSelectEvents = (
  idContainer: string | undefined,
  onChange: TFunc<[string]>,
  onClose: TFunc,
  optionsRef: RefObject<HTMLDivElement>,
  selectRef: RefObject<HTMLDivElement>,
): TUseSelectEvents => {
  const { selected, setSelected } = useOutsideClickMultiple([], [optionsRef, selectRef], onClose, idContainer);
  const onClickEvents = useClickEvents(onChange, setSelected);

  useForceHideOptions(selected, setSelected);

  return {
    ...onClickEvents,
    selected,
  };
};
