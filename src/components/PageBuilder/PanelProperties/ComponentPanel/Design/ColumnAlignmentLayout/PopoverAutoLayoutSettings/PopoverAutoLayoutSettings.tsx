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

export type TPopoverAutoLayoutSettingsProps = {};

const PopoverAutoLayoutSettings: FC<TPopoverAutoLayoutSettingsProps> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return <></>;
};

export default PopoverAutoLayoutSettings;
