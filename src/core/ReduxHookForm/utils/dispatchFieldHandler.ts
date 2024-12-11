import { Dispatch } from 'redux';

// types
import { TField, TUpdateFieldActions } from 'store/reduxHookForm/types';

// store
import { updateField } from 'store/reduxHookForm/actions';

export const dispatchFieldHandler =
  (dispatch: Dispatch, formName: string, name: string) =>
  (field: Partial<TField>, actionType: TUpdateFieldActions) =>
    dispatch(
      updateField(
        {
          field: {
            ...field,
          },
          formName,
          name,
        },
        actionType,
      ),
    );
