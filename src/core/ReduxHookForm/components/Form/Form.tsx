import { createContext, FormEvent, ReactNode, useEffect } from 'react';
import { forOwn, isEmpty, kebabCase } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

// others
import { UPDATE_FORM_VALIDATOR } from '../../../../store/reduxHookForm/actionsType';

// store
import {
  destroyForm,
  mountForm,
  submit,
  updateForm,
} from '../../../../store/reduxHookForm/actions';
import {
  fieldsSelectorCreator,
  formSelectorCreator,
} from '../../../../store/reduxHookForm/selectors';

// types
import { E2EAttribute } from 'types/e2e';
import {
  E2EDataAttribute,
  TE2EDataAttributeProps,
} from 'shared/E2EDataAttributes/E2EDataAttribute';
import { TField, TFields } from '../../../../store/reduxHookForm/types';

// utils
import { defaultFormValidator } from '../../utils/validators';
import { markInputsAsTouched } from '../../utils/markInputsAsTouched';

export const FormContext = createContext('');

export type TFormProps<T> = {
  asyncTimeDelay?: number;
  children: ReactNode;
  className?: string;
  e2eAttribute?: TE2EDataAttributeProps['type'];
  e2eValue?: TE2EDataAttributeProps['value'];
  formName: string;
  isValid?: boolean;
  onSubmit: (formData: T) => void;
  validate?: (fields: TFields<T>) => boolean;
};

export const Form = <T extends {}>({
  asyncTimeDelay = 0,
  children,
  className = '',
  e2eAttribute = E2EAttribute.form,
  e2eValue = '',
  formName,
  isValid: isValidInitial = false,
  onSubmit,
  validate = defaultFormValidator,
}: TFormProps<T>): ReactNode => {
  const dispatch = useDispatch();
  const form = useSelector(formSelectorCreator(formName));
  const fields = useSelector(fieldsSelectorCreator(formName));

  const getFieldsValues = (): T => {
    const formData = {};

    forOwn(fields, (field: TField, name: string) => {
      const { parse, value } = field;

      formData[name] = parse ? parse(value, name) : value;
    });

    return formData as T;
  };

  const onValidateHandler = (): void => {
    const isValid = validate(fields as TFields<T>);

    if (isValid) {
      onSubmit(getFieldsValues());
    }

    dispatch(
      updateForm({ form: { isValid }, formName }, UPDATE_FORM_VALIDATOR),
    );
  };

  const onSubmitHandler = (event: FormEvent): void => {
    event.preventDefault();

    dispatch(submit(formName));
    markInputsAsTouched(dispatch, formName, fields);
    onValidateHandler();
  };

  useEffect(() => {
    if (isEmpty(form)) {
      dispatch(
        mountForm({
          [formName]: {
            asyncTimeDelay,
            error: '',
            fields: {},
            isPending: false,
            isValid: isValidInitial,
          },
        }),
      );
    }

    return (): void => {
      dispatch(destroyForm(formName));
    };
  }, []);

  return (
    <E2EDataAttribute
      type={e2eAttribute}
      value={
        e2eValue ? `${kebabCase(formName)}-${e2eValue}` : kebabCase(formName)
      }
    >
      <form className={className} onSubmit={onSubmitHandler}>
        <FormContext.Provider value={formName}>{children}</FormContext.Provider>
      </form>
    </E2EDataAttribute>
  );
};

export default Form;
