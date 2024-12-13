import { FC } from 'react';

// components
import PanelComponents from './components/PanelComponents/PanelComponents';
import Editor from './components/Editor/Editor';
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
      <PanelComponents />

      {/* PANEL VIEW */}
      <div className={styles[classNames.panelView]}>
        <Editor />
      </div>

      {/* PROPERTIES */}
      <PanelProperties />
    </div>
  );
};

export default Main;
