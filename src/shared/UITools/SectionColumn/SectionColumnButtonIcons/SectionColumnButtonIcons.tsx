import { FC, ReactNode } from 'react';

// components
import Box from '../../../UI/Box/Box';

export type TSectionColumnButtonIconsProps = {
  buttonsIcon?: Array<ReactNode>;
};

export const SectionColumnButtonIcons: FC<TSectionColumnButtonIconsProps> = ({ buttonsIcon = [] }) => (
  <Box sx={{ alignItems: 'center', columnGap: '8px', display: 'flex' }}>
    <Box sx={{ alignItems: 'center', columnGap: '2.5px', display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
      {buttonsIcon.map((buttonIcon) => buttonIcon)}
    </Box>
  </Box>
);

export default SectionColumnButtonIcons;
