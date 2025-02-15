import { defer, isEmpty } from 'lodash';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// core
import { FormContext } from '../../Form/Form';

// store
import { fieldSelectorCreator } from 'store/reduxHookForm/selectors';
import { initField } from 'store/reduxHookForm/actions';

// types
import { TAsyncValidator, TFieldValue, TSyncValidator } from '../../../types';
import { TObject } from 'types';
import { TUseValidator, useValidators } from './useValidators';

// utils
import { getInitialValue } from '../utils/getInitialValue';

export type TUseInitField = Pick<
  TUseValidator,
  'updateAsyncValidators' | 'updateSyncValidators' | 'subscriptionFieldsValues'
>;

export const useInitField = <V extends TFieldValue>(
  afterSubmit: (() => void) | undefined,
  asyncValidators: Array<TAsyncValidator>,
  beforeSubmit: (() => void) | undefined,
  data: TObject<any> | undefined,
  defaultValue: TFieldValue | undefined,
  fieldsToClearOnChange: Array<string>,
  formatOnBlur: ((value: V, name: string) => V) | undefined,
  formatOnChange: ((value: V, name: string) => V) | undefined,
  formatOnFocus: ((value: V, name: string) => V) | undefined,
  formatOnInit: ((value: V) => V) | undefined,
  name: string,
  parse: ((value: V, name: string) => V) | undefined,
  subscriptionFields: Array<string>,
  syncValidators: Array<TSyncValidator>,
  touched: boolean,
  visited: boolean,
): Partial<TUseInitField> => {
  const dispatch = useDispatch();
  const formName = useContext(FormContext);
  const field = useSelector(fieldSelectorCreator(formName, name));

  const {
    getSyncErrors,
    subscriptionFieldsValues,
    updateAsyncValidators,
    updateSyncValidators,
  } = useValidators(
    asyncValidators,
    formName,
    name,
    subscriptionFields,
    syncValidators,
  );

  useEffect(() => {
    if (formName && isEmpty(field)) {
      const emptyValue = getInitialValue(defaultValue, formatOnInit, true);
      const initialValue = getInitialValue(defaultValue, formatOnInit, false);

      defer(() => {
        dispatch(
          initField({
            field: {
              active: false,
              afterSubmit,
              asyncErrors: [],
              beforeSubmit,
              data,
              emptyValue,
              fieldsToClearOnChange,
              formatOnBlur,
              formatOnChange,
              formatOnFocus,
              initialValue,
              isPending: false,
              parse,
              previousValue: initialValue,
              syncErrors: getSyncErrors(initialValue),
              touched,
              value: initialValue,
              visited,
            },
            formName,
            name,
          }),
        );
      });
    }
  }, [formName]);

  return {
    subscriptionFieldsValues,
    updateAsyncValidators,
    updateSyncValidators,
  };
};
