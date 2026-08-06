import cx from 'classnames';
import { ReactNode } from 'react';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import ToggleButton from './ToggleButton/ToggleButton';

// hooks
import { useToggleButtonGroupEvents } from './hooks/useToggleButtonGroupEvents';

// others

// styles
import styles from './toggle-button-group.module.scss';

// types
import { E2EAttribute } from 'types';
import { TToggleButton, TToggleButtonGroupValue } from './types';

export type TToggleButtonGroupProps<V> = {
  alwaysSelected?: boolean;
  className?: string;
  defaultValue?: V;
  disabledWhenSelected?: boolean;
  e2eValue: TE2EDataAttributeProps['value'];
  fullWidth?: boolean;
  multiple?: boolean;
  onChange?: TFunc<[V]>;
  toggleButtons: Array<TToggleButton<V>>;
};

export const ToggleButtonGroup = <V extends TToggleButtonGroupValue>({
  alwaysSelected = false,
  className = '',
  defaultValue = null,
  disabledWhenSelected = false,
  e2eValue,
  fullWidth,
  multiple = false,
  onChange = null,
  toggleButtons,
  ...buttonProps
}: TToggleButtonGroupProps<V>): ReactNode => {
  const { onChange: onChangeHandler, value } = useToggleButtonGroupEvents(
    alwaysSelected,
    defaultValue,
    multiple,
    onChange,
  );

  return (
    <E2EDataAttribute type={E2EAttribute.toggleButtonGroup} value={e2eValue}>
      <div
        className={cx(className, styles.ToggleButtonGroup, {
          [styles['ToggleButtonGroup--full-width']]: fullWidth,
        })}
      >
        {toggleButtons.map(({ icon, tooltip, value: valueButtton }, index) => (
          <ToggleButton<V>
            {...buttonProps}
            currentValue={value}
            disabledWhenSelected={disabledWhenSelected}
            e2eValue={index}
            icon={icon}
            key={valueButtton}
            onChange={onChangeHandler}
            tooltip={tooltip}
            value={valueButtton}
          />
        ))}
      </div>
    </E2EDataAttribute>
  );
};

export default ToggleButtonGroup;
