// others
import { HISTORY_CHANGED, PUSH, REDIRECT_TO } from './actionsType';

// types
import {
  THistoryChangedAction,
  THistoryChangedActionPayload,
  TPushAction,
  TRedirectToAction,
} from './types';

export const historyChanged = (
  action: THistoryChangedActionPayload['action'],
  location: THistoryChangedActionPayload['location'],
): THistoryChangedAction => ({
  payload: { action, location },
  type: HISTORY_CHANGED,
});

export const push = (payload: TPushAction['payload']): TPushAction => ({
  payload,
  type: PUSH,
});

export const redirectTo = (
  redirectTo: TRedirectToAction['payload'],
): TRedirectToAction => ({
  payload: redirectTo,
  type: REDIRECT_TO,
});
