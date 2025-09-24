import { CSSProperties } from 'react';

// types
import { LayoutType, TElement } from 'types';

export const getLayout = (layout: TElement['layout']): CSSProperties => {
  switch (layout.type) {
    case LayoutType.default:
      return {};
    case LayoutType.vertical:
      return {
        display: 'flex',
        flexDirection: 'column',
      };
    case LayoutType.horizontal:
      return {
        display: 'flex',
      };
    default:
      return {
        display: 'grid',
      };
  }
};
