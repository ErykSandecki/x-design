import cx from 'classnames';
import { FC } from 'react';

// components

// others

// styles
import styles from './preview-box-sizing.scss';

// types
import { Box, TPreviewData } from 'shared';

const previewBoxSizingModificators: Record<string, string> = {
  excluded: 'PreviewBoxSizing--excluded',
};

const strokeModificators: Record<string, string> = {
  excluded: 'PreviewBoxSizing__stroke--excluded',
};

export type TPreviewBoxSizingProps = Pick<TPreviewData, 'activeOption'>;

const PreviewBoxSizing: FC<TPreviewBoxSizingProps> = ({ activeOption }) => {
  return (
    <Box
      classes={{
        className: cx(styles.PreviewBoxSizing, styles[previewBoxSizingModificators[activeOption]]),
      }}
    >
      <Box classes={{ className: cx(styles['PreviewBoxSizing__tile-left']) }}>
        <Box classes={{ className: cx(styles['PreviewBoxSizing__tile-children']) }} />
      </Box>
      <Box classes={{ className: cx(styles['PreviewBoxSizing__tile-right']) }}>
        <Box classes={{ className: cx(styles['PreviewBoxSizing__tile-children']) }} />
      </Box>
      <Box
        classes={{
          className: cx(styles.PreviewBoxSizing__stroke, styles[strokeModificators[activeOption]]),
        }}
      />
    </Box>
  );
};

export default PreviewBoxSizing;
