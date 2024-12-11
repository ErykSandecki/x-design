import { Dispatch } from 'redux';
import { keys } from 'lodash';

// others
import { SET_TOUCHED_FIELD } from 'store/reduxHookForm/actionsType';

// store
import { updateField } from 'store/reduxHookForm/actions';

// types
import { TFields } from 'store/reduxHookForm/types';

export const markInputsAsTouched = (
  dispatch: Dispatch,
  formName: string,
  fields: TFields,
): void => {
  const fieldNames = keys(fields);

  fieldNames.forEach((fieldName) => {
    dispatch(
      updateField(
        {
          field: { touched: true },
          formName,
          name: fieldName,
        },
        SET_TOUCHED_FIELD,
      ),
    );
  });
};
