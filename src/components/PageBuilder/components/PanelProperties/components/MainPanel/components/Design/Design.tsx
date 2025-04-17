import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

export type TDesign = {};

const Design: FC<TDesign> = () => {
  const { t } = useTranslation();

  return (
    <>
      <UITools.Section label={t(`${translationNameSpace}.section.1.label`)}>
        <UITools.ColorPicker placement="leftBottom" />
      </UITools.Section>
    </>
  );
};

export default Design;
