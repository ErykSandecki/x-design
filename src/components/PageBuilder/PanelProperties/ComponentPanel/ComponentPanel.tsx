import { FC } from 'react';

// components
import Design from './Design/Design';

// types
import { Tab } from '../enums';

export type TMainPanel = {
  activeTab: Tab;
  width: number;
};

const ComponentPanel: FC<TMainPanel> = ({ activeTab, width }) => {
  if (activeTab === Tab.design) {
    return <Design width={width} />;
  }

  return <></>;
};

export default ComponentPanel;
