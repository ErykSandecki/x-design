import { createPortal } from 'react-dom';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

// components
import ButtonIcon from '../../../ButtonIcon/ButtonIcon';
import Icon from '../../../../../UI/components/Icon/Icon';
import Tabs, { TTabsProps } from '../../../Tabs/Tabs';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { TABS } from './constants';

// styles
import styles from './panel.scss';

// types
import { Tab } from './enums';

export type TPanelProps = {
  children: ReactNode;
  setVisible: (vissible: boolean) => void;
};

export const Panel: FC<TPanelProps> = ({ children, setVisible }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const [activeTab, setActiveTab] = useState(Tab.custom);
  const [aaa, setaa] = useState(false);
  const [sampleContainer, setSampleContainer] = useState<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const pickerContainer = ref.current.getElementsByClassName(
        'ant-color-picker-slider-container',
      );

      setSampleContainer(pickerContainer[0] as HTMLDivElement);
    }
  }, []);

  return (
    <div
      className={cx(classNamesWithTheme[className])}
      onKeyDown={() => event.stopPropagation()}
      ref={ref}
    >
      <div className={cx(classNamesWithTheme.header)}>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab as TTabsProps['setActiveTab']}
          tabs={TABS}
        />
        <Icon
          clickable
          height={11}
          name="Close"
          onClick={() => setVisible(false)}
          width={11}
        />
      </div>
      {children}
      {sampleContainer &&
        createPortal(
          <div className={cx(classNamesWithTheme.sample)}>
            <ButtonIcon
              name="Sample"
              selected={aaa}
              onClick={() => setaa(!aaa)}
            />
          </div>,
          sampleContainer,
        )}
    </div>
  );
};

export default Panel;
