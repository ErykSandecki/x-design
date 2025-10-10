// types
import { THTMLTag } from 'types';

export type TBoxHTMLTag = Exclude<
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
