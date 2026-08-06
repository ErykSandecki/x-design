import cx from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import Icon from '../../UI/Icon/Icon';
import { Small } from 'shared/UI/Typography';

// styles
import styles from './checkbox.scss';

// types
import { E2EAttribute } from 'types';

// utils
import { getAttributes } from '../../E2EDataAttributes/utils';

export type TCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'color' | 'popover' | 'value'
> & {
  className?: string;
  e2eValue?: TE2EDataAttributeProps['value'];
  isMixed?: boolean;
  label: string;
  onChange: TFunc<[boolean]>;
  value: boolean;
};

export const Checkbox: FC<TCheckboxProps> = ({
  className,
  e2eValue = '',
  isMixed = false,
  label,
  onChange,
  value,
  ...restProps
}) => {
  return (
    <E2EDataAttribute type={E2EAttribute.checkbox} value={e2eValue}>
      <div className={cx(styles.Checkbox, className)}>
        <input
          className={cx(styles.Checkbox__input)}
          onClick={() => onChange(!value)}
          type="checkbox"
          {...getAttributes(E2EAttribute.checkboxInput, e2eValue)}
          {...restProps}
        />
        <div className={cx(styles['Checkbox__input-wrapper'])}>
          {value && !isMixed && <Icon name="Checkbox" height={8} width={8} />}
          {isMixed && <Icon name="CheckboxMixed" height={8} width={8} />}
        </div>
        <Small classes={{ className: cx(styles.Checkbox__label) }}>{label}</Small>
      </div>
    </E2EDataAttribute>
  );
};

export default Checkbox;
