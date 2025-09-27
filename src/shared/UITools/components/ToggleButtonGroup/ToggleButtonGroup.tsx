import { ReactNode } from 'react';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import ToggleButton from './components/ToggleButton/ToggleButton';

// hooks
import { useTheme } from '../../../../hooks/useTheme/useTheme';
import { useToggleButtonGroupEvents } from './hooks/useToggleButtonGroupEvents';

// others
import { className as classNameToggleButton, classNames } from './classNames';

// styles
import styles from './toggle-button-group.scss';

// types
import { E2EAttribute } from 'types';
import { TToggleButton, TToggleButtonGroupValue } from './types';

export type TToggleButtonGroupProps<V> = {
  alwaysSelected?: boolean;
  className?: string;
  defaultValue?: V;
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
  e2eValue,
  fullWidth,
  multiple = false,
  onChange = null,
  toggleButtons,
  ...buttonProps
}: TToggleButtonGroupProps<V>): ReactNode => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { onChange: onChangeHandler, value } = useToggleButtonGroupEvents(
    alwaysSelected,
    defaultValue,
    multiple,
    onChange,
  );

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
