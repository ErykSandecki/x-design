import { Dispatch } from 'redux';

// others
import { translationNameSpace as parentNameSpace } from '../../constants';

// types
import { TElement } from 'types';
import { TPopoverItem } from 'shared/UITools/components/Popover/types';

// utils
import { applyElementsSizeType } from 'store/pageBuilder/actions';
import { isPureNumber } from 'utils';

export const translationNameSpace = `${parentNameSpace}.columnResizing`;

export const heightPopoverData = (
  dispatch: Dispatch,
  height: TElement['height'],
  isMixed: boolean,
  t: TT,
): Array<TPopoverItem> => [
  {
    icon: 'FixedHeight',
    onClick: () => dispatch(applyElementsSizeType('height', 'fixed')),
    selected: !isMixed && isPureNumber(height.value),
    text: t(`${translationNameSpace}.popover.height.1`),
  },
  {
    icon: 'AutoHeight',
    onClick: () => dispatch(applyElementsSizeType('height', 'auto')),
    selected: !isMixed && height.value === 'auto',
    text: t(`${translationNameSpace}.popover.height.2`),
  },
  { separator: true },
  { icon: 'MinHeight', text: t(`${translationNameSpace}.popover.height.3`) },
  { icon: 'MaxHeight', text: t(`${translationNameSpace}.popover.height.4`) },
];

export const widthPopoverData = (
  dispatch: Dispatch,
  isMixed: boolean,
  t: TT,
  width: TElement['width'],
): Array<TPopoverItem> => [
  {
    icon: 'FixedWidth',
    onClick: () => dispatch(applyElementsSizeType('width', 'fixed')),
    selected: !isMixed && isPureNumber(width.value),
    text: t(`${translationNameSpace}.popover.width.1`),
  },
  {
    icon: 'AutoWidth',
    onClick: () => dispatch(applyElementsSizeType('width', 'auto')),
    selected: !isMixed && width.value === 'auto',
    text: t(`${translationNameSpace}.popover.width.2`),
  },
  { separator: true },
  { icon: 'MinWidth', text: t(`${translationNameSpace}.popover.width.3`) },
  { icon: 'MaxWidth', text: t(`${translationNameSpace}.popover.width.4`) },
];
