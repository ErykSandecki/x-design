import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ColumnAlignment from './ColumnAlignment/ColumnAlignment';
import ColumnAlignmentLayout from './ColumnAlignmentLayout/ColumnAlignmentLayout';
import ColumnAppearance from './ColumnAppearance/ColumnAppearance';
import ColumnClipContent from './ColumnClipContent/ColumnClipContent';
import ColumnFlow from './ColumnFlow/ColumnFlow';
import ColumnHeader from './ColumnHeader/ColumnHeader';
import ColumnMargin from './ColumnMargin/ColumnMargin';
import ColumnMinMaxSize from './ColumnMinMaxSize/ColumnMinMaxSize';
import ColumnPadding from './ColumnPadding/ColumnPadding';
import ColumnPosition from './ColumnPosition/ColumnPosition';
import ColumnResizing from './ColumnResizing/ColumnResizing';
import ColumnRotation from './ColumnRotation/ColumnRotation';
import DesignAppearanceButtonIcons from './DesignAppearanceButtonIcons';
import DesignLayoutButtonIcons from './DesignLayoutButtonIcons';
import DesignPositionButtonIcons from './DesignPositionButtonIcons';
import { UITools } from 'shared';

// hooks
import { useDesignData } from './hooks/useDesignData';

// others
import { translationNameSpace } from './constants';
import ColumnBorderRadiusIndividual from './ColumnBorderRadiusIndividual/ColumnBorderRadiusIndividual';

export type TDesignProps = {
  width: number;
};

const Design: FC<TDesignProps> = ({ width }) => {
  const { t } = useTranslation();
  const { isBorderRaiusModeMerged, onChangeLayoutType, setBorderRadiusMode } = useDesignData();

  return (
    <>
      <UITools.Section>
        <ColumnHeader />
      </UITools.Section>
      <UITools.Section component={<DesignPositionButtonIcons />} label={t(`${translationNameSpace}.section.2.label`)}>
        <ColumnAlignment />
        <ColumnPosition />
        <ColumnRotation />
      </UITools.Section>
      <UITools.Section
        component={<DesignLayoutButtonIcons onChangeLayoutType={onChangeLayoutType} />}
        label={t(`${translationNameSpace}.section.3.label`)}
      >
        <ColumnFlow />
        <ColumnResizing />
        <ColumnMinMaxSize scoreKey="min" />
        <ColumnMinMaxSize scoreKey="max" />
        <ColumnAlignmentLayout width={width} />
        <ColumnPadding />
        <ColumnMargin />
        <ColumnClipContent />
      </UITools.Section>
      <UITools.Section component={<DesignAppearanceButtonIcons />} label={t(`${translationNameSpace}.section.4.label`)}>
        <ColumnAppearance isBorderRaiusModeMerged={isBorderRaiusModeMerged} setBorderRadiusMode={setBorderRadiusMode} />
        <ColumnBorderRadiusIndividual isBorderRaiusModeMerged={isBorderRaiusModeMerged} />
      </UITools.Section>
    </>
  );
};

export default memo(Design);
