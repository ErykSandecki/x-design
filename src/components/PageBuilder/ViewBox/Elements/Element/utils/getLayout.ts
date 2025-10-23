import { CSSProperties } from 'react';

// types
import { LayoutType, TElement } from 'types';

// utils
import { getAlignmentLayout } from './getAlignmentLayout';

export const getLayout = (layout: TElement['layout']): CSSProperties => {
  const { alignment, gap, type } = layout;
  const { alignItems, justifyContent } = getAlignmentLayout(alignment);

  switch (type) {
    case LayoutType.freeForm:
      return {};
    case LayoutType.vertical:
      return {
        alignItems: justifyContent,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: alignItems,
        rowGap: `${gap.row.value}px`,
      };
    case LayoutType.horizontal:
      return {
        alignItems,
        columnGap: `${gap.column.value}px`,
        display: 'flex',
        justifyContent,
      };
    default:
      return {
        alignContent: alignItems,
        columnGap: `${gap.column.value}px`,
        display: 'grid',
        justifyContent,
        rowGap: `${gap.row.value}px`,
      };
  }
};
