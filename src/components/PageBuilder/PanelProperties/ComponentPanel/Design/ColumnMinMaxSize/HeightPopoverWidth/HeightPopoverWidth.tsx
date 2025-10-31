import { capitalize } from 'lodash';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
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

export type THeightPopoverWidthProps = {
  score: TSize;
  scoreKey: keyof TScore;
};

const HeightPopoverWidth: FC<THeightPopoverWidthProps> = ({ score, scoreKey }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon={`${capitalize(scoreKey)}Width`}
        index={PopoverItem.currentValue}
        onClick={() => dispatch(setElementsScoreToCurrentSize(scoreKey, 'width'))}
        selected={!score.unit && isPureNumber(score?.value || '')}
        text={t(`${translationNameSpace}.${scoreKey}.1`)}
      />
      <PopoverCompound.PopoverItem
        icon="AutoWidth"
        index={PopoverItem.auto}
        onClick={() => dispatch(applyElementsSizeMinMaxType(scoreKey, 'width', 'auto'))}
        selected={score.value === 'auto'}
        text={t(`${translationNameSpace}.${scoreKey}.2`)}
      />
      <PopoverCompound.PopoverItem
        icon="Percentage"
        index={PopoverItem.unit}
        onClick={() => dispatch(applyElementsSizeMinMaxType(scoreKey, 'width', 'unit'))}
        selected={!!score.unit}
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
