import { FC, useMemo } from 'react';
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
import { TGap, TValue } from 'types';

// utils
import { isPureNumber } from 'utils';

const { PopoverCompound } = UITools;

export type TPopoverGapProps = {
  gapKey: keyof TGap;
  gapValue: TValue;
  isMixed: boolean;
};

const PopoverGap: FC<TPopoverGapProps> = ({ gapKey, gapValue, isMixed }) => {
  const dispatch = useDispatch();
  const icon = useMemo(() => (gapKey === 'column' ? 'GapColumns' : 'GapRows'), []);
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon={icon}
        index={PopoverItem.fixed}
        onClick={() => dispatch(applyElementsType('fixed', [`layout.gap.${gapKey}`]))}
        selected={!isMixed && isPureNumber(gapValue.value)}
        text={t(`${translationNameSpace}.${gapKey}.1`, { value: gapValue.value })}
      />
    </>
  );
};

export default PopoverGap;
