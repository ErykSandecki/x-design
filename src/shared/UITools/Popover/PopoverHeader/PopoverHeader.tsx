import { FC } from 'react';

// components
import Box from '../../../UI/Box/Box';
import Icon from '../../../UI/Icon/Icon';
import { Small } from '../../../UI/Typography';

// core
import { usePopoverRoot } from '../PopoverRoot/core/PopoverRootProvider';

// types
import { E2EAttribute } from 'types';

export type TPopoverHeaderProps = {
  title: string;
};

export const PopoverHeader: FC<TPopoverHeaderProps> = ({ title }) => {
  const { setSelected } = usePopoverRoot();

  return (
    <Box
      e2eAttribute={E2EAttribute.popoverHeader}
      sx={{
        alignItems: 'center',
        columnGap: '25px',
        display: 'flex',
        height: '40px',
        justifyContent: 'space-between',
      }}
    >
      <Small style={{ fontSize: '11px' }}>{title}</Small>
      <Icon clickable name="Close" height={10} onClick={() => setSelected(false)} width={10} />
    </Box>
  );
};

export default PopoverHeader;
