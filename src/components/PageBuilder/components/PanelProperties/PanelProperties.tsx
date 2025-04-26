import { FC, memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ComponentPanel from './components/ComponentPanel/ComponentPanel';
import MainPanel from './components/MainPanel/MainPanel';
import { Box, E2EDataAttribute, TUITypes, UITools } from 'shared';

// hooks
import { useResizeHandler, useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { TABS, translationNameSpace } from './constants';
import { TOOLBAR_HEIGHT } from '../../constants';

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
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(Tab.design);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { onMouseDownX, width } = useResizeHandler(
    0,
    240,
    window.innerHeight - TOOLBAR_HEIGHT,
    500,
    0,
    240,
    boxRef,
  );

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      e2eValue="panel-properties"
      onMouseDown={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      ref={boxRef}
      style={{ touchAction: 'manipulation' }}
      sx={{
        bg: 'neutral5',
        borderLeft: 1,
        boxSizing: 'border-box',
        height: `calc(100vh - ${TOOLBAR_HEIGHT}px)`,
        position: 'absolute',
        right: 0,
        top: `${TOOLBAR_HEIGHT}px`,
        width: `${width}px`,
        zIndex: ZIndex.standard,
      }}
    >
      <E2EDataAttribute type={E2EAttribute.resize}>
        <div
          className={cx(classNamesWithTheme.areaHandleResize)}
          onMouseDown={(event) => onMouseDownX(event, true)}
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
        {selectedElements.length === 0 ? (
          <MainPanel activeTab={activeTab} />
        ) : (
          <ComponentPanel activeTab={activeTab} />
        )}
      </div>
    </Box>
  );
};

export default memo(PanelProperties);
