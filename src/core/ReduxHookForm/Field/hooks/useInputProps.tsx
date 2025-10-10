import { isArray } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

// others
import { BLUR, CHANGE, FOCUS } from 'store/reduxHookForm/actionsType';

// store
import { clearFields } from 'store/reduxHookForm/actions';
import { fieldAttributesSelectorCreator, fieldSelectorCreator } from 'store/reduxHookForm/selectors';

// types
import { TFieldValue } from '../../types';

// utils
import { dispatchFieldHandler } from '../../utils/dispatchFieldHandler';

export type TUseInputProps<V> = {
  name: string;
  onBlur: TFunc<[V]>;
  onChange: TFunc<[V]>;
  onFocus: TFunc<[V]>;
  value: V;
};

export const useInputProps = <V extends TFieldValue>(formName: string, name: string): TUseInputProps<V> => {
  const dispatch = useDispatch();
  const dispatchField = dispatchFieldHandler(dispatch, formName, name);

  const fieldsToClearOnChange = useSelector(
    fieldAttributesSelectorCreator('fieldsToClearOnChange', formName, name)!,
  ) as Array<string>;

  const value = useSelector(fieldAttributesSelectorCreator('value', formName, name)!) as V;

  const isValueSinceLastSubmit =
    useSelector(fieldAttributesSelectorCreator('valueSinceLastSubmit', formName, name)!) !== undefined;

  const { formatOnBlur, formatOnChange, formatOnFocus } = useSelector(fieldSelectorCreator(formName, name));

  const handleClearFields = (nextValue: V): void => {
    const previousValue = value;

    if (fieldsToClearOnChange.length) {
      if (isArray(previousValue) && isArray(nextValue)) {
        const someValueHasChanged = !nextValue.every((value) => previousValue.includes(value));

        if (someValueHasChanged) {
          dispatch(clearFields(formName, fieldsToClearOnChange));
        }
      } else if (previousValue !== nextValue) {
        dispatch(clearFields(formName, fieldsToClearOnChange));
      }
    }
  };

  const onBlurHandler = (value: V): void => {
    dispatchField(
      {
        active: false,
        touched: true,
        value: formatOnBlur ? formatOnBlur(value, name) : value,
      },
      BLUR,
    );
  };

  const onChangeHandler = (nextValue: V): void => {
    const targetValue = formatOnChange ? formatOnChange(nextValue, name) : nextValue;

    dispatchField(
      {
        ...(isValueSinceLastSubmit ? { modifiedSinceLastSubmit: true } : {}),
        modified: true,
        previousValue: value,
        value: targetValue,
      },
      CHANGE,
    );

    handleClearFields(targetValue as V);
  };

  const onFocusHandler = (value: V): void => {
    dispatchField(
      {
        active: true,
        value: formatOnFocus ? formatOnFocus(value, name) : value,
        visited: true,
      },
      FOCUS,
    );
  };

  return {
    name,
    onBlur: onBlurHandler,
    onChange: onChangeHandler,
    onFocus: onFocusHandler,
    value,
  };
};
