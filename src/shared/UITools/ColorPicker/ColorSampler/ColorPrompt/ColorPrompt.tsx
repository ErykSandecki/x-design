import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Box from '../../../../UI/Box/Box';
import Icon from '../../../../UI/Icon/Icon';
import { Small } from '../../../../UI/Typography';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { translationNameSpace } from './constants';

// styles
import styles from './color-prompt.scss';

export const ColorPrompt: FC = () => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      sx={{ alignItems: 'center', columnGap: '8px', display: 'flex', ml: 12 }}
    >
      <Icon height={12} name="EyesDropper" width={12} />
      <Small classes={{ className: cx(classNamesWithTheme.description) }} sx={{ cl: 'neutral2' }}>
        {t(`${translationNameSpace}.description`)}
      </Small>
    </Box>
  );
};

export default ColorPrompt;
