// others
import { LayoutType } from 'types';
import { translationNameSpace as parentNameSpace } from '../../constants';

// types
import { TToggleButton } from 'shared/UITools/components/ToggleButtonGroup/types';

export const translationNameSpace = `${parentNameSpace}.columnFlow`;

export const toggleButtons: Array<TToggleButton<LayoutType>> = [
  { icon: 'FlowDefault', value: LayoutType.default },
  { icon: 'FlowVertical', value: LayoutType.vertical },
  { icon: 'FlowHorizontal', value: LayoutType.horizontal },
  { icon: 'FlowGrid', value: LayoutType.grid },
];
