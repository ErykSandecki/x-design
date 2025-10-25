// types
import { LayoutType, TElement, TGrid } from 'types';

export const getGridLayout = (element: TElement, targetLayoutType: TElement['layout']['type']): TGrid => {
  const { children, layout: prevLayout } = element;
  const sizes = children.length;

  if (targetLayoutType === LayoutType.grid) {
    return prevLayout.type === LayoutType.horizontal
      ? { columns: sizes || 1, rows: 1 }
      : { columns: 1, rows: sizes || 1 };
  }

  return { columns: 1, rows: 1 };
};
