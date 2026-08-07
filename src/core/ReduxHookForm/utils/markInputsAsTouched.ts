import { Dispatch } from '@reduxjs/toolkit';
import { keys } from 'lodash';

// store
import { setTouchedField } from 'store/reduxHookForm/reducer';

// types
import { TFields } from 'store/reduxHookForm/types';

export const markInputsAsTouched = (dispatch: Dispatch, formName: string, fields: TFields): void => {
  const fieldNames = keys(fields);

  fieldNames.forEach((fieldName) => {
    dispatch(
      setTouchedField({
        field: { touched: true },
        formName,
        name: fieldName,
      }),
    );
  });
};
