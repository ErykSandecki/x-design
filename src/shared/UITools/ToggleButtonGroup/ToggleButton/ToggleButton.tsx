import cx from 'classnames';
import { ReactNode } from 'react';

// components
import Icon, { TIconProps } from '../../../UI/Icon/Icon';
import Tooltip, { TTooltipProps } from '../../../UI/Tooltip/Tooltip';

// others

// styles
import styles from './toggle-button.module.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { TToggleButtonGroupValue } from '../types';

// utils
import { isSelected } from './utils/isSelected';

export type TToggleButtonProps<V> = {
  currentValue: V;
  disabledWhenSelected: boolean;
  e2eAttribute?: TE2EDataAttributeProps['type'];
  e2eValue?: TE2EDataAttributeProps['value'];
  icon: TIconProps['name'];
  onChange: TFunc<[string]>;
  tooltip?: Omit<TTooltipProps, 'children'>;
  value: string;
};

const ToggleButton = <V extends TToggleButtonGroupValue>({
  currentValue,
  disabledWhenSelected,
  e2eAttribute = E2EAttribute.toggleButton,
  e2eValue,
  icon,
  onChange,
  tooltip,
  value,
}: TToggleButtonProps<V>): ReactNode => {
  const selected = isSelected<V>(currentValue, value);
  const canTriggerChange = !disabledWhenSelected || !selected;

  return (
    <Tooltip e2eAttribute={e2eAttribute} e2eValue={e2eValue} {...tooltip}>
      <button
        className={cx(styles.ToggleButton, {
          [styles['ToggleButton--selected']]: selected,
        })}
        onClick={() => canTriggerChange && onChange(value)}
        type="button"
      >
        <Icon height={12} name={icon} width={12} />
      </button>
    </Tooltip>
  );
};

export default ToggleButton;
