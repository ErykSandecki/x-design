// types
import { TUseInputProps } from './hooks/useInputProps';
import { TUseMetaProps } from './hooks/useMetaProps';

export type TFieldRestProps<T, V> = TUseInputProps<V> &
  T & {
    ref?: any;
  };

export type TFieldComponentProps<T, V> = Partial<TUseMetaProps<V>> & TFieldRestProps<T, V>;
