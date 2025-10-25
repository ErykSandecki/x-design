import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import PopoverAutoLayoutBoxSizing from './PopoverAutoLayoutBoxSizing';
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// types
import { TElement } from 'types';

const { PopoverCompound } = UITools;

export type TPopoverAutoLayoutSettingsProps = {
  isMixedBoxSizing: boolean;
  layout: TElement['layout'];
};

const PopoverAutoLayoutSettings: FC<TPopoverAutoLayoutSettingsProps> = ({ isMixedBoxSizing, layout }) => {
  const { t } = useTranslation();

  return (
    <>
      <PopoverCompound.PopoverHeader title={t(`${translationNameSpace}.header`)} />
      <PopoverCompound.PopoverPreview />
      <PopoverAutoLayoutBoxSizing isMixedBoxSizing={isMixedBoxSizing} layout={layout} />
    </>
  );
};

export default PopoverAutoLayoutSettings;
