import { useSelector } from 'react-redux';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// store
import { elementDataSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';

// utils
import { getScoreValue } from '../utils/getScoreValue';
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
  const { max: maxH, min: minH, unit: unitHeight, value: relativeHeight } = elHeight;
  const { max: maxW, min: minW, unit: unitWidth, value: relativeWidth } = elWidth;
  const cssHeight = `${relativeHeight}${unitHeight ?? ''}`;
  const cssWidth = `${relativeWidth}${unitWidth ?? ''}`;
  const isExcluded = boxSizing === 'excluded';
  const additionalHeight = padding.b.value + padding.t.value;
  const additionalWidth = padding.l.value + padding.r.value;

  // @html delay
  const height = itemsRefs[id] ? parseInt(getComputedStyle(itemsRefs[id]).height) : 0;
  const width = itemsRefs[id] ? parseInt(getComputedStyle(itemsRefs[id]).width) : 0;

  return {
    cssHeight: isPureNumber(cssHeight) ? `${cssHeight}px` : cssHeight,
    cssWidth: isPureNumber(cssWidth) ? `${cssWidth}px` : cssWidth,
    height: isExcluded ? parseFloat(height.toString()) + additionalHeight : height,
    maxHeight: getScoreValue(maxH),
    maxWidth: getScoreValue(maxW),
    minHeight: getScoreValue(minH),
    minWidth: getScoreValue(minW),
    width: isExcluded ? parseFloat(width.toString()) + additionalWidth : width,
  };
};
