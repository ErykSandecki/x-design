import { CSSProperties } from 'react';

// types
import { LayoutType, TElement } from 'types';

// utils
import { getAlignmentLayout } from './getAlignmentLayout';

export const getLayout = (layout: TElement['layout']): CSSProperties => {
  const { alignItems, justifyContent } = getAlignmentLayout(layout.alignment);

  switch (layout.type) {
    case LayoutType.freeForm:
      return {};
    case LayoutType.vertical:
      return {
        alignItems: justifyContent,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: alignItems,
      };
    case LayoutType.horizontal:
      return {
        alignItems,
        display: 'flex',
        justifyContent,
      };
    default:
      return {
        alignItems,
        display: 'grid',
        justifyContent,
      };
  }
};
