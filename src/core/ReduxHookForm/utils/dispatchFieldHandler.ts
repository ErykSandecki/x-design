import { ActionCreatorWithPayload, Dispatch } from '@reduxjs/toolkit';

// types
import { TField, TUpdateFieldActionPayload } from 'store/reduxHookForm/types';

export const dispatchFieldHandler =
  (dispatch: Dispatch, formName: string, name: string) =>
  (field: Partial<TField>, actionCreator: ActionCreatorWithPayload<TUpdateFieldActionPayload>): void => {
    dispatch(
      actionCreator({
        field: {
          ...field,
        },
        formName,
        name,
      }),
    );
  };
