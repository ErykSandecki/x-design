import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { Box, E2EDataAttribute } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './tabs.scss';

// types
import { E2EAttribute } from 'types';
import { TTab } from './types';

export type TTabsProps = {
  activeTab: TTab['name'];
  setActiveTab: (activeTab: TTab['name']) => void;
  tabs: Array<TTab>;
};

export const Tabs: FC<TTabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  const disabledStates = tabs.length < 2;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Box classes={{ className: cx(classNamesWithTheme[className]) }}>
      {tabs.map(({ labelTranslationKey, name }) => (
        <E2EDataAttribute key={name} type={E2EAttribute.tab} value={name}>
          <div
            className={cx(
              classNamesWithTheme.tab.name,
              [classNamesWithTheme.tab.modificators.active, activeTab === name],
              [classNamesWithTheme.tab.modificators.disabled, disabledStates],
            )}
            key={name}
            onClick={() => setActiveTab(name)}
          >
            {t(labelTranslationKey)}
          </div>
        </E2EDataAttribute>
      ))}
    </Box>
  );
};

export default Tabs;
