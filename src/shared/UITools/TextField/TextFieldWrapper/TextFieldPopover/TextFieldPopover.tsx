import { FC, RefObject } from 'react';

// components
import Box from '../../../../UI/Box/Box';
import Icon from '../../../../UI/Icon/Icon';
import Popover, { PopoverCompound, TPopoverProps } from '../../../Popover/Popover';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './text-field-popover.scss';

export type TTextFieldPopoverProps = Pick<TPopoverProps, 'children' | 'offset' | 'style'> & {
  classNameIcon: string;
  ref: RefObject<HTMLDivElement>;
  selected: boolean;
  setSelected: TFunc<[boolean]>;
};

export const TextFieldPopover: FC<TTextFieldPopoverProps> = ({
  children,
  classNameIcon,
  offset,
  ref,
  selected,
  setSelected,
  style,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

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
      <Popover e2eValue="popover" offset={offset} refItem={ref} selected={selected} style={style}>
        <PopoverCompound.PopoverRoot selected={selected} setSelected={setSelected}>
          {children}
        </PopoverCompound.PopoverRoot>
      </Popover>
    </Box>
  );
};

export default TextFieldPopover;
