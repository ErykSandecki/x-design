import { Dispatch } from '@reduxjs/toolkit';

// store
import { updateEventsStatus } from 'store/pageBuilder/reducer';

// types
import { MouseMode } from 'types';

export const onEscapeChangeMouseModeHandler = (dispatch: Dispatch, setMouseMode: TFunc<[MouseMode]>): void => {
  setMouseMode(MouseMode.default);
  dispatch(updateEventsStatus({ colorSampler: false }));
};
