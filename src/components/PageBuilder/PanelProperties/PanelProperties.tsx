import cx from 'classnames';
import { FC, memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ComponentPanel from './ComponentPanel/ComponentPanel';
import MainPanel from './MainPanel/MainPanel';
import { E2EDataAttribute, TUITypes, UITools } from 'shared';

// hooks
import { useResizeHandler } from 'hooks';

// others
import { PANEL_PROPERTIES_ID } from '../constants';
import { TABS, translationNameSpace } from './constants';

// store
import { anySelectedElementSelector } from 'store/pageBuilder/selectors';

// styles
import styles from './panel-properties.module.scss';

// types
import { E2EAttribute } from 'types';
import { Tab } from './enums';

const PanelProperties: FC = () => {
  const anySelectedElement = useSelector(anySelectedElementSelector);
  const boxRef = useRef(null);
  const { onMouseDownX, width } = useResizeHandler(0, 240, window.innerHeight, 500, 0, 240, boxRef);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(Tab.design);

  return (
    <E2EDataAttribute type={E2EAttribute.box} value="panel-properties">
      <div
        className={cx(styles.PanelProperties)}
        id={PANEL_PROPERTIES_ID}
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        ref={boxRef}
        style={{ touchAction: 'manipulation', width }}
      >
        <E2EDataAttribute type={E2EAttribute.resize}>
          <div
            className={cx(styles['PanelProperties__area-handle-resize'])}
            onMouseDown={(event) => onMouseDownX(event, true)}
          />
        </E2EDataAttribute>
        <UITools.Section label={t(`${translationNameSpace}.section.label`)}>
          <UITools.Tabs
            activeTab={activeTab}
            e2eValue="panel-mode"
            setActiveTab={setActiveTab as TUITypes['TTabsProps']['setActiveTab']}
            tabs={TABS}
          />
        </UITools.Section>
        <div className={cx(styles.PanelProperties__sections)}>
          {anySelectedElement ? (
            <ComponentPanel activeTab={activeTab} width={width} />
          ) : (
            <MainPanel activeTab={activeTab} />
          )}
        </div>
      </div>
    </E2EDataAttribute>
  );
};

export default memo(PanelProperties);
