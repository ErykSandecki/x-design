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

export type TConstructedModificators<T extends readonly string[]> = T['length'] extends 0
  ? {}
  : { [K in T[number]]: string };

export type TClassEntry<Name extends string, M extends readonly string[]> = M['length'] extends 0
  ? { name: Name }
  : { name: Name; modificators: TConstructedModificators<M> };

export type TCompose<T extends readonly Children[]> = T extends [infer P, ...infer R]
  ? P extends readonly [infer N, ...infer M]
    ? N extends string
      ? M extends readonly string[]
        ? {
            [K in N]: M['length'] extends 0 ? string : TClassEntry<N, M>;
          } & TCompose<R extends readonly Children[] ? R : []>
        : {}
      : {}
    : {}
  : {};

export type TParentOnly<P extends string> = { [K in P]: string };

export type TComposeClassNamesReturn<
  Parent extends string,
  ChildrenTuple extends readonly Children[],
> = ChildrenTuple['length'] extends 0 ? TParentOnly<Parent> : TCompose<ChildrenTuple>;
