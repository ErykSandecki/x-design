import { noop } from 'lodash';
import { RefObject } from 'react';

// hooks
import { useForceHideOptions } from './useForceHideOptions';
import { useOutsideClick } from 'hooks';

// types
import { TUseClickEvents, useClickEvents } from './useClickEvents';

export type TUseSelectEvents = TUseClickEvents & {
  selected: boolean;
};

export const useSelectEvents = (
  idContainer: string | undefined,
  onChange: TFunc<[string]>,
  selectRef: RefObject<HTMLDivElement>,
): TUseSelectEvents => {
  const { selected, setSelected } = useOutsideClick([], selectRef, noop, idContainer);
  const onClickEvents = useClickEvents(onChange, setSelected);

  useForceHideOptions(selected, setSelected);

  return {
    ...onClickEvents,
    selected,
  };
};
