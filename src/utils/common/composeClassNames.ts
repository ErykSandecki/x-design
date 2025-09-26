// types
import {
  Children,
  TClassEntry,
  TComposeClassNamesReturn,
  TParentOnly,
} from 'types';

const buildParent = <Name extends string, Mods extends readonly string[]>(
  name: Name,
  mods: Mods,
): TClassEntry<Name, Mods> => {
  if (mods.length === 0) {
    return { [name]: name } as TClassEntry<Name, Mods>;
  }
  return {
    [name]: {
      modificators: mods.reduce(
        (obj, m) => ({ ...obj, [m]: `${name}--${m}` }),
        {},
      ),
      name,
    },
  } as unknown as TClassEntry<Name, Mods>;
};

const buildChild = <
  Parent extends string,
  Child extends string,
  Mods extends readonly string[],
>(
  parent: Parent,
  name: Child,
  mods: Mods,
): TClassEntry<`${Parent}__${Child}`, Mods> => {
  const fullName = `${parent}__${name}`;

  if (mods.length === 0) {
    return { [name]: fullName } as TClassEntry<`${Parent}__${Child}`, Mods>;
  }
  return {
    [name]: {
      modificators: mods.reduce(
        (obj, m) => ({ ...obj, [m]: `${fullName}--${m}` }),
        {},
      ),
      name: fullName,
    },
  } as unknown as TClassEntry<`${Parent}__${Child}`, Mods>;
};

export function composeClassNames<Parent extends string>(
  parent: Parent,
): TParentOnly<Parent>;
export function composeClassNames<
  Parent extends string,
  T extends readonly Children[],
>(parent: Parent, ...children: T): TComposeClassNamesReturn<Parent, T>;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function composeClassNames(parent: string, ...children: any[]) {
  if (!children.length) {
    return { [parent]: parent };
  }

  const [parentTuple, ...childTuples] = children;
  const [parentKey, ...parentMods] = parentTuple;
  const mainClassName = parent;
  const result = { ...buildParent(parentKey, parentMods) };

  childTuples.forEach(([name, ...mods]) => {
    Object.assign(result, buildChild(mainClassName, name, mods));
  });

  return result;
}
