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

export type THeightPopoverWidthProps = {
  isMixed: boolean;
  width: TElement['width'];
};

const HeightPopoverWidth: FC<THeightPopoverWidthProps> = ({
  width,
  isMixed,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon="FixedWidth"
        index={0}
        onClick={() => dispatch(applyElementsSizeType('width', 'fixed'))}
        selected={!isMixed && isPureNumber(width.value)}
        text={t(`${translationNameSpace}.1`)}
      />
      <PopoverCompound.PopoverItem
        icon="AutoWidth"
        index={1}
        onClick={() => dispatch(applyElementsSizeType('width', 'auto'))}
        selected={!isMixed && width.value === 'auto'}
        text={t(`${translationNameSpace}.2`)}
      />
      <PopoverCompound.PopoverSeparator />
      <PopoverCompound.PopoverItem
        icon="MinWidth"
        index={2}
        selected={false}
        text={t(`${translationNameSpace}.3`)}
      />
      <PopoverCompound.PopoverItem
        icon="MaxWidth"
        index={3}
        selected={false}
        text={t(`${translationNameSpace}.4`)}
      />
    </>
  );
};

export default HeightPopoverWidth;
