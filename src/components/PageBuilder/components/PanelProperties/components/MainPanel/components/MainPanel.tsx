import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './Design/constants';

export type TMainPanel = {};

const MainPanel: FC<TMainPanel> = () => {
  const { t } = useTranslation();

  return (
    <>
      <UITools.Section label={t(`${translationNameSpace}.section.label`)}>
        Section
      </UITools.Section>
    </>
  );
};

export default MainPanel;
