import { ReactNode, useEffect, useState } from 'react';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import ToggleButton from './components/ToggleButton/ToggleButton';

// hooks
import { useEvents } from './hooks/useEvents';
import { useTheme } from '../../../../hooks/useTheme/useTheme';

// others
import { className as classNameToggleButton, classNames } from './classNames';

// styles
import styles from './toggle-button-group.scss';

// types
import { E2EAttribute } from 'types';
import { TToggleButton, TToggleButtonGroupValue } from './types';

// utils
import { getInitialValue } from './utils/getInitialValue';

export type TToggleButtonGroupProps<V> = {
  alwaysSelected?: boolean;
  className?: string;
  defaultValue?: V;
  e2eValue: TE2EDataAttributeProps['value'];
  fullWidth?: boolean;
  multiple?: boolean;
  onChange?: (value: V) => void;
  toggleButtons: Array<TToggleButton<V>>;
};

export const ToggleButtonGroup = <V extends TToggleButtonGroupValue>({
  alwaysSelected = false,
  className = '',
  defaultValue = null,
  e2eValue,
  fullWidth,
  multiple = false,
  onChange = null,
  toggleButtons,
  ...buttonProps
}: TToggleButtonGroupProps<V>): ReactNode => {
  const [value, setValue] = useState(getInitialValue(multiple, defaultValue));
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const onChangeHandler = useEvents<V>(alwaysSelected, multiple, onChange, setValue, value);

  useEffect(() => {
    setValue(getInitialValue(multiple, defaultValue));
  }, [defaultValue]);

  return (
    <E2EDataAttribute type={E2EAttribute.toggleButtonGroup} value={e2eValue}>
      <div
        className={cx(className, classNamesWithTheme[classNameToggleButton].name, [
          classNamesWithTheme[classNameToggleButton].modificators.fullWidth,
          fullWidth,
        ])}
      >
        {toggleButtons.map(({ icon, value: valueButtton }, index) => (
          <ToggleButton<V>
            {...buttonProps}
            currentValue={value}
            e2eValue={index}
            icon={icon}
            key={valueButtton}
            onChange={onChangeHandler}
            value={valueButtton}
          />
        ))}
      </div>
    </E2EDataAttribute>
  );
};

export default ToggleButtonGroup;
