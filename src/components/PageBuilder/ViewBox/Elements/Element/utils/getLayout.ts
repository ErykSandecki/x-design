import { CSSProperties } from 'react';

// types
import { LayoutType, TElement } from 'types';

// utils
import { getAlignmentLayout } from './getAlignmentLayout';
import { getBoxSizing } from './getBoxSizing';

export const getLayout = (layout: TElement['layout']): CSSProperties => {
  const { alignment, boxSizing, gap, type } = layout;
  const { alignItems, justifyContent } = getAlignmentLayout(alignment);
  const common = { boxSizing: getBoxSizing(boxSizing) } as CSSProperties;

  switch (type) {
    case LayoutType.freeForm:
      return {};
    case LayoutType.vertical:
      return {
        ...common,
        alignItems: justifyContent,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: alignItems,
        rowGap: `${gap.row.value}px`,
      };
    case LayoutType.horizontal:
      return {
        ...common,
        alignItems,
        columnGap: `${gap.column.value}px`,
        display: 'flex',
        justifyContent,
      };
    default:
      return {
        ...common,
        alignContent: alignItems,
        columnGap: `${gap.column.value}px`,
        display: 'grid',
        justifyContent,
        rowGap: `${gap.row.value}px`,
      };
  }
};
