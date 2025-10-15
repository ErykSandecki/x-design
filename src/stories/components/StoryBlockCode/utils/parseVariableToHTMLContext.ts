// others
import { classNames as classNamesStoryBlockCode } from '../classNames';

// types
import { TThemeClassNames, TThemeClassNamesApplier } from 'hooks/useTheme/types';
import { TVariable } from '../types';

// utils
import { getHTMLElement } from './common';

export const parseVariableToHTMLContext = (
  classNames: TThemeClassNames<typeof classNamesStoryBlockCode>,
  cx: TThemeClassNamesApplier,
  { name, type, value }: TVariable,
): string =>
  [
    getHTMLElement(cx(classNames.variablesType), type),
    getHTMLElement(cx(classNames.variablesName), name),
    getHTMLElement(cx(classNames.variablesEqual), '='),
    getHTMLElement(cx(classNames.variablesValue), value),
  ].join(' ');
