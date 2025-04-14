import { createElement, DetailedReactHTMLElement, JSX, ReactNode } from 'react';
import { isString } from 'lodash';

// types
import { TObject } from 'types';
import {
  TTypograpghyComponent,
  TTypograpghyComponentProps,
  TTypograpghyVariantMapping,
} from '../types';
import { TypographyVariant } from '../enums';

export const renderElement = (
  children: ReactNode,
  component: TTypograpghyComponent | null,
  props: TTypograpghyComponentProps,
  variant: TypographyVariant,
  variantMapping: TTypograpghyVariantMapping,
): DetailedReactHTMLElement<TObject<any>, HTMLElement> | JSX.Element => {
  if (component) {
    return isString(component)
      ? createElement(component, props, children)
      : component({ ...props, children });
  }

  return createElement(variantMapping[variant] || variant, props, children);
};
