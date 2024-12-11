import { ReactNode } from 'react';

// types
import { PageType } from './enums';

export type TPageType = Record<PageType, string>;

export type TRestProps<T> = {
  children: ReactNode;
  pageType?: T;
  translationNameSpace?: string;
  withBackground?: boolean;
};
