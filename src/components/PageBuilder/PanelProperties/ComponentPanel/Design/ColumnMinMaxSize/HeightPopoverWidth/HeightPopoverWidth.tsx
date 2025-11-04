import { capitalize } from 'lodash';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { applyElementsSizeType, applyElementsType, setElementsScoreToCurrentSize } from 'store/pageBuilder/actions';

// types
import { PopoverItem } from '../enums';
import { TScore, TValueExtended, Unit } from 'types';

const { PopoverCompound } = UITools;

export type THeightPopoverWidthProps = {
  score: TValueExtended;
  scoreKey: keyof TScore;
};

const HeightPopoverWidth: FC<THeightPopoverWidthProps> = ({ score, scoreKey }) => {
  const dispatch = useDispatch();
  const { mode } = score;
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon={`${capitalize(scoreKey)}Width`}
        index={PopoverItem.currentValue}
        onClick={() => dispatch(setElementsScoreToCurrentSize(scoreKey, 'width'))}
        selected={mode === 'fixed'}
        text={t(`${translationNameSpace}.${scoreKey}.1`)}
      />
      <PopoverCompound.PopoverItem
        icon="AutoWidth"
        index={PopoverItem.auto}
        onClick={() => dispatch(applyElementsType('auto', [`width.${scoreKey}`]))}
        selected={mode === 'auto'}
        text={t(`${translationNameSpace}.${scoreKey}.2`)}
      />
      <PopoverCompound.PopoverItem
        icon="Percentage"
        index={PopoverItem.unit}
        onClick={() => dispatch(applyElementsType('unit', [`width.${scoreKey}`], Unit.percentage))}
        selected={mode === 'unit'}
        text={t(`${translationNameSpace}.${scoreKey}.3`)}
      />
      <PopoverCompound.PopoverItem
        icon="Close"
        index={PopoverItem.removeScore}
        onClick={() => dispatch(applyElementsSizeType('width', scoreKey))}
        text={t(`${translationNameSpace}.${scoreKey}.4`)}
      />
    </>
  );
};

export default HeightPopoverWidth;
