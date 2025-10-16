import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Box from '../../UI/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './tabs.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TTab } from './types';

export type TTabsProps = {
  activeTab: TTab['name'];
  e2eValue?: TE2EDataAttributeProps['value'];
  setActiveTab: TFunc<[TTab['name']]>;
  tabs: Array<TTab>;
};

export const Tabs: FC<TTabsProps> = ({ activeTab, setActiveTab, e2eValue, tabs }) => {
  const disabledStates = tabs.length < 2;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      e2eAttribute={E2EAttribute.tabs}
      e2eValue={e2eValue}
      sx={{ alignItems: 'center', columnGap: '5px', display: 'flex' }}
    >
      {tabs.map(({ labelTranslationKey, name }) => {
        const isActive = activeTab === name;

        return (
          <Box
            attributes={isActive ? { [E2EAttribute.active]: '' } : {}}
            classes={{
              className: cx(
                classNamesWithTheme.tab.name,
                [classNamesWithTheme.tab.modificators.active, isActive],
                [classNamesWithTheme.tab.modificators.disabled, disabledStates],
              ),
            }}
            e2eAttribute={E2EAttribute.tab}
            e2eValue={name}
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
        );
      })}
    </Box>
  );
};

export default Tabs;
