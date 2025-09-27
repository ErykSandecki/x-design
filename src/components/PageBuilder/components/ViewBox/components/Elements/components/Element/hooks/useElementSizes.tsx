import { useSelector } from 'react-redux';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// store
import { elementDynamicDataSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';

// utils
import { isPureNumber } from 'utils';

export type TUseElementSizes = {
  cssHeight: TElement['height']['value'];
  cssWidth: TElement['height']['value'];
  height: TElement['height']['value'];
  width: TElement['width']['value'];
};

export const useElementSizes = (id: TElement['id']): TUseElementSizes => {
  const { itemsRefs } = useRefs();
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const { unit: unitHeight, value: relativeHeight } = elementDynamicData.height;
  const { unit: unitWidth, value: relativeWidth } = elementDynamicData.width;
  const cssHeight = `${relativeHeight}${unitHeight ?? ''}`;
  const cssWidth = `${relativeWidth}${unitWidth ?? ''}`;

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
    height,
    width,
  };
};
