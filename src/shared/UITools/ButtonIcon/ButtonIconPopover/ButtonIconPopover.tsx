import { FC, RefObject } from 'react';

// components
import Box from '../../../UI/Box/Box';
import Popover, { PopoverCompound, TPopoverProps } from '../../Popover/Popover';

// utils
import { stopPropagation } from 'utils';

export type TButtonIconPopoverProps = Pick<TPopoverProps, 'children' | 'offset'> & {
  ref: RefObject<HTMLDivElement>;
  selected: boolean;
  setSelected: TFunc<[boolean]>;
};

export const ButtonIconPopover: FC<TButtonIconPopoverProps> = ({ children, offset, ref, selected, setSelected }) => (
  <Box
    onMouseOver={stopPropagation}
    sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', position: 'relative' }}
  >
    <Popover backgroundColor="neutral5" e2eValue="popover" offset={offset} refItem={ref} selected={selected}>
      <PopoverCompound.PopoverRoot setSelected={setSelected}>{children}</PopoverCompound.PopoverRoot>
    </Popover>
  </Box>
);

export default ButtonIconPopover;
