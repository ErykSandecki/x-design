// others

// types
import { TAction } from 'types';
import { TPageBuilderState } from './types';

// utils

const initialState: TPageBuilderState = {
  isLoading: true,
  isPending: false,
};

const pageBuilder = (
  state: TPageBuilderState = initialState,
  action: TAction,
): TPageBuilderState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default pageBuilder;
