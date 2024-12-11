import { forOwn } from 'lodash';
import { useSelector } from 'react-redux';

// store
import { fieldsSelectorCreator } from '../../../store/reduxHookForm/selectors';

// types
import { TField } from '../../../store/reduxHookForm/types';

export type TUseFormValues<T> = (previous?: boolean) => T;

export const useFormValues = <T,>(formName: string): TUseFormValues<T> => {
  const fields = useSelector(fieldsSelectorCreator(formName));

  const getFormValues = (previous?: boolean): T => {
    const formData: {
      [key: string]: T;
    } = {};

    forOwn(fields, (field: TField, name: string) => {
      const { parse, previousValue, value } = field;
      const targetValue = previous ? previousValue : value;

      formData[name] = parse
        ? (parse(targetValue, name) as T)
        : (targetValue as T);
    });

    return formData as T;
  };

  return getFormValues;
};
