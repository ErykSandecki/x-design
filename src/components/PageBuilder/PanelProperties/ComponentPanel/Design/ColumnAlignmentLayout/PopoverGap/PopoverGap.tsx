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
import { TGap, TValueExtended } from 'types';

const { PopoverCompound } = UITools;

export type TPopoverGapProps = {
  gap: TValueExtended;
  gapKey: keyof TGap;
  isMixed: boolean;
};

const PopoverGap: FC<TPopoverGapProps> = ({ gap, gapKey, isMixed }) => {
  const dispatch = useDispatch();
  const icon = useMemo(() => (gapKey === 'column' ? 'GapColumns' : 'GapRows'), []);
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon={icon}
        index={PopoverItem.fixed}
        onClick={() => dispatch(applyElementsType('fixed', [`layout.gap.${gapKey}`]))}
        selected={!isMixed && gap.mode === 'fixed'}
        text={t(`${translationNameSpace}.${gapKey}.1`, { value: gap.value })}
      />
    </>
  );
};

export default PopoverGap;
