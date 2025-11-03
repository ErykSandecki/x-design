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
import { TValueType } from 'types';

const { PopoverCompound } = UITools;

export type TPopoverInsetsProps = {
  isMixed: boolean;
  type: TValueType;
  value: string;
};

const PopoverOpacity: FC<TPopoverInsetsProps> = ({ isMixed, type, value }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon="Opacity"
        index={PopoverItem.fixed}
        onClick={() => dispatch(applyElementsOpacityType('fixed'))}
        selected={!isMixed && type === 'fixed'}
        text={t(`${translationNameSpace}.1`, { value })}
      />
    </>
  );
};

export default PopoverOpacity;
