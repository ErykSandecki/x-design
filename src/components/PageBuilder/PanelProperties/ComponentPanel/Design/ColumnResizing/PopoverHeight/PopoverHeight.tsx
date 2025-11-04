import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// tohers
import { translationNameSpace } from './constants';

// store
import { applyElementsType } from 'store/pageBuilder/actions';

// types
import { PopoverItem } from '../enums';
import { TElement, Unit } from 'types';

const { PopoverCompound } = UITools;

export type TPopoverHeightProps = {
  height: TElement['height'];
  isMixed: boolean;
};

const PopoverHeight: FC<TPopoverHeightProps> = ({ height, isMixed }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon="FixedHeight"
        index={PopoverItem.fixed}
        onClick={() => dispatch(applyElementsType('fixed', ['height']))}
        selected={height.mode === 'fixed'}
        text={t(`${translationNameSpace}.1`)}
      />
      <PopoverCompound.PopoverItem
        icon="AutoHeight"
        index={PopoverItem.auto}
        onClick={() => dispatch(applyElementsType('auto', ['height']))}
        selected={height.mode === 'auto'}
        text={t(`${translationNameSpace}.2`)}
      />
      <PopoverCompound.PopoverItem
        icon="Percentage"
        index={PopoverItem.unit}
        onClick={() => dispatch(applyElementsType('unit', ['height'], Unit.percentage))}
        selected={height.mode === 'unit'}
        text={t(`${translationNameSpace}.3`)}
      />
      <PopoverCompound.PopoverSeparator visible={!isMixed} />
      <PopoverCompound.PopoverItem
        icon="MinHeight"
        index={PopoverItem.minScore}
        onClick={() => dispatch(applyElementsType('min', ['height']))}
        selected={!!height.min}
        text={t(`${translationNameSpace}.4`)}
        visible={!isMixed}
      />
      <PopoverCompound.PopoverItem
        icon="MaxHeight"
        index={PopoverItem.maxScore}
        onClick={() => dispatch(applyElementsType('max', ['height']))}
        selected={!!height.max}
        text={t(`${translationNameSpace}.5`)}
        visible={!isMixed}
      />
    </>
  );
};

export default PopoverHeight;
