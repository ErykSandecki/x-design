import cx from 'classnames';
import { isArray } from 'lodash';

// others
import { HtmlCode } from '../constants';

// types
import { TComponentAttributes, TProps } from '../types';
import { TObject } from 'types';

// utils
import { getHTMLElement } from './common';

const parseAttributesToHTML = (attributes: Array<TComponentAttributes>, styles: TObject<string>): string => {
  const context = attributes
    .map(
      ({ name, value }) =>
        ` ${getHTMLElement(cx(styles['StoryBlockCode__attribute--name']), name)}${
          value ? `="${getHTMLElement(cx(styles['StoryBlockCode__attribute--value']), value)}"` : ''
        }`,
    )
    .join('');

  return getHTMLElement(cx(styles['StoryBlockCode__attribute']), context);
};

export const parseComponentToHTMLContext = (
  { attributes = [], children }: TProps,
  componentName = '',
  styles: TObject<string>,
): string => {
  const parsedComponent = getHTMLElement(cx(styles['StoryBlockCode__component-name']), componentName);
  const parsedAttributes = parseAttributesToHTML(attributes, styles);

  if (children) {
    let parsedChildren = '';

    if (isArray(children)) {
      parsedChildren = `${children
        .map(({ componentName, props }) => {
          if (props) {
            return props
              .map((props) =>
                getHTMLElement(
                  cx(styles['StoryBlockCode__children']),
                  parseComponentToHTMLContext(props, componentName, styles),
                  'div',
                ),
              )
              .join('');
          }

          return getHTMLElement(
            cx(styles['StoryBlockCode__children']),
            parseComponentToHTMLContext({}, componentName, styles),
            'div',
          );
        })
        .join('')}`;
    }

    return `${HtmlCode['<']}${parsedComponent}${parsedAttributes}${
      HtmlCode['>']
    }${parsedChildren ? parsedChildren : children}${HtmlCode['<']}/${parsedComponent}${HtmlCode['>']}`;
  }

  return `${HtmlCode['<']}${parsedComponent}${parsedAttributes} /${HtmlCode['>']}`;
};
