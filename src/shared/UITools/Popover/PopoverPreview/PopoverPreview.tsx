import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Box from '../../../UI/Box/Box';
import { P } from '../../../UI/Typography';

// core
import { usePopoverRoot } from '../PopoverRoot/core/PopoverRootProvider';

// others
import { translationNameSpace } from '../constants';

// types
import { E2EAttribute } from 'types';

export const PopoverPreview: FC = () => {
  const { t } = useTranslation();
  const { previewId } = usePopoverRoot();

  return (
    <Box
      e2eAttribute={E2EAttribute.popoverHeader}
      sx={{
        alignItems: 'center',
        bg: 'neutral4',
        borderBottom: 1,
        borderColor: 'neutral3',
        borderTop: 1,
        display: 'flex',
        height: '120px',
        justifyContent: 'center',
        mb: 8,
        ml: -10,
        width: 'calc(100% + 20px)',
      }}
    >
      {!previewId && <P style={{ opacity: 0.5 }}>{t(`${translationNameSpace}.preview`)}</P>}
    </Box>
  );
};

export default PopoverPreview;
