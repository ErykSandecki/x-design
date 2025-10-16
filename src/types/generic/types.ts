export type ArrayMinLength<T, N extends number, Current extends T[]> = Current['length'] extends N
  ? [...Current, ...T[]]
  : ArrayMinLength<T, N, [...Current, T]>;

export type TPrev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export type TNestedKeyOf<OBJECT_TYPE extends object, Depth extends number = 5> = [Depth] extends [0]
  ? never
  : {
      [KEY in keyof OBJECT_TYPE & (string | number)]: OBJECT_TYPE[KEY] extends object
        ? `${KEY}` | `${KEY}.${TNestedKeyOf<OBJECT_TYPE[KEY], TPrev[Depth]>}`
        : `${KEY}`;
    }[keyof OBJECT_TYPE & (string | number)];

export type TPickAliases<T, PropMap extends Partial<Record<keyof T, string>>> = {
  [K in keyof PropMap as K extends keyof T
    ? PropMap[K] extends string
      ? PropMap[K]
      : never
    : never]: K extends keyof T ? T[K] : never;
};

export type TValueObj<T> = T[keyof T];

export type TNestedObject<T> = { [P in keyof T]: T[P] };
