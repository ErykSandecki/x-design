import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnAlignment from './ColumnAlignment/ColumnAlignment';
import ColumnAlignmentLayout from './ColumnAlignmentLayout/ColumnAlignmentLayout';
import ColumnClipContent from './ColumnClipContent/ColumnClipContent';
import ColumnFlow from './ColumnFlow/ColumnFlow';
import ColumnHeader from './ColumnHeader/ColumnHeader';
import DesignLayoutButtonIcons from './DesignLayoutButtonIcons';
import ColumnMargin from './ColumnMargin/ColumnMargin';
import ColumnMinMaxSize from './ColumnMinMaxSize/ColumnMinMaxSize';
import ColumnPadding from './ColumnPadding/ColumnPadding';
import ColumnPosition from './ColumnPosition/ColumnPosition';
import DesignPositionButtonIcons from './DesignPositionButtonIcons';
import ColumnResizing from './ColumnResizing/ColumnResizing';
import ColumnRotation from './ColumnRotation/ColumnRotation';
import { UITools } from 'shared';

// hooks
import { useDesignData } from './hooks/useDesignData';

// others
import { translationNameSpace } from './constants';
import DesignAppearanceButtonIcons from './DesignAppearanceButtonIcons';

export type TDesignProps = {
  width: number;
};

const Design: FC<TDesignProps> = ({ width }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { areParentsTheSame, isMixedBlendMode, isMixedLayoutType, layoutType, onChangeLayoutType, position } =
    useDesignData();

  return (
    <>
      <UITools.Section>
        <ColumnHeader />
      </UITools.Section>
      <UITools.Section
        buttonsIcon={DesignPositionButtonIcons(areParentsTheSame, dispatch, position, useSelector)}
        label={t(`${translationNameSpace}.section.2.label`)}
      >
        <ColumnAlignment />
        <ColumnPosition />
        <ColumnRotation />
      </UITools.Section>
      <UITools.Section
        buttonsIcon={DesignLayoutButtonIcons(dispatch, isMixedLayoutType, layoutType, onChangeLayoutType)}
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
      <UITools.Section
        buttonsIcon={DesignAppearanceButtonIcons(dispatch, isMixedBlendMode, t, useSelector)}
        label={t(`${translationNameSpace}.section.4.label`)}
      >
        <></>
      </UITools.Section>
    </>
  );
};

export default memo(Design);
