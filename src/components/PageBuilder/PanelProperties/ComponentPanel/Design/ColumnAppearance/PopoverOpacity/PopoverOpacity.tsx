import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { applyElementsOpacityType } from 'store/pageBuilder/actions';

// types
import { PopoverItem } from '../enums';
import { TValueExtended } from 'types';

const { PopoverCompound } = UITools;

export type TPopoverInsetsProps = {
  isMixed: boolean;
  mode: TValueExtended['mode'];
  value: string;
};

const PopoverOpacity: FC<TPopoverInsetsProps> = ({ isMixed, mode, value }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon="Opacity"
        index={PopoverItem.fixed}
        onClick={() => dispatch(applyElementsOpacityType('fixed'))}
        selected={!isMixed && mode === 'fixed'}
        text={t(`${translationNameSpace}.1`, { value })}
      />
    </>
  );
};

export default PopoverOpacity;
