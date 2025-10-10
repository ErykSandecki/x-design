import { CSSProperties, JSX } from 'react';

// types
import { THTMLTag, TObject } from 'types';
import { TTypographyProps } from './Typography';
import { TypographyVariant } from './enums';

export type TOmittedTypographyProps = Omit<TTypographyProps, 'component' | 'fontType'> & {
  component?: TTypograpghyElement;
};

export type TTypograpghyComponentProps = TTypographyProps & {
  className: string;
  style: CSSProperties;
};

export type TTypograpghyElement = (props: TTypograpghyComponentProps) => JSX.Element;

export type TTypograpghyComponent = TTypograpghyElement | TTypograpghyHTMLTag;

export type TTypograpghyHTMLTag = Exclude<
  THTMLTag,
  | 'aduio'
  | 'base'
  | 'body'
  | 'br'
  | 'canvas'
  | 'col'
  | 'colgroup'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'head'
  | 'html'
  | 'iframe'
  | 'img'
  | 'input'
  | 'meta'
  | 'noscript'
  | 'p'
  | 'param'
  | 'script'
  | 'small'
  | 'source'
  | 'style'
  | 'track'
>;

export type TTypograpghyVariantMapping = TObject<TTypograpghyHTMLTag, typeof TypographyVariant, 'optional'>;
