import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// tohers
import { translationNameSpace } from './constants';

// store
import { applyElementsSizeType, setElementsScoreToCurrentSize } from 'store/pageBuilder/actions';

// types
import { TScore } from 'types';

const { PopoverCompound } = UITools;

export type THeightPopoverHeightProps = {
  score: keyof TScore;
};

const HeightPopoverHeight: FC<THeightPopoverHeightProps> = ({ score }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        index={0}
        onClick={() => dispatch(setElementsScoreToCurrentSize(score, 'height'))}
        text={t(`${translationNameSpace}.${score}.1`)}
      />
      <PopoverCompound.PopoverItem
        index={1}
        onClick={() => dispatch(applyElementsSizeType('height', score))}
        text={t(`${translationNameSpace}.${score}.2`)}
      />
    </>
  );
};

export default HeightPopoverHeight;
