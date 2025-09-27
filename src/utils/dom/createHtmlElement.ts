import { forIn } from 'lodash';
import { HTMLAttributes } from 'react';

export const withAttributes = (attributes: HTMLAttributes<string>, htmlElement: HTMLElement): HTMLElement => {
  forIn(attributes, (value, key) => {
    htmlElement.setAttribute(key, value);
  });

  return htmlElement;
};

export const createHtmlElement = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  attributes?: HTMLAttributes<string>,
): HTMLElement => (attributes ? withAttributes(attributes, document.createElement(tag)) : document.createElement(tag));
