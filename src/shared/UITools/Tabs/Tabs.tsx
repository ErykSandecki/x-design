import cx from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

// styles
import styles from './tabs.scss';

// types
import { E2EAttribute } from 'types';
import { TTab } from './types';

// utils
import { mapAttributes } from 'utils';

export type TTabsProps = {
  activeTab: TTab['name'];
  e2eValue?: TE2EDataAttributeProps['value'];
  setActiveTab: TFunc<[TTab['name']]>;
  tabs: Array<TTab>;
};

export const Tabs: FC<TTabsProps> = ({ activeTab, setActiveTab, e2eValue, tabs }) => {
  const disabledStates = tabs.length < 2;
  const { t } = useTranslation();

  return (
    <E2EDataAttribute type={E2EAttribute.tabs} value={e2eValue}>
      <div className={cx(styles.Tabs)}>
        {tabs.map(({ labelTranslationKey, name }) => {
          const isActive = activeTab === name;

          return (
            <E2EDataAttribute key={name} type={E2EAttribute.tab} value={name}>
              <div
                className={cx(styles.Tabs__tab, {
                  [styles['Tabs__tab--active']]: isActive,
                  [styles['Tabs__tab--disabled']]: disabledStates,
                })}
                onClick={() => setActiveTab(name)}
                {...mapAttributes({ [E2EAttribute.active]: isActive })}
              >
                {t(labelTranslationKey)}
              </div>
            </E2EDataAttribute>
          );
        })}
      </div>
    </E2EDataAttribute>
  );
};

export default Tabs;
