import { FC, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { Box, Small } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { translationNameSpace } from './contants';

// store
import { elementDynamicDataSelectorCreator } from 'store/pageBuilder/selectors';

// styles
import styles from './frame.scss';

export type TFrameProps = {
  id: string;
};

const Frame: FC<TFrameProps> = ({ id }) => {
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const [position, setPosition] = useState(elementDynamicData.positionAbsolute);
  const { height, width } = elementDynamicData;
  const { x, y } = position;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className]),
      }}
      style={{
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
      }}
    >
      <Small classes={{ className: cx(classNamesWithTheme.label) }}>
        {t(`${translationNameSpace}.label.createFrame`)}
      </Small>
    </Box>
  );
};

export default memo(Frame);
