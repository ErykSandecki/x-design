import { debounce, DebouncedFunc } from 'lodash';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// others
import {
  SET_PENDING_FIELD,
  UPDATE_ASYNC_ERRORS,
  UPDATE_SYNC_ERRORS,
} from 'store/reduxHookForm/actionsType';

// store
import {
  fieldsSelectorCreator,
  formAttributesSelectorCreator,
} from 'store/reduxHookForm/selectors';

// types
import { TAsyncValidator, TFieldValue, TSyncValidator } from '../../../types';
import { TField } from 'store/reduxHookForm/types';
import { TMainState } from 'types/reducers';

// utils
import { dispatchFieldHandler } from '../../../utils/dispatchFieldHandler';
import {
  getErrorsFromAsyncValidators,
  getErrorsFromSyncValidators,
} from '../../../utils/validators';

export type TUseValidator = {
  getAsyncErrors: (value: TFieldValue) => Promise<Array<string>>;
  getSyncErrors: (value: TFieldValue) => Array<string>;
  subscriptionFieldsValues: Array<TFieldValue | undefined>;
  updateAsyncValidators: DebouncedFunc<(value: TFieldValue) => Promise<void>>;
  updateSyncValidators: (value: TFieldValue) => void;
};

export const useValidators = (
  asyncValidators: Array<TAsyncValidator>,
  formName: string,
  name: string,
  subscriptionFields: Array<string>,
  syncValidators: Array<TSyncValidator>,
): TUseValidator => {
  const { t } = useTranslation();
  const dispatchField = dispatchFieldHandler(useDispatch(), formName, name);

  const asyncTimeDelay = (useSelector(
    formAttributesSelectorCreator('asyncTimeDelay', formName),
  ) || 0) as number;

  const fields: { [key: string]: TField } | undefined = useSelector(
    (state: TMainState) => {
      if (subscriptionFields.length) {
        return fieldsSelectorCreator(formName, subscriptionFields)(state);
      }

      return undefined;
    },
  );

  const subscriptionFieldsValues = subscriptionFields.map(
    (fieldName) => fields && fields[fieldName]?.value,
  );

  const getAsyncErrors = async (value: TFieldValue): Promise<Array<string>> => {
    dispatchField({ isPending: true }, SET_PENDING_FIELD);

    return await getErrorsFromAsyncValidators(
      asyncValidators,
      value,
      fields,
      t,
    );
  };

  const getSyncErrors = (value: TFieldValue): Array<string> =>
    getErrorsFromSyncValidators(syncValidators, value, fields, t);

  const updateAsyncValidators = useCallback(
    debounce(async (value: TFieldValue) => {
      if (asyncValidators.length) {
        const asyncErrors = await getAsyncErrors(value);

        dispatchField({ asyncErrors, isPending: false }, UPDATE_ASYNC_ERRORS);
      }
    }, asyncTimeDelay),
    [],
  );

  const updateSyncValidators = (value: TFieldValue): void => {
    if (syncValidators.length) {
      dispatchField({ syncErrors: getSyncErrors(value) }, UPDATE_SYNC_ERRORS);
    }
  };

  return {
    getAsyncErrors,
    getSyncErrors,
    subscriptionFieldsValues,
    updateAsyncValidators,
    updateSyncValidators,
  };
};
