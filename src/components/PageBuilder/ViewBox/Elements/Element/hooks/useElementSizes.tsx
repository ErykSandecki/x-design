import { useSelector } from 'react-redux';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// store
import { elementDataSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';

// utils
import { isPureNumber } from 'utils';

export type TUseElementSizes = {
  cssHeight: TElement['height']['value'];
  cssWidth: TElement['height']['value'];
  height: TElement['height']['value'];
  maxHeight: string;
  maxWidth: string;
  minHeight: string;
  minWidth: string;
  width: TElement['width']['value'];
};

export const useElementSizes = (id: TElement['id']): TUseElementSizes => {
  const { itemsRefs } = useRefs();
  const elementData = useSelector(elementDataSelectorCreator(id));
  const { height: elHeight, layout, padding, width: elWidth } = elementData;
  const { boxSizing } = layout;
  const { unit: unitHeight, value: relativeHeight } = elHeight;
  const { unit: unitWidth, value: relativeWidth } = elWidth;
  const cssHeight = `${relativeHeight}${unitHeight ?? ''}`;
  const cssWidth = `${relativeWidth}${unitWidth ?? ''}`;
  const isExcluded = boxSizing === 'excluded';
  const additionalHeight = padding.b.value + padding.t.value;
  const additionalWidth = padding.l.value + padding.r.value;

  const height =
    (isPureNumber(relativeHeight) || !itemsRefs[id]) && !unitHeight
      ? relativeHeight
      : parseInt(getComputedStyle(itemsRefs[id]).height);

  const width =
    (isPureNumber(relativeWidth) || !itemsRefs[id]) && !unitWidth
      ? relativeWidth
      : parseInt(getComputedStyle(itemsRefs[id]).width);

  return {
    cssHeight: isPureNumber(cssHeight) ? `${cssHeight}px` : cssHeight,
    cssWidth: isPureNumber(cssWidth) ? `${cssWidth}px` : cssWidth,
    height: isExcluded ? parseFloat(height.toString()) + additionalHeight : height,
    maxHeight: elHeight.max ? `${elHeight.max}px` : '',
    maxWidth: elWidth.max ? `${elWidth.max}px` : '',
    minHeight: elHeight.min ? `${elHeight.min}px` : '',
    minWidth: elWidth.min ? `${elWidth.min}px` : '',
    width: isExcluded ? parseFloat(width.toString()) + additionalWidth : width,
  };
};
