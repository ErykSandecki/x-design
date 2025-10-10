import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

// store
import { fieldSelectorCreator, formAttributesSelectorCreator } from 'store/reduxHookForm/selectors';

// types
import { TFieldValue } from '../../types';
import { TObject } from 'types';

export type TUseMetaProps<V> = {
  active: boolean;
  data: TObject<any> | undefined;
  dirty: boolean;
  dirtyLastSinceLastSubmit: boolean | undefined;
  errors: Array<string>;
  initialValue: V;
  invalid: boolean;
  modified: boolean | undefined;
  modifiedSinceLastSubmit: boolean | undefined;
  pristine: boolean;
  submitting: boolean;
  touched: boolean;
  valid: boolean;
  validating: boolean;
  visited: boolean;
};

export const useMetaProps = <V extends TFieldValue>(formName: string, name: string): Partial<TUseMetaProps<V>> => {
  const field = useSelector(fieldSelectorCreator<V>(formName, name));

  const {
    active,
    asyncErrors,
    data,
    initialValue,
    isPending,
    modified,
    modifiedSinceLastSubmit,
    syncErrors,
    touched,
    value,
    valueSinceLastSubmit,
    visited,
  } = field;

  const isDirtyLastSinceLastSubmit =
    valueSinceLastSubmit !== undefined ? { dirtyLastSinceLastSubmit: value !== valueSinceLastSubmit } : {};

  const isPendingForm = useSelector(formAttributesSelectorCreator('isPending', formName)) as boolean;

  if (isEmpty(field)) {
    return {};
  }

  return {
    active,
    ...(data ? { data } : {}),
    dirty: initialValue !== value,
    ...isDirtyLastSinceLastSubmit,
    errors: [...asyncErrors, ...syncErrors],
    initialValue,
    invalid: !isEmpty([...asyncErrors, ...syncErrors]),
    modified,
    ...(modifiedSinceLastSubmit !== undefined ? { modifiedSinceLastSubmit: modifiedSinceLastSubmit } : {}),
    pristine: value === initialValue,
    submitting: isPendingForm,
    touched,
    valid: isEmpty([...asyncErrors, ...syncErrors]),
    validating: isPending,
    visited,
  };
};
