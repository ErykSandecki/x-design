// types
import { TFields } from '../../store/reduxHookForm/types';

export type TFieldValue = boolean | number | string | Array<boolean | string>;

export type TValidatorArgs =
  | [t: TT, value: TFieldValue]
  | [t: TT, value: TFieldValue, subscribedFields: TFields | undefined];

export type TValidator<V> = (...args: TValidatorArgs) => V;

export type TAsyncValidator = TValidator<Promise<string>>;

export type TSyncValidator = TValidator<string>;
