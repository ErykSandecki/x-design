import { FC, RefObject } from 'react';

// components
import Box from '../../../UI/Box/Box';
import Popover, { PopoverCompound, TPopoverProps } from '../../Popover/Popover';

// utils
import { stopPropagation } from 'utils';

export type TButtonIconPopoverProps = Pick<TPopoverProps, 'children' | 'id' | 'offset' | 'style'> & {
  ref: RefObject<HTMLDivElement>;
  selected: boolean;
  setSelected: TFunc<[boolean]>;
};

export const ButtonIconPopover: FC<TButtonIconPopoverProps> = ({
  children,
  id,
  offset,
  ref,
  selected,
  setSelected,
  style,
}) => (
  <Box
    onMouseOver={stopPropagation}
    sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', position: 'relative' }}
  >
    <Popover
      backgroundColor="neutral5"
      e2eValue="popover"
      id={id}
      offset={offset}
      refItem={ref}
      selected={selected}
      style={style}
    >
      <PopoverCompound.PopoverRoot selected={selected} setSelected={setSelected}>
        {children}
      </PopoverCompound.PopoverRoot>
    </Popover>
  </Box>
);

export default ButtonIconPopover;
