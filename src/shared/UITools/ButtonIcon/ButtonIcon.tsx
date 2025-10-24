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
    popoverChildren?: TPopoverProps['children'];
    popoverOffset?: TPopoverProps['offset'];
    selected?: boolean;
    tooltip?: Omit<TTooltipProps, 'children'>;
  };

export const ButtonIcon: FC<TSectionProps> = ({
  e2eValue = '',
  idContainer,
  name,
  onClick,
  popoverChildren,
  popoverOffset,
  selected = false,
  tooltip,
  ...restProps
}) => {
  const ref = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { selected: selectedPopover, setSelected: setSelectedPopover } = useOutsideClick([ref], ref, noop, idContainer);
  const isSelected = selectedPopover || selected;
  const onClickHandler = useClickEvent(onClick, selectedPopover, setSelectedPopover);

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
        <Icon color={selected ? ColorsTheme.blue1 : ColorsTheme.neutral1} height={14} name={name} width={14} />
        {popoverChildren && (
          <ButtonIconPopover
            ref={ref}
            selected={selectedPopover}
            setSelected={setSelectedPopover}
            offset={popoverOffset}
          >
            {popoverChildren}
          </ButtonIconPopover>
        )}
      </Box>
    </Tooltip>
  );
};

export default ButtonIcon;
