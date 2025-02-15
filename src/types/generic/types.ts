import { TFunction } from 'i18next';

export type ArrayMinLength<
  T,
  N extends number,
  Current extends T[],
> = Current['length'] extends N
  ? [...Current, ...T[]]
  : ArrayMinLength<T, N, [...Current, T]>;

export type TNestedKeyOf<OBJECT_TYPE extends object> = {
  [KEY in keyof OBJECT_TYPE &
    (string | number)]: OBJECT_TYPE[KEY] extends object
    ? `${KEY}` | `${KEY}.${TNestedKeyOf<OBJECT_TYPE[KEY]>}`
    : `${KEY}`;
}[keyof OBJECT_TYPE & (string | number)];

export type TPickAliases<
  T,
  PropMap extends Partial<Record<keyof T, string>>,
> = {
  [K in keyof PropMap as K extends keyof T
    ? PropMap[K] extends string
      ? PropMap[K]
      : never
    : never]: K extends keyof T ? T[K] : never;
};

export type TT = TFunction;

export type TValueObj<T> = T[keyof T];

export type TNestedObject<T> = { [P in keyof T]: T[P] };
