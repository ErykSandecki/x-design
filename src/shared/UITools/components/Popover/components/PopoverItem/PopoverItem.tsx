import { FC } from 'react';

// components
import E2EDataAttribute from '../../../../../E2EDataAttributes/E2EDataAttribute';
import { Icon, Small } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './popover-item.scss';

// types
import { E2EAttribute } from 'types';

// utils
import { TPopoverData } from '../../types';

export type TPopoverItemProps = TPopoverData & {
  index: number;
  setSelected: TFuncion<[boolean]>;
};

export const PopoverItem: FC<TPopoverItemProps> = ({
  icon,
  index,
  onClick,
  selected,
  setSelected,
  text,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const onClickHandler = (): void => {
    onClick?.();
    setSelected(false);
  };

  return (
    <E2EDataAttribute type={E2EAttribute.popoverItem} value={index}>
      <div
        className={cx(classNamesWithTheme[className])}
        onClick={onClickHandler}
      >
        <Icon
          classes={{
            className: cx(classNamesWithTheme.checkIcon.name, [
              classNamesWithTheme.checkIcon.modificators.selected,
              selected,
            ]),
          }}
          height={12}
          name="Check"
          width={12}
        />
        {icon && (
          <Icon
            classes={{ className: cx(classNamesWithTheme.icon) }}
            height={12}
            name={icon}
            width={12}
          />
        )}
        <Small classes={{ className: cx(classNamesWithTheme.text) }}>
          {text}
        </Small>
      </div>
    </E2EDataAttribute>
  );
};

export default PopoverItem;
