import { ReactNode } from 'react';

// components
import E2EDataAttribute, {
  TE2EDataAttributeProps,
} from '../../../../../E2EDataAttributes/E2EDataAttribute';
import Icon, { TIconProps } from 'shared/UI/components/Icon/Icon';

// hooks
import { useTheme } from 'hooks';

// others
import { className as classNameToggleButton, classNames } from './classNames';

// styles
import styles from './toggle-button.scss';

// types
import { E2EAttribute } from 'types';
import { TToggleButtonGroupValue } from '../../types';

// utils
import { isSelected } from './utils/isSelected';

export type TToggleButtonProps<V> = {
  currentValue: V;
  e2eAttribute?: TE2EDataAttributeProps['type'];
  e2eValue?: TE2EDataAttributeProps['value'];
  icon: TIconProps['name'];
  onChange: (value: string) => void;
  value: string;
};

const ToggleButton = <V extends TToggleButtonGroupValue>({
  currentValue,
  e2eAttribute = E2EAttribute.toggleButton,
  e2eValue,
  icon,
  onChange,
  value,
}: TToggleButtonProps<V>): ReactNode => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const selected = isSelected<V>(currentValue, value);

  return (
    <E2EDataAttribute type={e2eAttribute} value={e2eValue}>
      <button
        className={cx(classNamesWithTheme[classNameToggleButton].name, [
          classNamesWithTheme[classNameToggleButton].modificators.selected,
          selected,
        ])}
        onClick={() => onChange(value)}
        type="button"
      >
        <Icon height={12} name={icon} width={12} />
      </button>
    </E2EDataAttribute>
  );
};

export default ToggleButton;
