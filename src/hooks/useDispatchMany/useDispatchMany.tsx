import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// types
import { TAction } from 'types/redux';

export type TUseDispatchMany = TFunc<[...Array<TAction>]>;

export const useDispatchMany = (): TUseDispatchMany => {
  const dispatch = useDispatch();

  const dispatchMany = useCallback(
    (...actions: TAction[]): void => {
      actions.forEach((action) => dispatch(action));
    },
    [dispatch],
  );

  return dispatchMany;
};
