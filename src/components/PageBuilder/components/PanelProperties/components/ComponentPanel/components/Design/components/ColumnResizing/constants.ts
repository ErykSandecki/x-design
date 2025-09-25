// others
import { translationNameSpace as parentNameSpace } from '../../constants';

// types
import { TPopoverItem } from 'shared/UITools/components/Popover/types';
import { TT } from 'types';

export const translationNameSpace = `${parentNameSpace}.columnResizing`;

export const heightPopoverData = (t: TT): Array<TPopoverItem> => [
  {
    icon: 'FixedHeight',
    selected: true,
    text: t(`${translationNameSpace}.popover.height.1`),
  },
  { icon: 'AutoHeight', text: t(`${translationNameSpace}.popover.height.2`) },
  { separator: true },
  { icon: 'MinHeight', text: t(`${translationNameSpace}.popover.height.3`) },
  { icon: 'MaxHeight', text: t(`${translationNameSpace}.popover.height.4`) },
];

export const widthPopoverData = (t: TT): Array<TPopoverItem> => [
  {
    icon: 'FixedWidth',
    selected: true,
    text: t(`${translationNameSpace}.popover.width.1`),
  },
  { icon: 'AutoWidth', text: t(`${translationNameSpace}.popover.width.2`) },
  { separator: true },
  { icon: 'MinWidth', text: t(`${translationNameSpace}.popover.width.3`) },
  { icon: 'MaxWidth', text: t(`${translationNameSpace}.popover.width.4`) },
];
