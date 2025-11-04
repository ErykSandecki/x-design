import { useSelector } from 'react-redux';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// store
import { elementDataSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';

// utils
import { getScoreValue } from '../utils/getScoreValue';
import { isPureNumber, valueAttached } from 'utils';

export type TUseElementSizes = {
  cssHeight: string;
  cssWidth: string;
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
  const { max: maxH, mode: modeH, min: minH, unit: unitH, value: relativeH } = elHeight;
  const { max: maxW, mode: modeW, min: minW, unit: unitW, value: relativeW } = elWidth;
  const cssHeight = valueAttached(modeH) ? 'auto' : `${relativeH}${unitH ?? ''}`;
  const cssWidth = valueAttached(modeW) ? 'auto' : `${relativeW}${unitW ?? ''}`;
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
