import { FC } from 'react';

// components

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './preview-box-sizing.scss';

// types
import { Box, TPreviewData } from 'shared';

export type TPreviewBoxSizingProps = Pick<TPreviewData, 'activeOption'>;

const PreviewBoxSizing: FC<TPreviewBoxSizingProps> = ({ activeOption }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, classNamesWithTheme[className].modificators[activeOption]),
      }}
    >
      <Box classes={{ className: cx(classNamesWithTheme.tileLeft) }}>
        <Box classes={{ className: cx(classNamesWithTheme.tileChildren) }} />
      </Box>
      <Box classes={{ className: cx(classNamesWithTheme.tileRight) }}>
        <Box classes={{ className: cx(classNamesWithTheme.tileChildren) }} />
      </Box>
      <Box
        classes={{
          className: cx(classNamesWithTheme.stroke.name, classNamesWithTheme.stroke.modificators[activeOption]),
        }}
      />
    </Box>
  );
};

export default PreviewBoxSizing;
