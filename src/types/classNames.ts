// types
import { TObject } from 'types';

export type TModificators = TObject<string>;

export type TClassNameWithModificator = {
  name: string;
  modificators: TModificators;
};

export type TClassName = string | TClassNameWithModificator;

export type TClassNames = TObject<TClassName>;

export type Children = readonly [string, ...string[]];

export type Modificators<T extends readonly string[]> = T['length'] extends 0
  ? {}
  : { [K in T[number]]: string };

export type ClassEntry<
  Name extends string,
  M extends readonly string[],
> = M['length'] extends 0
  ? { name: Name }
  : { name: Name; modificators: Modificators<M> };

export type Compose<T extends readonly Children[]> = T extends [
  infer P,
  ...infer R,
]
  ? P extends readonly [infer N, ...infer M]
    ? N extends string
      ? M extends readonly string[]
        ? {
            [K in N]: M['length'] extends 0 ? string : ClassEntry<N, M>;
          } & Compose<R extends readonly Children[] ? R : []>
        : {}
      : {}
    : {}
  : {};
