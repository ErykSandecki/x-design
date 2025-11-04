import { capitalize } from 'lodash';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// tohers
import { translationNameSpace } from './constants';

// store
import { applyElementsType, setElementsScoreToCurrentSize } from 'store/pageBuilder/actions';

// types
import { PopoverItem } from '../enums';
import { TValueExtended, TValueScore, Unit } from 'types';

const { PopoverCompound } = UITools;

export type THeightPopoverHeightProps = {
  score: TValueExtended;
  scoreKey: keyof TValueScore;
};

const HeightPopoverHeight: FC<THeightPopoverHeightProps> = ({ score, scoreKey }) => {
  const dispatch = useDispatch();
  const { mode } = score;
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon={`${capitalize(scoreKey)}Height`}
        index={PopoverItem.currentValue}
        onClick={() => dispatch(setElementsScoreToCurrentSize(scoreKey, 'height'))}
        selected={mode === 'fixed'}
        text={t(`${translationNameSpace}.${scoreKey}.1`)}
      />
      <PopoverCompound.PopoverItem
        icon="AutoHeight"
        index={PopoverItem.auto}
        onClick={() => dispatch(applyElementsType('auto', [`height.${scoreKey}`]))}
        selected={mode === 'auto'}
        text={t(`${translationNameSpace}.${scoreKey}.2`)}
      />
      <PopoverCompound.PopoverItem
        icon="Percentage"
        index={PopoverItem.unit}
        onClick={() => dispatch(applyElementsType('unit', [`height.${scoreKey}`], Unit.percentage))}
        selected={mode === 'unit'}
        text={t(`${translationNameSpace}.${scoreKey}.3`)}
      />
      <PopoverCompound.PopoverItem
        icon="Close"
        index={PopoverItem.removeScore}
        onClick={() => dispatch(applyElementsType(scoreKey, ['height']))}
        text={t(`${translationNameSpace}.${scoreKey}.4`)}
      />
    </>
  );
};

export default HeightPopoverHeight;
