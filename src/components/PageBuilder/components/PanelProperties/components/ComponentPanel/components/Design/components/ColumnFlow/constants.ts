// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';
import { translationNameSpace as parentNameSpace } from '../../constants';

// types
import { LayoutType } from 'types';
import { TToggleButton } from 'shared/UITools/components/ToggleButtonGroup/types';

export const translationNameSpace = `${parentNameSpace}.columnFlow`;

export const toggleButtons = (t: TT): Array<TToggleButton<LayoutType>> => [
  {
    icon: 'FlowDefault',
    tooltip: { content: t(`${TOOLTIP_TRANSLATION_KEY}.flow.${LayoutType.freeForm}`) },
    value: LayoutType.freeForm,
  },
  {
    icon: 'FlowVertical',
    tooltip: { content: t(`${TOOLTIP_TRANSLATION_KEY}.flow.${LayoutType.vertical}`) },
    value: LayoutType.vertical,
  },
  {
    icon: 'FlowHorizontal',
    tooltip: { content: t(`${TOOLTIP_TRANSLATION_KEY}.flow.${LayoutType.horizontal}`) },
    value: LayoutType.horizontal,
  },
  {
    icon: 'FlowGrid',
    tooltip: { content: t(`${TOOLTIP_TRANSLATION_KEY}.flow.${LayoutType.grid}`) },
    value: LayoutType.grid,
  },
];
