import { FC } from 'react';

// components
import Design from './components/Design/Design';

// types
import { Tab } from '../../enums';

export type TMainPanel = {
  activeTab: Tab;
};

const ComponentPanel: FC<TMainPanel> = ({ activeTab }) => {
  if (activeTab === Tab.design) {
    return <Design />;
  }

  return <></>;
};

export default ComponentPanel;
