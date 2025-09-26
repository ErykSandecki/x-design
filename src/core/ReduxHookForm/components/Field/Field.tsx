import {
  FC,
  ForwardRefExoticComponent,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
} from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

// hooks
import { useMetaProps } from './hooks/useMetaProps';
import { useInitField } from './hooks/useInitField';
import { useInputProps } from './hooks/useInputProps';

// others
import { FormContext } from '../Form/Form';

// store
import { fieldSelectorCreator } from 'store/reduxHookForm/selectors';

// types
import { TAsyncValidator, TFieldValue, TSyncValidator } from '../../types';
import { TFieldComponentProps } from './types';
import { TObject } from 'types';

export type TFieldProps<T, V> = {
  afterSubmit?: () => void;
  asyncValidators?: Array<TAsyncValidator>;
  beforeSubmit?: () => void;
  Component:
    | FC<TFieldComponentProps<T, V>>
    | ForwardRefExoticComponent<TFieldComponentProps<T, V>>;
  data?: TObject<any>;
  defaultValue?: TFieldValue;
  fieldsToClearOnChange?: Array<string>;
  formatOnBlur?: (value: V, name: string) => V;
  formatOnChange?: (value: V, name: string) => V;
  formatOnFocus?: (value: V, name: string) => V;
  formatOnInit?: (value: V) => V;
  name: string;
  parse?: (value: V, name: string) => V;
  ref?: RefObject<HTMLElement>;
  subscriptionFields?: Array<string>;
  syncValidators?: Array<TSyncValidator>;
  touched?: boolean;
  visited?: boolean;
} & T;

export const Field = <T, V extends TFieldValue>({
  afterSubmit,
  asyncValidators = [],
  beforeSubmit,
  Component,
  data,
  defaultValue,
  fieldsToClearOnChange = [],
  formatOnBlur,
  formatOnChange,
  formatOnFocus,
  formatOnInit,
  name,
  parse,
  ref,
  subscriptionFields = [],
  syncValidators = [],
  touched: initialTouched = false,
  visited: initialVisited = false,
  ...restProps
}: TFieldProps<T, V>): ReactNode => {
  const formName = useContext(FormContext);
  const field = useSelector(fieldSelectorCreator(formName, name));
  const inputProps = useInputProps<V>(formName, name);
  const metaProps = useMetaProps<V>(formName, name);
  const { touched, value = '', visited } = field;

  const {
    subscriptionFieldsValues,
    updateAsyncValidators,
    updateSyncValidators,
  } = useInitField(
    afterSubmit,
    asyncValidators,
    beforeSubmit,
    data,
    defaultValue,
    fieldsToClearOnChange,
    formatOnBlur,
    formatOnChange,
    formatOnFocus,
    formatOnInit,
    name,
    parse,
    subscriptionFields,
    syncValidators,
    initialTouched,
    initialVisited,
  );

  useEffect(() => {
    if (!isEmpty(field)) {
      updateAsyncValidators(value);
      updateSyncValidators(value);
    }
  }, [touched, value, visited, ...subscriptionFieldsValues]);

  return (
    <Component
      meta={metaProps}
      {...inputProps}
      {...(restProps as T)}
      {...(ref ? { ref: ref } : {})}
    />
  );
};

export default Field;
