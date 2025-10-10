import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { applyElementsSizeType, setElementsScoreToCurrentSize } from 'store/pageBuilder/actions';

// types
import { TScore } from 'types';

const { PopoverCompound } = UITools;

export type THeightPopoverWidthProps = {
  score: keyof TScore;
};

const HeightPopoverWidth: FC<THeightPopoverWidthProps> = ({ score }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        index={0}
        onClick={() => dispatch(setElementsScoreToCurrentSize(score, 'width'))}
        text={t(`${translationNameSpace}.${score}.1`)}
      />
      <PopoverCompound.PopoverItem
        index={1}
        onClick={() => dispatch(applyElementsSizeType('width', score))}
        text={t(`${translationNameSpace}.${score}.2`)}
      />
    </>
  );
};

export default HeightPopoverWidth;
