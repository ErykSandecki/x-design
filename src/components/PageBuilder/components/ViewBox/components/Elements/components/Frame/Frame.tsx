import { FC, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { Box, Small } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className as classNameFrame, classNames } from './classNames';
import { translationNameSpace } from './contants';

// store
import { elementDynamicDataSelectorCreator } from 'store/pageBuilder/selectors';

// styles
import styles from './frame.scss';

// types
import { TElementProps } from '../../types';

export type TFrameProps = TElementProps & {
  id: string;
};

const Frame: FC<TFrameProps> = ({ className, id }) => {
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const [position, setPosition] = useState(elementDynamicData.positionAbsolute);
  const { height, width } = elementDynamicData;
  const { x, y } = position;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Box
      classes={{
        className: cx(className, classNamesWithTheme[classNameFrame]),
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
