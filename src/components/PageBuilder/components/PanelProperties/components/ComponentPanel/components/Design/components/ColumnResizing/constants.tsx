import { Dispatch } from 'redux';
import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace as parentNameSpace } from '../../constants';

// store
import { applyElementsSizeType } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { isPureNumber } from 'utils';

const { PopoverCompound } = UITools;

export const translationNameSpace = `${parentNameSpace}.columnResizing`;

export const heightPopoverData = (
  dispatch: Dispatch,
  height: TElement['height'],
  isMixed: boolean,
  t: TT,
): ReactNode => (
  <>
    <PopoverCompound.PopoverItem
      icon="FixedHeight"
      index={0}
      onClick={() => dispatch(applyElementsSizeType('height', 'fixed'))}
      selected={!isMixed && isPureNumber(height.value)}
      text={t(`${translationNameSpace}.popover.height.1`)}
    />
    <PopoverCompound.PopoverItem
      icon="AutoHeight"
      index={1}
      onClick={() => dispatch(applyElementsSizeType('height', 'auto'))}
      selected={!isMixed && height.value === 'auto'}
      text={t(`${translationNameSpace}.popover.height.2`)}
    />
    <PopoverCompound.PopoverSeparator />
    <PopoverCompound.PopoverItem
      icon="MinHeight"
      index={2}
      selected={false}
      text={t(`${translationNameSpace}.popover.height.3`)}
    />
    <PopoverCompound.PopoverItem
      icon="MaxHeight"
      index={3}
      selected={false}
      text={t(`${translationNameSpace}.popover.height.4`)}
    />
  </>
);

export const widthPopoverData = (
  dispatch: Dispatch,
  isMixed: boolean,
  t: TT,
  width: TElement['height'],
): ReactNode => (
  <>
    <PopoverCompound.PopoverItem
      icon="FixedWidth"
      index={0}
      onClick={() => dispatch(applyElementsSizeType('width', 'fixed'))}
      selected={!isMixed && isPureNumber(width.value)}
      text={t(`${translationNameSpace}.popover.width.1`)}
    />
    <PopoverCompound.PopoverItem
      icon="AutoWidth"
      index={1}
      onClick={() => dispatch(applyElementsSizeType('width', 'auto'))}
      selected={!isMixed && width.value === 'auto'}
      text={t(`${translationNameSpace}.popover.width.2`)}
    />
    <PopoverCompound.PopoverSeparator />
    <PopoverCompound.PopoverItem
      icon="MinWidth"
      index={2}
      selected={false}
      text={t(`${translationNameSpace}.popover.width.3`)}
    />
    <PopoverCompound.PopoverItem
      icon="MaxWidth"
      index={3}
      selected={false}
      text={t(`${translationNameSpace}.popover.width.4`)}
    />
  </>
);
