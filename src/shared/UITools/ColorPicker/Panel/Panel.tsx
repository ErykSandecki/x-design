import { createPortal } from 'react-dom';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

// components
import Box from '../../../UI/Box/Box';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import ColorSampler from '../ColorSampler/ColorSampler';
import E2EDataAttribute from 'shared/E2EDataAttributes/E2EDataAttribute';
import Icon from '../../../UI/Icon/Icon';
import Tabs, { TTabsProps } from '../../Tabs/Tabs';

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
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { Tab } from './enums';

export type TPanelProps = {
  activeSampler: boolean;
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
  onClickColorSampler: TFunc<[string]>;
  onClickSampler: TFunc;
  setVisible: TFunc<[boolean]>;
};

export const Panel: FC<TPanelProps> = ({
  activeSampler,
  children,
  e2eValue,
  onClickColorSampler,
  onClickSampler,
  setVisible,
}) => {
  const [activeTab, setActiveTab] = useState(Tab.custom);
  const [sampleContainer, setSampleContainer] = useState<HTMLDivElement>(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const mousePosition = useRef(BASE_2D);
  const onClickHandler = useClickEvent(mousePosition, onClickSampler);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* istanbul ignore next */
    if (ref.current) {
      const pickerContainer = ref.current.getElementsByClassName(antColorPickerSliderContainerClassName);

      setSampleContainer(pickerContainer[0] as HTMLDivElement);
    }
  }, []);

  return (
    <E2EDataAttribute type={E2EAttribute.colorPickerPanel} value={e2eValue}>
      <Box
        classes={{ className: cx(classNamesWithTheme[className]) }}
        onKeyDown={(event) => event.stopPropagation()}
        ref={ref}
      >
        <Box
          classes={{ className: cx(classNamesWithTheme.header) }}
          sx={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', p: 8 }}
        >
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab as TTabsProps['setActiveTab']} tabs={TABS} />
          <Icon clickable height={11} name="Close" onClick={() => setVisible(false)} width={11} />
        </Box>
        {children}
        {sampleContainer &&
          createPortal(
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <ButtonIcon e2eValue="sampler" name="Sample" onClick={onClickHandler} selected={activeSampler} />
              {activeSampler && (
                <ColorSampler initialMousePosition={mousePosition.current} onClickColorSampler={onClickColorSampler} />
              )}
            </Box>,
            sampleContainer,
          )}
      </Box>
    </E2EDataAttribute>
  );
};

export default Panel;
