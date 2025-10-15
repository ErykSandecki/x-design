import { isArray } from 'lodash';

// others
import { classNames as classNamesStoryBlockCode } from '../classNames';
import { HtmlCode } from '../constants';

// types
import { TComponentAttributes, TProps } from '../types';
import { TThemeClassNames, TThemeClassNamesApplier } from '../../../../hooks/useTheme/types';

// utils
import { getHTMLElement } from './common';

const parseAttributesToHTML = (
  attributes: Array<TComponentAttributes>,
  classNames: TThemeClassNames<typeof classNamesStoryBlockCode>,
  cx: TThemeClassNamesApplier,
): string => {
  const context = attributes
    .map(
      ({ name, value }) =>
        ` ${getHTMLElement(cx(classNames.attributeName), name)}${
          value ? `="${getHTMLElement(cx(classNames.attributeValue), value)}"` : ''
        }`,
    )
    .join('');

  return getHTMLElement(cx(classNames.attribute), context);
};

export const parseComponentToHTMLContext = (
  { attributes = [], children }: TProps,
  componentName = '',
  classNames: TThemeClassNames<typeof classNamesStoryBlockCode>,
  cx: TThemeClassNamesApplier,
): string => {
  const parsedComponent = getHTMLElement(cx(classNames.componentName), componentName);
  const parsedAttributes = parseAttributesToHTML(attributes, classNames, cx);

  if (children) {
    let parsedChildren = '';

    if (isArray(children)) {
      parsedChildren = `${children
        .map(({ componentName, props }) => {
          if (props) {
            return props
              .map((props) =>
                getHTMLElement(
                  cx(classNames.children),
                  parseComponentToHTMLContext(props, componentName, classNames, cx),
                  'div',
                ),
              )
              .join('');
          }

          return getHTMLElement(
            cx(classNames.children),
            parseComponentToHTMLContext({}, componentName, classNames, cx),
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
