import cx from 'classnames';
import { FC, MouseEvent, ReactNode, useRef } from 'react';

// components
import E2EDataAttribute from '../../../E2EDataAttributes/E2EDataAttribute';
import Icon from '../../../UI/Icon/Icon';

// styles
import styles from './select-item.module.scss';

// types
import { E2EAttribute } from 'types';

export type TSelectItemProps = {
  children: ReactNode;
  disabled?: boolean;
  onMouseEnter?: TFunc<[MouseEvent]>;
  onMouseLeave?: TFunc<[MouseEvent]>;
  selectedValue?: string | Array<string>;
  value: string;
};

export const SelectItem: FC<TSelectItemProps> = ({
  children,
  disabled = false,
  onMouseEnter,
  onMouseLeave,
  selectedValue,
  value,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const isSelected = selectedValue === value;

  return (
    <E2EDataAttribute type={E2EAttribute.selectItem} value={value}>
      <li
        className={cx(styles.SelectItem, {
          [styles['SelectItem--disabled']]: disabled,
          [styles['SelectItem--selected']]: isSelected,
        })}
        data-value={value}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
        role="option"
        tabIndex={0}
      >
        <Icon
          classes={{
            className: cx(styles['SelectItem__check-icon'], {
              [styles['SelectItem__check-icon--selected']]: isSelected,
            }),
          }}
          height={12}
          name="Check"
          width={12}
        />
        {children}
      </li>
    </E2EDataAttribute>
  );
};

export default SelectItem;
