import cx from 'classnames';

// others

// types
import { TImport } from '../types';
import { TObject } from 'types';

// utils
import { getHTMLElement } from './common';

const getItemWithHighlightWordAs = (itemsToImports: string, styles: TObject<string>): string =>
  itemsToImports
    .split(' ')
    .map((item) => (item === 'as' ? getHTMLElement(cx(styles['StoryBlockCode__import-as']), 'as') : item))
    .join(' ');

export const parseImportToHTMLContext = ({ items: itemsToImports, path }: TImport, styles: TObject<string>): string =>
  [
    getHTMLElement(cx(styles['StoryBlockCode__import']), 'import'),
    getHTMLElement(cx(styles['StoryBlockCode__import-items']), getItemWithHighlightWordAs(itemsToImports, styles)),
    getHTMLElement(cx(styles['StoryBlockCode__import-from']), 'from'),
    getHTMLElement(cx(styles['StoryBlockCode__import-path']), `'${path}'`),
    getHTMLElement(cx(styles['StoryBlockCode__import-semicolon']), ';'),
  ].join(' ');
