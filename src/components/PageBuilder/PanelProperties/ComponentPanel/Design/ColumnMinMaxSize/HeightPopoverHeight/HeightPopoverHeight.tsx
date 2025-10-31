import { capitalize } from 'lodash';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// tohers
import { translationNameSpace } from './constants';

// store
import {
  applyElementsSizeMinMaxType,
  applyElementsSizeType,
  setElementsScoreToCurrentSize,
} from 'store/pageBuilder/actions';

// types
import { PopoverItem } from '../enums';
import { TScore, TSize } from 'types';

// utils
import { isPureNumber } from 'utils';

const { PopoverCompound } = UITools;

export type THeightPopoverHeightProps = {
  score: TSize;
  scoreKey: keyof TScore;
};

const HeightPopoverHeight: FC<THeightPopoverHeightProps> = ({ score, scoreKey }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon={`${capitalize(scoreKey)}Height`}
        index={PopoverItem.currentValue}
        onClick={() => dispatch(setElementsScoreToCurrentSize(scoreKey, 'height'))}
        selected={!score.unit && isPureNumber(score?.value || '')}
        text={t(`${translationNameSpace}.${scoreKey}.1`)}
      />
      <PopoverCompound.PopoverItem
        icon="AutoHeight"
        index={PopoverItem.auto}
        onClick={() => dispatch(applyElementsSizeMinMaxType(scoreKey, 'height', 'auto'))}
        selected={score.value === 'auto'}
        text={t(`${translationNameSpace}.${scoreKey}.2`)}
      />
      <PopoverCompound.PopoverItem
        icon="Percentage"
        index={PopoverItem.unit}
        onClick={() => dispatch(applyElementsSizeMinMaxType(scoreKey, 'height', 'unit'))}
        selected={!!score.unit}
        text={t(`${translationNameSpace}.${scoreKey}.3`)}
      />
      <PopoverCompound.PopoverItem
        icon="Close"
        index={PopoverItem.removeScore}
        onClick={() => dispatch(applyElementsSizeType('height', scoreKey))}
        text={t(`${translationNameSpace}.${scoreKey}.4`)}
      />
    </>
  );
};

export default HeightPopoverHeight;
