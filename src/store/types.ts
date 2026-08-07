import { Store } from '@reduxjs/toolkit';

// types
import { TAction } from 'types/redux';
import { TMainState } from 'types/reducers';

export type TStore = Store<TMainState, TAction<any>> & {
  dispatch: unknown;
};
