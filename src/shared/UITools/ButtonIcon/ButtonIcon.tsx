import { FC, useRef } from 'react';
import { noop } from 'lodash';

// components
import Box, { TBoxProps } from '../../UI/Box/Box';
import ButtonIconPopover from './ButtonIconPopover/ButtonIconPopover';
import Icon, { TIconProps } from '../../UI/Icon/Icon';
import Tooltip, { TTooltipProps } from '../../UI/Tooltip/Tooltip';

// hooks
import { useClickEvent } from './hooks/useClickEvent';
import { useOutsideClick, useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './button-icon.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TPopoverProps } from '../Popover/Popover';

export type TSectionProps = Pick<TIconProps, 'name'> &
  TBoxProps & {
    e2eValue?: TE2EDataAttributeProps['value'];
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
  e2eValue = '',
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
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { selected, setSelected } = useOutsideClick([], ref, popoverOnClose, idContainer);
  const isSelected = selected || selectedButtonIcon;
  const onClickHandler = useClickEvent(onClick, selected, setSelected);

  return (
    <Tooltip ref={ref} {...tooltip}>
      <Box
        classes={{
          className: cx(classNamesWithTheme[className].name, [
            classNamesWithTheme[className].modificators.selected,
            isSelected,
          ]),
        }}
        e2eAttribute={E2EAttribute.buttonIcon}
        e2eValue={e2eValue}
        onClick={onClickHandler}
        {...restProps}
      >
        <Icon
          color={selectedButtonIcon ? ColorsTheme.blue1 : ColorsTheme.neutral1}
          height={14}
          name={name}
          width={14}
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
      </Box>
    </Tooltip>
  );
};

export default ButtonIcon;
