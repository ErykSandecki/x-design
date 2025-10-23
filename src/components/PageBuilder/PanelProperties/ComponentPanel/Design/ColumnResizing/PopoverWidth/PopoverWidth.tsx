import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { applyElementsSizeType } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { isPureNumber } from 'utils';

const { PopoverCompound } = UITools;

export type TPopoverWidthProps = {
  isMixed: boolean;
  width: TElement['width'];
};

const PopoverWidth: FC<TPopoverWidthProps> = ({ width, isMixed }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon="FixedWidth"
        index={0}
        onClick={() => dispatch(applyElementsSizeType('width', 'fixed'))}
        selected={!isMixed && !width.unit && isPureNumber(width.value)}
        text={t(`${translationNameSpace}.1`)}
      />
      <PopoverCompound.PopoverItem
        icon="AutoWidth"
        index={1}
        onClick={() => dispatch(applyElementsSizeType('width', 'auto'))}
        selected={!isMixed && width.value === 'auto'}
        text={t(`${translationNameSpace}.2`)}
      />
      <PopoverCompound.PopoverItem
        icon="Percentage"
        index={2}
        onClick={() => dispatch(applyElementsSizeType('width', 'unit'))}
        selected={!isMixed && !!width.unit}
        text={t(`${translationNameSpace}.3`)}
      />
      <PopoverCompound.PopoverSeparator visible={!isMixed} />
      <PopoverCompound.PopoverItem
        icon="MinWidth"
        index={3}
        onClick={() => dispatch(applyElementsSizeType('width', 'min'))}
        selected={!!width.min}
        text={t(`${translationNameSpace}.4`)}
        visible={!isMixed}
      />
      <PopoverCompound.PopoverItem
        icon="MaxWidth"
        index={4}
        onClick={() => dispatch(applyElementsSizeType('width', 'max'))}
        selected={!!width.max}
        text={t(`${translationNameSpace}.5`)}
        visible={!isMixed}
      />
    </>
  );
};

export default PopoverWidth;
