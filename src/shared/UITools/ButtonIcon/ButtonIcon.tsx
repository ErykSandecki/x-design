import cx from 'classnames';
import { FC, HTMLAttributes, useRef } from 'react';
import { noop } from 'lodash';

// components
import ButtonIconPopover from './ButtonIconPopover/ButtonIconPopover';
import Icon, { TIconProps } from '../../UI/Icon/Icon';
import Tooltip, { TTooltipProps } from '../../UI/Tooltip/Tooltip';

// hooks
import { useClickEvent } from './hooks/useClickEvent';
import { useOutsideClick } from 'hooks';

// others
import { getAttributes } from '../../E2EDataAttributes/utils';

// styles
import styles from './button-icon.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TPopoverProps } from '../Popover/Popover';

export type TSectionProps = Pick<TIconProps, 'name'> &
  Omit<HTMLAttributes<HTMLElement>, 'className'> & {
    disabledSelection?: boolean;
    e2eValue?: TE2EDataAttributeProps['value'];
    iconSize?: number;
    idContainer?: string;
    popoverAlignHorizontally?: TPopoverProps['alignHorizontally'];
    popoverAlignVertically?: TPopoverProps['alignVertically'];
    popoverChildren?: TPopoverProps['children'];
    popoverId?: TPopoverProps['id'];
    popoverOffset?: TPopoverProps['offset'];
    popoverOnClose?: TFunc;
    popoverStyle?: TPopoverProps['style'];
    selected?: boolean;
    tooltip?: Omit<TTooltipProps, 'children'>;
  };

export const ButtonIcon: FC<TSectionProps> = ({
  disabledSelection = false,
  e2eValue = '',
  iconSize = 12,
  idContainer,
  name,
  onClick,
  popoverAlignHorizontally,
  popoverAlignVertically,
  popoverChildren,
  popoverId,
  popoverOnClose = noop,
  popoverOffset,
  popoverStyle,
  selected: selectedButtonIcon = false,
  tooltip,
  ...restProps
}) => {
  const ref = useRef(null);
  const { selected, setSelected } = useOutsideClick([], ref, popoverOnClose, idContainer);
  const isSelected = selected || selectedButtonIcon;
  const onClickHandler = useClickEvent(disabledSelection, onClick, selected, setSelected);

  return (
    <Tooltip ref={ref} {...tooltip}>
      <div
        className={cx(styles.ButtonIcon, {
          [styles['ButtonIcon--selected']]: isSelected,
        })}
        onClick={onClickHandler}
        {...getAttributes(E2EAttribute.buttonIcon, e2eValue)}
        {...restProps}
      >
        <Icon
          color={selectedButtonIcon ? ColorsTheme.blue1 : ColorsTheme.neutral1}
          height={iconSize}
          name={name}
          width={iconSize}
        />
        {popoverChildren && (
          <ButtonIconPopover
            alignHorizontally={popoverAlignHorizontally}
            alignVertically={popoverAlignVertically}
            id={popoverId}
            ref={ref}
            selected={selected}
            setSelected={setSelected}
            offset={popoverOffset}
            style={popoverStyle}
          >
            {popoverChildren}
          </ButtonIconPopover>
        )}
      </div>
    </Tooltip>
  );
};

export default ButtonIcon;
