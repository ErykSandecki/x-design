import cx from 'classnames';
import { FC } from 'react';

// components
import E2EDataAttribute from '../../../E2EDataAttributes/E2EDataAttribute';
import { Icon, Small, TIconProps } from 'shared';

// core
import { usePopoverRoot } from '../PopoverRoot/core/PopoverRootProvider';

// hooks
import { useClickEvent } from './hooks/useClickEvent';

// others

// styles
import styles from './popover-item.scss';

// types
import { E2EAttribute } from 'types';

export type TPopoverItemProps = {
  icon?: TIconProps['name'];
  iconSize?: number;
  index: number | string;
  onClick?: TFunc;
  onMouseEnter?: TFunc;
  selected?: boolean;
  text: string;
  visible?: boolean;
};

export const PopoverItem: FC<TPopoverItemProps> = ({
  icon,
  iconSize = 12,
  index,
  onClick,
  onMouseEnter,
  selected,
  text,
  visible = true,
}) => {
  const { setSelected } = usePopoverRoot();
  const onClickHandler = useClickEvent(onClick, setSelected);

  if (!visible) {
    return null;
  }

  return (
    <E2EDataAttribute type={E2EAttribute.popoverItem} value={index}>
      <div className={cx(styles.PopoverItem)} onClick={onClickHandler} onMouseEnter={onMouseEnter}>
        <Icon
          classes={{
            className: cx(styles['PopoverItem__check-icon'], {
              [styles['PopoverItem__check-icon--selected']]: selected,
            }),
          }}
          height={12}
          name="Check"
          width={12}
        />
        {icon && (
          <Icon classes={{ className: cx(styles.PopoverItem__icon) }} height={iconSize} name={icon} width={iconSize} />
        )}
        <Small classes={{ className: cx(styles.PopoverItem__text) }}>{text}</Small>
      </div>
    </E2EDataAttribute>
  );
};

export default PopoverItem;
