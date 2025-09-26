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
  const {
    height: { unit: unitHeight, value: cssHeight },
    width: { unit: unitWidth, value: cssWidth },
  } = elementDynamicData;

  const height =
    (isPureNumber(cssHeight) || !itemsRefs[id]) && !unitHeight
      ? cssHeight
      : parseInt(getComputedStyle(itemsRefs[id]).height);

  const width =
    (isPureNumber(cssWidth) || !itemsRefs[id]) && !unitWidth
      ? cssWidth
      : parseInt(getComputedStyle(itemsRefs[id]).width);

  return {
    cssHeight: `${cssHeight}${unitHeight ?? ''}`,
    cssWidth: `${cssWidth}${unitWidth ?? ''}`,
    height,
    width,
  };
};
