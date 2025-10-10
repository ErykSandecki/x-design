import { FC } from 'react';

// components
import Box from '../../../../UI/Box/Box';

export type TPopoverSeparatorProps = {
  visible?: boolean;
};

export const PopoverSeparator: FC<TPopoverSeparatorProps> = ({ visible = true }) =>
  visible ? <Box sx={{ bg: 'neutral3', height: '1px', my: 8 }} /> : null;

export default PopoverSeparator;
