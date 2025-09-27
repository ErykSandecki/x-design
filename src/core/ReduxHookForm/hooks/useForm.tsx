import { useSelector } from 'react-redux';

// store
import { formAttributesSelectorCreator } from '../../../store/reduxHookForm/selectors';

// types
import { TForm } from '../../../store/reduxHookForm/types';

const attributes: Array<Partial<keyof TForm>> = ['asyncTimeDelay', 'error', 'isPending', 'isValid'];

export type TUseFormType = Partial<TForm>;

export const useForm = (formName: string): TUseFormType =>
  useSelector(formAttributesSelectorCreator(attributes, formName)) as TUseFormType;
