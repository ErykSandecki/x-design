import { useSelector } from 'react-redux';
import { values } from 'lodash';

// store
import { formAttributesSelectorCreator } from '../../../store/reduxHookForm/selectors';

// types
import { TForm } from '../../../store/reduxHookForm/types';

const attributes: Array<Partial<keyof TForm>> = ['fields'];

export type TUseIsValidFormType = boolean;

export const useIsFormValid = (formName: string): TUseIsValidFormType => {
  const form = useSelector(
    formAttributesSelectorCreator(attributes, formName),
  ) as Partial<TForm>;

  const isValid = !values(form.fields!).some(
    ({ asyncErrors, syncErrors }) =>
      asyncErrors.length > 0 || syncErrors.length > 0,
  );

  return isValid;
};
