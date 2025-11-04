import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { applyElementsType } from 'store/pageBuilder/actions';

// types
import { PopoverItem } from '../enums';
import { TElement, Unit } from 'types';

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
        index={PopoverItem.fixed}
        onClick={() => dispatch(applyElementsType('fixed', ['width']))}
        selected={width.mode === 'fixed'}
        text={t(`${translationNameSpace}.1`)}
      />
      <PopoverCompound.PopoverItem
        icon="AutoWidth"
        index={PopoverItem.auto}
        onClick={() => dispatch(applyElementsType('auto', ['width']))}
        selected={width.mode === 'auto'}
        text={t(`${translationNameSpace}.2`)}
      />
      <PopoverCompound.PopoverItem
        icon="Percentage"
        index={PopoverItem.unit}
        onClick={() => dispatch(applyElementsType('unit', ['width'], Unit.percentage))}
        selected={width.mode === 'unit'}
        text={t(`${translationNameSpace}.3`)}
      />
      <PopoverCompound.PopoverSeparator visible={!isMixed} />
      <PopoverCompound.PopoverItem
        icon="MinWidth"
        index={PopoverItem.minScore}
        onClick={() => dispatch(applyElementsType('min', ['width']))}
        selected={!!width.min}
        text={t(`${translationNameSpace}.4`)}
        visible={!isMixed}
      />
      <PopoverCompound.PopoverItem
        icon="MaxWidth"
        index={PopoverItem.maxScore}
        onClick={() => dispatch(applyElementsType('max', ['width']))}
        selected={!!width.max}
        text={t(`${translationNameSpace}.5`)}
        visible={!isMixed}
      />
    </>
  );
};

export default PopoverWidth;
