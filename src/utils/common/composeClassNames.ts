// types
import { Children, Compose } from 'types';

export const composeParent = (
  mainClassName: string,
  parentMods: Array<string>,
  parentName: string,
  result: Record<string, any>,
): void => {
  if (parentMods.length === 0) {
    result[parentName] = mainClassName;
  } else {
    const modObj: Record<string, string> = {};

    parentMods.forEach((m) => (modObj[m] = `${mainClassName}--${m}`));
    result[parentName] = { name: mainClassName, modificators: modObj };
  }
};

export const composeChildren = <T extends readonly Children[]>(
  children: T,
  mainClassName: string,
  result: Record<string, any>,
): void => {
  children.slice(1).forEach(([name, ...mods]) => {
    const fullName = `${mainClassName}__${name}`;

    if (mods.length === 0) {
      result[name] = fullName;
    } else {
      const modObj: Record<string, string> = {};

      mods.forEach((m) => (modObj[m] = `${fullName}--${m}`));
      result[name] = { name: fullName, modificators: modObj };
    }
  });
};

export const composeClassNames = <T extends readonly Children[]>(
  parentName: string,
  ...children: T
): Compose<T> => {
  const result: Record<string, any> = {};
  const [_, ...parentMods] = children[0] || [];
  const mainClassName = parentName;

  composeParent(mainClassName, parentMods, parentName, result);
  composeChildren(children, mainClassName, result);

  return result as Compose<T>;
};
