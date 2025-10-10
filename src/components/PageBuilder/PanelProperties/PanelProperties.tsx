import { FC, memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ComponentPanel from './ComponentPanel/ComponentPanel';
import MainPanel from './MainPanel/MainPanel';
import { Box, E2EDataAttribute, TUITypes, UITools } from 'shared';

// hooks
import { useResizeHandler, useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { TABS, translationNameSpace } from './constants';
import { PANEL_PROPERTIES_ID } from '../constants';

// store
import { selectedElementsSelector } from 'store/pageBuilder/selectors';

// styles
import styles from './panel-properties.scss';

// types
import { E2EAttribute, ZIndex } from 'types';
import { Tab } from './enums';

export type TPanelPropertiesProps = {};

const PanelProperties: FC<TPanelPropertiesProps> = () => {
  const boxRef = useRef(null);
  const selectedElements = useSelector(selectedElementsSelector);
  const isSelected = !!selectedElements.length;
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(Tab.design);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { onMouseDownX, width } = useResizeHandler(0, 240, window.innerHeight, 500, 0, 240, boxRef);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      e2eValue="panel-properties"
      id={PANEL_PROPERTIES_ID}
      onMouseDown={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      ref={boxRef}
      style={{ touchAction: 'manipulation', width }}
      sx={{
        bg: 'neutral5',
        borderLeft: 1,
        boxSizing: 'border-box',
        height: `100vh`,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: ZIndex.standard,
      }}
    >
      <E2EDataAttribute type={E2EAttribute.resize}>
        <Box
          classes={{ className: cx(classNamesWithTheme.areaHandleResize) }}
          onMouseDown={(event) => onMouseDownX(event, true)}
          sx={{ height: '100%', left: '0', position: 'absolute', top: '0', width: '8px' }}
        />
      </E2EDataAttribute>
      <UITools.Section label={t(`${translationNameSpace}.section.label`)}>
        <UITools.Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab as TUITypes['TTabsProps']['setActiveTab']}
          tabs={TABS}
        />
      </UITools.Section>
      <div className={cx(classNamesWithTheme.sections)}>
        {isSelected ? <ComponentPanel activeTab={activeTab} /> : <MainPanel activeTab={activeTab} />}
      </div>
    </Box>
  );
};

export default memo(PanelProperties);
