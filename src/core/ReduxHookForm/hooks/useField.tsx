// hooks
import { TUseInputProps, useInputProps } from '../Field/hooks/useInputProps';
import { TUseMetaProps, useMetaProps } from '../Field/hooks/useMetaProps';

// types
import { TFieldValue } from '../types';

export type TUseFieldType<V> = TUseInputProps<V> & Partial<TUseMetaProps<V>>;

export const useField = <V extends TFieldValue>(formName: string, name: string): TUseFieldType<V> => {
  const inputProps = useInputProps<V>(formName, name);
  const metaProps = useMetaProps<V>(formName, name);

  return {
    ...inputProps,
    ...metaProps,
  };
};
