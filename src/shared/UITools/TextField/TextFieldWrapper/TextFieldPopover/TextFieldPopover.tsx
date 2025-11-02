import { FC, RefObject } from 'react';

// components
import Box from '../../../../UI/Box/Box';
import Icon from '../../../../UI/Icon/Icon';
import Popover, { PopoverCompound, TPopoverProps } from '../../../Popover/Popover';

// hooks
import { useClickEvent } from './hooks/useClickEvent';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './text-field-popover.scss';

export type TTextFieldPopoverProps = Pick<TPopoverProps, 'children' | 'offset' | 'style'> & {
  attachedValue: boolean;
  classNameIcon: string;
  onClick: TFunc;
  ref: RefObject<HTMLDivElement>;
  selected: boolean;
  setSelected: TFunc<[boolean]>;
};

export const TextFieldPopover: FC<TTextFieldPopoverProps> = ({
  attachedValue,
  children,
  classNameIcon,
  offset,
  onClick,
  ref,
  selected,
  setSelected,
  style,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const onClickDetachedValue = useClickEvent(onClick);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      ref={ref}
      sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', position: 'relative' }}
    >
      {!attachedValue && (
        <Icon
          classes={{ className: cx(classNamesWithTheme.icon, classNameIcon) }}
          clickable
          height={12}
          name="Variant"
          onClick={() => setSelected(!selected)}
          width={12}
        />
      )}
      {attachedValue && (
        <Icon
          classes={{ className: cx(classNamesWithTheme.icon, classNameIcon) }}
          clickable
          height={12}
          name="Detached"
          onClick={onClickDetachedValue}
          width={12}
        />
      )}
      <Popover e2eValue="popover" offset={offset} refItem={ref} selected={selected} style={style}>
        <PopoverCompound.PopoverRoot selected={selected} setSelected={setSelected}>
          {children}
        </PopoverCompound.PopoverRoot>
      </Popover>
    </Box>
  );
};

export default TextFieldPopover;
