import { FC, HTMLAttributes, useRef } from 'react';
import { noop } from 'lodash';

// components
import Box from '../../../../UI/Box/Box';
import Icon from '../../../../UI/Icon/Icon';
import Popover, { PopoverCompound, TPopoverProps } from '../../../Popover/Popover';

// hooks
import { useOutsideClick, useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './text-field-popover.scss';

export type TTextFieldPopoverProps = {
  children: TPopoverProps['children'];
  classNameIcon: string;
  idContainer: HTMLAttributes<any>['id'];
};

export const TextFieldPopover: FC<TTextFieldPopoverProps> = ({ children, classNameIcon, idContainer }) => {
  const ref = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { selected, setSelected } = useOutsideClick([], ref, noop, idContainer);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      ref={ref}
      sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', position: 'relative' }}
    >
      <Icon
        classes={{ className: cx(classNamesWithTheme.icon, classNameIcon) }}
        clickable
        height={12}
        name="Variant"
        onClick={() => setSelected(!selected)}
        width={12}
      />
      <Popover e2eValue="popover" refItem={ref} selected={selected}>
        <PopoverCompound.PopoverRoot setSelected={setSelected}>{children}</PopoverCompound.PopoverRoot>
      </Popover>
    </Box>
  );
};

export default TextFieldPopover;
