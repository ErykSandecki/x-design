import { FC, RefObject } from 'react';

// components
import Box from '../../../UI/Box/Box';
import Popover, { PopoverCompound, TPopoverProps } from '../../Popover/Popover';

export type TButtonIconPopoverProps = Pick<TPopoverProps, 'children' | 'offset'> & {
  ref: RefObject<HTMLDivElement>;
  selected: boolean;
  setSelected: TFunc<[boolean]>;
};

export const ButtonIconPopover: FC<TButtonIconPopoverProps> = ({ children, offset, ref, selected, setSelected }) => (
  <Box ref={ref} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', position: 'relative' }}>
    <Popover backgroundColor="neutral5" e2eValue="popover" offset={offset} refItem={ref} selected={selected}>
      <PopoverCompound.PopoverRoot setSelected={setSelected}>{children}</PopoverCompound.PopoverRoot>
    </Popover>
  </Box>
);

export default ButtonIconPopover;
