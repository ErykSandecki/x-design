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
  setActiveTab: TFunc<[TTab['name']]>;
  tabs: Array<TTab>;
};

export const Tabs: FC<TTabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  const disabledStates = tabs.length < 2;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      sx={{ alignItems: 'center', columnGap: '5px', display: 'flex' }}
    >
      {tabs.map(({ labelTranslationKey, name }) => (
        <E2EDataAttribute key={name} type={E2EAttribute.tab} value={name}>
          <Box
            classes={{
              className: cx(
                classNamesWithTheme.tab.name,
                [classNamesWithTheme.tab.modificators.active, activeTab === name],
                [classNamesWithTheme.tab.modificators.disabled, disabledStates],
              ),
            }}
            key={name}
            onClick={() => setActiveTab(name)}
            sx={{
              alignItems: 'center',
              borderRadius: '5px',
              boxSizing: 'border-box',
              display: 'flex',
              height: '24px',
              justifyContent: 'center',
              px: 8,
            }}
          >
            {t(labelTranslationKey)}
          </Box>
        </E2EDataAttribute>
      ))}
    </Box>
  );
};

export default Tabs;
