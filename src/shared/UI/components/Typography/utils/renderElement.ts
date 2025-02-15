import { createElement, DetailedReactHTMLElement, JSX, ReactNode } from 'react';
import { isString } from 'lodash';

// types
import { TObject } from 'types';
import { TypographyFontType } from '../enums';
import { TTypograpghyComponent, TTypograpghyVariantMapping } from '../types';

export const renderElement = (
  children: ReactNode,
  component: TTypograpghyComponent | null,
  fontType: TypographyFontType,
  props: TObject<any>,
  variantMapping: TTypograpghyVariantMapping,
): DetailedReactHTMLElement<TObject<any>, HTMLElement> | JSX.Element => {
  if (component) {
    return isString(component)
      ? createElement(component, props, children)
      : component({ children });
  }

  return createElement(variantMapping[fontType] || fontType, props, children);
};
