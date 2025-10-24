import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { applyElementsGapType } from 'store/pageBuilder/actions';

// types
import { PopoverItem } from '../enums';
import { TGap, TGapProperties } from 'types';

// utils
import { isPureNumber } from 'utils';

const { PopoverCompound } = UITools;

export type TPopoverGapProps = {
  gap: keyof TGap;
  gapProperties: TGapProperties;
  isMixed: boolean;
};

const PopoverGap: FC<TPopoverGapProps> = ({ gap, gapProperties, isMixed }) => {
  const icon = useMemo(() => (gap === 'column' ? 'GapColumns' : 'GapRows'), []);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon={icon}
        index={PopoverItem.fixed}
        onClick={() => dispatch(applyElementsGapType(gap, 'fixed'))}
        selected={!isMixed && isPureNumber(gapProperties.value)}
        text={t(`${translationNameSpace}.${gap}.1`, { value: gapProperties.value })}
      />
    </>
  );
};

export default PopoverGap;
