import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { TIconProps, UITools } from 'shared';

// store
import { applyElementsInsetType } from 'store/pageBuilder/actions';

// types
import { PopoverItem } from '../enums';
import { TInsets, TInsetsName } from 'types';

// utils
import { isPureNumber } from 'utils';

const { PopoverCompound } = UITools;

export type TPopoverInsetsProps = {
  icon: TIconProps['name'];
  insetsName: TInsetsName;
  insets: Array<keyof TInsets>;
  isMixed: boolean;
  translationNameSpace: string;
  value: string;
};

const PopoverInsets: FC<TPopoverInsetsProps> = ({ icon, insetsName, insets, isMixed, translationNameSpace, value }) => {
  const key = insets.join('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverItem
        icon={icon}
        index={PopoverItem.fixed}
        onClick={() => dispatch(applyElementsInsetType(insets, insetsName, 'fixed'))}
        selected={!isMixed && isPureNumber(value)}
        text={t(`${translationNameSpace}.popover.${key}.1`, { value })}
      />
    </>
  );
};

export default PopoverInsets;
