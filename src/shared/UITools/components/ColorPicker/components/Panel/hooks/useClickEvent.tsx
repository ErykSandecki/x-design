import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { T2DCoordinates } from 'types';

export type TUseClickEvent = (event: MouseEvent) => void;

export const useClickEvent = (
  mousePosition: RefObject<T2DCoordinates>,
): TUseClickEvent => {
  const dispatch = useDispatch();

  const handleClick = (event: MouseEvent): void => {
    mousePosition.current = { x: event.clientX, y: event.clientY };

    dispatch(updateEventsStatus({ colorSampler: true }));
  };

  return handleClick;
};
