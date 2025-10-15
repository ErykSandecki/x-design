// others
import { classNames as classNamesStoryBlockCode } from '../classNames';

// types
import { TThemeClassNames, TThemeClassNamesApplier } from 'hooks/useTheme/types';
import { TImport } from '../types';

// utils
import { getHTMLElement } from './common';

const getItemWithHighlightWordAs = (
  itemsToImports: string,
  classNames: TThemeClassNames<typeof classNamesStoryBlockCode>,
  cx: TThemeClassNamesApplier,
): string =>
  itemsToImports
    .split(' ')
    .map((item) => (item === 'as' ? getHTMLElement(cx(classNames.importAs), 'as') : item))
    .join(' ');

export const parseImportToHTMLContext = (
  { items: itemsToImports, path }: TImport,
  classNames: TThemeClassNames<typeof classNamesStoryBlockCode>,
  cx: TThemeClassNamesApplier,
): string =>
  [
    getHTMLElement(cx(classNames.import), 'import'),
    getHTMLElement(cx(classNames.importItems), getItemWithHighlightWordAs(itemsToImports, classNames, cx)),
    getHTMLElement(cx(classNames.importFrom), 'from'),
    getHTMLElement(cx(classNames.importPath), `'${path}'`),
    getHTMLElement(cx(classNames.importSemicolon), ';'),
  ].join(' ');
