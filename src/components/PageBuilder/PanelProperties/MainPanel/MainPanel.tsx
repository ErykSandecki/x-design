import { FC } from 'react';

// components
import Design from './Design/Design';

// types
import { Tab } from '../enums';

export type TMainPanel = {
  activeTab: Tab;
};

const MainPanel: FC<TMainPanel> = ({ activeTab }) => {
  if (activeTab === Tab.design) {
    return <Design />;
  }

  return <></>;
};

export default MainPanel;
