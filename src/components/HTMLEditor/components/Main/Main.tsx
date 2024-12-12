import { FC } from 'react';

// components
import BlocksPanel from './components/BlocksPanel/BlocksPanel';
import Diagram from './components/Diagram/Diagram';
import PanelProperties from './components/PanelProperties/PanelProperties';

// others
import { className, classNames } from './classNames';

// styles
import styles from './main.scss';

export type TProps = {};

const Main: FC<TProps> = () => {
  return (
    <div className={styles[classNames[className]]}>
      {/* BLOCKS PANEL */}
      <BlocksPanel />

      {/* PANEL VIEW */}
      <div className={styles[classNames.panelView]}>
        <Diagram />
      </div>

      {/* PROPERTIES */}
      <PanelProperties />
    </div>
  );
};

export default Main;
