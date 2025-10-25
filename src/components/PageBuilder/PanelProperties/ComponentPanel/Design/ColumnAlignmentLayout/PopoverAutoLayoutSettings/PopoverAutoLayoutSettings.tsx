import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import PopoverAutoLayoutBoxSizing from './PopoverAutoLayoutBoxSizing';
import PreviewBoxSizing from './PreviewBoxSizing/PreviewBoxSizing';
import { UITools } from 'shared';

// others
import { PREVIEW_BOX_SIZING_ID, translationNameSpace } from './constants';

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
      <PopoverCompound.PopoverPreview>
        <PopoverCompound.PopoverPreviewItem id={PREVIEW_BOX_SIZING_ID}>
          {(activeOption) => <PreviewBoxSizing activeOption={activeOption} />}
        </PopoverCompound.PopoverPreviewItem>
      </PopoverCompound.PopoverPreview>
      <PopoverAutoLayoutBoxSizing isMixedBoxSizing={isMixedBoxSizing} layout={layout} />
    </>
  );
};

export default PopoverAutoLayoutSettings;
