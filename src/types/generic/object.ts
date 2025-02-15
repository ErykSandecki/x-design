export type TObjectRequired<T, K = keyof T> = K extends keyof T
  ? { [key: string]: T }
  : { [key in keyof K]: T };

export type TObjectOptional<T, K = keyof T> = K extends keyof T
  ? { [key: string]: T }
  : { [key in keyof K]?: T };

export type TObject<
  T,
  K = keyof T,
  O extends 'optional' | 'required' = 'required',
> = O extends 'optional' ? TObjectOptional<T, K> : TObjectRequired<T, K>;

export type TObjectArray<T> = Array<keyof T>;
