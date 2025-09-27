import { createPortal } from 'react-dom';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

// components
import ButtonIcon from '../../../ButtonIcon/ButtonIcon';
import ColorSampler from '../ColorSampler/ColorSampler';
import E2EDataAttribute from 'shared/E2EDataAttributes/E2EDataAttribute';
import Icon from '../../../../../UI/components/Icon/Icon';
import Tabs, { TTabsProps } from '../../../Tabs/Tabs';

// hooks
import { useClickEvent } from './hooks/useClickEvent';
import { useTheme } from 'hooks';

// others
import { antColorPickerSliderContainerClassName, TABS } from './constants';
import { BASE_2D } from 'shared/ZoomBox/constants';
import { className, classNames } from './classNames';

// styles
import styles from './panel.scss';

// types
import { E2EAttribute } from 'types';
import { Tab } from './enums';

export type TPanelProps = {
  activeSampler: boolean;
  children: ReactNode;
  onClickColorSampler: (color: string) => void;
  onClickSampler: () => void;
  setVisible: (vissible: boolean) => void;
};

export const Panel: FC<TPanelProps> = ({
  activeSampler,
  children,
  onClickColorSampler,
  onClickSampler,
  setVisible,
}) => {
  const mousePosition = useRef(BASE_2D);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const [activeTab, setActiveTab] = useState(Tab.custom);
  const [sampleContainer, setSampleContainer] = useState<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const onClick = useClickEvent(mousePosition, onClickSampler);

  useEffect(() => {
    /* istanbul ignore next */
    if (ref.current) {
      const pickerContainer = ref.current.getElementsByClassName(antColorPickerSliderContainerClassName);

      setSampleContainer(pickerContainer[0] as HTMLDivElement);
    }
  }, []);

  return (
    <E2EDataAttribute type={E2EAttribute.colorPickerPanel}>
      <div className={cx(classNamesWithTheme[className])} onKeyDown={(event) => event.stopPropagation()} ref={ref}>
        <div className={cx(classNamesWithTheme.header)}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab as TTabsProps['setActiveTab']} tabs={TABS} />
          <Icon clickable height={11} name="Close" onClick={() => setVisible(false)} width={11} />
        </div>
        {children}
        {sampleContainer &&
          createPortal(
            <div className={cx(classNamesWithTheme.sample)}>
              <ButtonIcon e2eValue="sampler" name="Sample" onClick={onClick} selected={activeSampler} />
              {activeSampler && (
                <ColorSampler initialMousePosition={mousePosition.current} onClickColorSampler={onClickColorSampler} />
              )}
            </div>,
            sampleContainer,
          )}
      </div>
    </E2EDataAttribute>
  );
};

export default Panel;
