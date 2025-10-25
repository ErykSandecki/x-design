import { RefObject } from 'react';

// types
import { TUseMouseEnterEvent, useMouseEnterEvent } from './useMouseEnterEvent';
import { TUseMouseLeaveEvent, useMouseLeaveEvent } from './useMouseLeaveEvent';
import { TUseStyle, useStyle } from './useStyle';

export type TUseSelectOptionsEvents = {
  onMouseEnter: TUseMouseEnterEvent;
  onMouseLeave: TUseMouseLeaveEvent;
  style: TUseStyle;
};

export const useSelectOptionsEvents = (
  onMouseEnter: TFunc<[string]>,
  onMouseLeave: TFunc<[string]>,
  optionsRef: RefObject<HTMLDivElement>,
  selected: boolean,
  value: string | Array<string>,
  wrapperRef: RefObject<HTMLDivElement>,
): TUseSelectOptionsEvents => {
  const onMouseEnterEvent = useMouseEnterEvent(onMouseEnter);
  const onMouseLeaveEvent = useMouseLeaveEvent(onMouseLeave);
  const style = useStyle(optionsRef, selected, value, wrapperRef);

  return {
    onMouseEnter: onMouseEnterEvent,
    onMouseLeave: onMouseLeaveEvent,
    style,
  };
};
