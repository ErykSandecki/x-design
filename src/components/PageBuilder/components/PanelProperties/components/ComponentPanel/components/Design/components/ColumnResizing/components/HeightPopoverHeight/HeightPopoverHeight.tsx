import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// tohers
import { translationNameSpace } from './constants';

// store
import { applyElementsSizeType } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { isPureNumber } from 'utils';

const { PopoverCompound } = UITools;

export type THeightPopoverHeightProps = {
  height: TElement['height'];
  isMixed: boolean;
};

const HeightPopoverHeight: FC<THeightPopoverHeightProps> = ({ height, isMixed }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon="FixedHeight"
        index={0}
        onClick={() => dispatch(applyElementsSizeType('height', 'fixed'))}
        selected={!isMixed && !height.unit && isPureNumber(height.value)}
        text={t(`${translationNameSpace}.1`)}
      />
      <PopoverCompound.PopoverItem
        icon="AutoHeight"
        index={1}
        onClick={() => dispatch(applyElementsSizeType('height', 'auto'))}
        selected={!isMixed && height.value === 'auto'}
        text={t(`${translationNameSpace}.2`)}
      />
      <PopoverCompound.PopoverItem
        icon="Percentage"
        index={2}
        onClick={() => dispatch(applyElementsSizeType('height', 'unit'))}
        selected={!isMixed && !!height.unit}
        text={t(`${translationNameSpace}.3`)}
      />
      <PopoverCompound.PopoverSeparator visible={!isMixed} />
      <PopoverCompound.PopoverItem
        icon="MinHeight"
        index={3}
        onClick={() => dispatch(applyElementsSizeType('height', 'min'))}
        selected={!!height.min}
        text={t(`${translationNameSpace}.4`)}
        visible={!isMixed}
      />
      <PopoverCompound.PopoverItem
        icon="MaxHeight"
        index={4}
        onClick={() => dispatch(applyElementsSizeType('height', 'max'))}
        selected={!!height.max}
        text={t(`${translationNameSpace}.5`)}
        visible={!isMixed}
      />
    </>
  );
};

export default HeightPopoverHeight;
