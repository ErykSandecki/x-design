import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ColumnAlignment from './components/ColumnAlignment/ColumnAlignment';
import ColumnFlow from './components/ColumnFlow/ColumnFlow';
import ColumnHeader from './components/ColumnHeader/ColumnHeader';
import ColumnPosition from './components/ColumnPosition/ColumnPosition';
import ColumnResizing from './components/ColumnResizing/ColumnResizing';
import ColumnRotation from './components/ColumnRotation/ColumnRotation';
import DesignLayoutButtonIcons from './DesignLayoutButtonIcons';
import DesignPositionButtonIcons from './DesignPositionButtonIcons';
import { UITools } from 'shared';

// hooks
import { useDesignData } from './hooks/useDesignData';

// others
import { translationNameSpace } from './constants';

const Design: FC = () => {
  const { t } = useTranslation();
  const { areParentsTheSame, isMixedLayoutType, layoutType, onChangeLayoutType, position } = useDesignData();

  return (
    <>
      <UITools.Section>
        <ColumnHeader />
      </UITools.Section>
      <UITools.Section
        buttonsIcon={DesignPositionButtonIcons(areParentsTheSame, position)}
        label={t(`${translationNameSpace}.section.2.label`)}
      >
        <ColumnAlignment />
        <ColumnPosition />
        <ColumnRotation />
      </UITools.Section>
      <UITools.Section
        buttonsIcon={DesignLayoutButtonIcons(isMixedLayoutType, layoutType, onChangeLayoutType)}
        label={t(`${translationNameSpace}.section.3.label`)}
      >
        <ColumnFlow />
        <ColumnResizing />
      </UITools.Section>
    </>
  );
};

export default Design;
