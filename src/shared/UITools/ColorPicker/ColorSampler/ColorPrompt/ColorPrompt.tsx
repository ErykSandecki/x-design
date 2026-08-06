import cx from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Icon from '../../../../UI/Icon/Icon';
import { Small } from '../../../../UI/Typography';

// others
import { translationNameSpace } from './constants';

// styles
import styles from './color-prompt.module.scss';

// types
import { ColorsTheme } from 'types';

export const ColorPrompt: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={cx(styles.ColorPrompt)}>
      <Icon height={12} name="EyesDropper" width={12} />
      <Small classes={{ className: cx(styles.ColorPrompt__description) }} color={ColorsTheme.neutral2}>
        {t(`${translationNameSpace}.description`)}
      </Small>
    </div>
  );
};

export default ColorPrompt;
